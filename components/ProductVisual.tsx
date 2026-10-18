'use client';
import { useState } from 'react';
import type { Product } from '@/lib/products';
export function ProductVisual({product,large=false}:{product:Product;large?:boolean}){
  const [imageFailed,setImageFailed]=useState(false);
  return <div className={`product-visual ${large?'visual-large':''} ${product.image?'has-real-photo':''}`} style={{'--accent':product.accent} as React.CSSProperties}>
    <div className="visual-halo"/><div className="visual-floor"/>
    {product.image&&!imageFailed
      ? <div className="real-product-photo"><img src={product.image} alt={`${product.name} — product packaging`} loading={large?'eager':'lazy'} referrerPolicy="no-referrer" onError={()=>setImageFailed(true)}/></div>
      : <div className={`pack pack-${product.visual}`}><div className="pack-top"/><div className="pack-panel"><span className="pack-mini">E U R O F I T</span><div className="pack-slash"/><b>{product.name.split(' ').slice(0,2).join(' ')}</b><small>PERFORMANCE<br/>SERIES</small><div className="pack-accent"/><em>{product.size}</em></div></div>}
    <span className="visual-index">EF / {product.id.slice(2)}</span>
  </div>;
}
