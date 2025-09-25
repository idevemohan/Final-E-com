import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: { type: String, enum: ['Lamps', 'Couch', 'Home Decor', 'Wall Art'], required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('Product', productSchema)


