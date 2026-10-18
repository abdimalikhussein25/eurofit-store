import type{Metadata} from 'next';import {notFound} from 'next/navigation';import {getProduct,products} from '@/lib/products';import{ProductDetails}from '@/components/ProductDetails';
export function generateStaticParams(){return products.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=getProduct(slug);return {title:p?p.name:'Product',description:p?.description};}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=getProduct(slug);if(!p)notFound();return <ProductDetails product={p}/>}
