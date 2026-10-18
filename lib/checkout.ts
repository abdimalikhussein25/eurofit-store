import { products } from './products';import {STORE} from './config';
export type Customer={name:string;email:string;phone:string;address:string;city:string;notes:string};
export type OrderLine={id:string;quantity:number};
export function validateOrder(input:unknown){
 if(!input||typeof input!=='object')throw Error('Invalid checkout request');const body=input as Record<string,unknown>;
 if(!body.customer||typeof body.customer!=='object')throw Error('Customer information is required');const raw=body.customer as Record<string,unknown>;
 const clean=(key:string,max:number)=>String(raw[key]??'').trim().slice(0,max);
 const customer:Customer={name:clean('name',120),email:clean('email',200),phone:clean('phone',45),address:clean('address',250),city:clean('city',120),notes:clean('notes',300)};
 if(customer.name.length<2||!/^\S+@\S+\.\S+$/.test(customer.email)||customer.phone.length<8||customer.address.length<5||customer.city.length<2)throw Error('Please enter valid contact and delivery details');
 if(!Array.isArray(body.items)||body.items.length<1||body.items.length>30)throw Error('Your bag is empty or too large');
 const seen=new Set<string>();let subtotal=0;
 const lines=(body.items as OrderLine[]).map(row=>{if(!row||typeof row.id!=='string'||!Number.isInteger(row.quantity)||row.quantity<1||seen.has(row.id))throw Error('Invalid item quantity');seen.add(row.id);const p=products.find(p=>p.id===row.id);if(!p||row.quantity>p.stock)throw Error('An item exceeds sample availability');subtotal+=p.price*row.quantity;return {id:p.id,slug:p.slug,name:p.name,quantity:row.quantity,unit_price:p.price};});
 const delivery=subtotal>=STORE.shippingFreeThreshold?0:STORE.shippingFlat;const total=subtotal+delivery;if(!Number.isSafeInteger(total)||total<=0)throw Error('Invalid total');return{customer,lines,subtotal,delivery,total};
}
