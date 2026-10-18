'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';import { useCart } from './CartProvider';
export function Header(){
 const [menu,setMenu]=useState(false),[search,setSearch]=useState(false),[query,setQuery]=useState('');const {count}=useCart(),pathname=usePathname(),router=useRouter();
 const nav=[['/shop','Shop all'],['/shop?category=Protein','Proteins'],['/shop?category=Creatine%20%26%20Strength','Creatine'],['/shop?category=Performance','Performance'],['/shop?category=Accessories','Gear']];
 const submit=(e:React.FormEvent)=>{e.preventDefault();router.push('/shop?q='+encodeURIComponent(query));setSearch(false);setMenu(false)};
 return <><div className="topbar"><span>ENGINEERED FOR EVERYDAY ATHLETES</span><span className="topbar-center">FUEL THE WORK. OWN THE RESULT.</span><Link href="/shop">EXPLORE THE COLLECTION <ArrowUpRight size={12}/></Link></div>
 <header className="header"><div className="shell header-inner"><button className="icon-btn mobile-only" aria-label="Toggle menu" onClick={()=>setMenu(!menu)}>{menu?<X size={23}/>:<Menu size={23}/>}</button><Logo/><nav className={`nav ${menu?'nav-open':''}`} aria-label="Main navigation">{nav.map(([href,label])=><Link onClick={()=>setMenu(false)} className={pathname==='/shop'&&href==='/shop'?'active':''} href={href} key={label}>{label}</Link>)}<Link href="/about" onClick={()=>setMenu(false)}>Our story</Link></nav><div className="head-actions"><button className="icon-btn" aria-label="Search" onClick={()=>setSearch(!search)}><Search size={21}/></button><Link className="bag-btn" href="/cart" aria-label={`Shopping cart with ${count} items`}><ShoppingBag size={20}/><span>{count}</span></Link></div></div></header>
 {search&&<div className="search-panel"><form onSubmit={submit} className="shell search-form"><Search/><input autoFocus type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search protein, creatine, gym gear..."/><button className="btn btn-dark" type="submit">SEARCH <ArrowUpRight size={16}/></button><button type="button" className="icon-btn" onClick={()=>setSearch(false)} aria-label="Close search"><X/></button></form></div>}
 </>
}
