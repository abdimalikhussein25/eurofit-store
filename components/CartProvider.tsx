'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { products, Product } from '@/lib/products';
type Line = { id: string; quantity: number };
type CartContextType = { lines: Line[]; count: number; subtotal: number; add: (id:string, qty?:number)=>void; update:(id:string,qty:number)=>void; remove:(id:string)=>void; clear:()=>void; detailed: { product:Product; quantity:number }[] };
const CartContext = createContext<CartContextType | null>(null);
export function CartProvider({children}:{children:React.ReactNode}) {
 const [lines,setLines]=useState<Line[]>([]); const [ready,setReady]=useState(false);
 useEffect(()=>{ try { const raw=localStorage.getItem('eurofit-cart-v1'); if(raw){const decoded=JSON.parse(raw); if(Array.isArray(decoded))setLines(decoded.filter((x)=>typeof x.id==='string'&&Number.isInteger(x.quantity)&&x.quantity>0&&products.some(p=>p.id===x.id)).map(x=>({id:x.id,quantity:Math.min(x.quantity,99)}))); }}catch{} setReady(true); },[]);
 useEffect(()=>{if(ready)localStorage.setItem('eurofit-cart-v1',JSON.stringify(lines));},[lines,ready]);
 const add=useCallback((id:string,qty=1)=>{const p=products.find(x=>x.id===id);if(!p)return;setLines(current=>{const old=current.find(x=>x.id===id);return old?current.map(x=>x.id===id?{...x,quantity:Math.min(p.stock,x.quantity+qty)}:x):[...current,{id,quantity:Math.min(p.stock,qty)}]});},[]);
 const update=useCallback((id:string,qty:number)=>{const p=products.find(x=>x.id===id);if(!p)return;setLines(a=>qty<=0?a.filter(x=>x.id!==id):a.map(x=>x.id===id?{...x,quantity:Math.min(p.stock,Math.max(1,Math.floor(qty)))}:x));},[]);
 const remove=useCallback((id:string)=>setLines(a=>a.filter(x=>x.id!==id)),[]);
 const clear=useCallback(()=>setLines([]),[]);
 const detailed=useMemo(()=>lines.flatMap(l=>{const p=products.find(x=>x.id===l.id);return p?[{product:p,quantity:l.quantity}]:[]}),[lines]);
 const count=detailed.reduce((n,l)=>n+l.quantity,0),subtotal=detailed.reduce((n,l)=>n+l.quantity*l.product.price,0);
 return <CartContext.Provider value={{lines,count,subtotal,add,update,remove,clear,detailed}}>{children}</CartContext.Provider>
}
export function useCart(){const x=useContext(CartContext);if(!x)throw new Error('CartProvider missing');return x;}
