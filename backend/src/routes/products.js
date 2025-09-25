import { Router } from 'express'
import Product from '../models/Product.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { q, category } = req.query
    const where = {}
    if (category) where.category = category
    if (q) where.title = { $regex: String(q), $options: 'i' }
    const products = await Product.find(where).sort({ createdAt: -1 }).limit(100)
    res.json(products)
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (e) {
    res.status(400).json({ error: 'Failed to create product' })
  }
})

export default router


