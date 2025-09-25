import 'dotenv/config'
import mongoose from 'mongoose'
import Product from '../models/Product.js'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cozydecor'

const SAMPLE_PRODUCTS = [
  { title: 'Oakwood Lounge Chair', subtitle: 'Solid oak, linen upholstery', price: 12999, image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1200&auto=format&fit=crop', category: 'Couch', stock: 12 },
  { title: 'Minimalist Floor Lamp', subtitle: 'Matte black, warm LED', price: 3499, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop', category: 'Lamps', stock: 25 },
  { title: 'Ceramic Vase Set', subtitle: '3-piece neutral tones', price: 1899, image: 'https://plus.unsplash.com/premium_photo-1668704252726-452ce872b349?w=500&auto=format&fit=crop&q=60', category: 'Home Decor', stock: 40 },
  { title: 'Table Lamp', subtitle: 'Soft edges, handcrafted', price: 2999, image: 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=500&auto=format&fit=crop&q=60', category: 'Lamps', stock: 18 },
  { title: 'Rattan Pendant Light', subtitle: 'Natural weave, E27', price: 4599, image: 'https://media.istockphoto.com/id/1343756267/photo/four-black-modern-pendant-electric-lamps.webp', category: 'Lamps', stock: 14 },
  { title: 'Bouclé Accent Chair', subtitle: 'Cream boucle, steel legs', price: 11499, image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=500&auto=format&fit=crop&q=60', category: 'Couch', stock: 9 },
  { title: 'Abstract Wall Art', subtitle: '60x90 canvas print', price: 2499, image: 'https://plus.unsplash.com/premium_photo-1706561252297-d9b575e9f295?w=500&auto=format&fit=crop&q=60', category: 'Wall Art', stock: 30 },
  { title: 'Stoneware Planter', subtitle: 'Medium, sand finish', price: 1299, image: 'https://images.unsplash.com/photo-1650817324403-b07068f301d3?w=500&auto=format&fit=crop&q=60', category: 'Home Decor', stock: 50 },
  { title: 'Scandi Sofa 3-Seater', subtitle: 'Performance fabric, oak base', price: 45999, image: 'https://images.unsplash.com/photo-1729470813402-e342d8cba414?w=500&auto=format&fit=crop&q=60', category: 'Couch', stock: 6 },
  { title: 'Arc Floor Lamp', subtitle: 'Brushed brass, dimmable', price: 5999, image: 'https://plus.unsplash.com/premium_photo-1724094573986-fd3a1af08a12?w=500&auto=format&fit=crop&q=60', category: 'Lamps', stock: 20 },
]

async function run() {
  await mongoose.connect(MONGO_URI)
  const count = await Product.countDocuments()
  if (count > 0) {
    console.log(`Products already exist: ${count}. Skipping seed.`)
    await mongoose.disconnect()
    return
  }
  await Product.insertMany(SAMPLE_PRODUCTS)
  console.log(`Seeded ${SAMPLE_PRODUCTS.length} products.`)
  await mongoose.disconnect()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})


