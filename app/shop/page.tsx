import type {Metadata} from 'next';import {Suspense} from 'react';import {ShopClient} from '@/components/ShopClient';
export const metadata:Metadata={title:'Shop Protein, Creatine & Training Gear'};
export default function ShopPage(){return <Suspense fallback={<div className="shell loading-area">Loading products...</div>}><ShopClient/></Suspense>}
