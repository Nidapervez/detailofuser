import { type SchemaTypeDefinition } from 'sanity'
import alert from '../lib/alert'
import bag from '../lib/bag'
import allProducts from '../lib/allproduct'
import banner from '../lib/banner'
import featuredProducts from '../lib/featured'
import sofa from '../lib/sofa'
import unique from '../lib/uniquefeature'
import top from '../lib/topcategories'
import product from '@/sanity/schemaTypes/product'
import order from '@/sanity/schemaTypes/order'
import cartItem from '@/sanity/schemaTypes/cartitem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    alert,bag,allProducts,banner,featuredProducts,sofa,unique,top,product,order,cartItem
  ],
}
