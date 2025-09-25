import { Router } from 'express'
import requireAuth from '../middleware/requireAuth.js'

const router = Router()

// In-memory placeholder; replace with Order model as needed
const orders = []

router.post('/', requireAuth, (req, res) => {
  const { items, total } = req.body
  if (!Array.isArray(items) || typeof total !== 'number') return res.status(400).json({ error: 'Invalid order' })
  const order = { id: String(Date.now()), userId: req.user.id, items, total, createdAt: new Date().toISOString() }
  orders.push(order)
  res.status(201).json(order)
})

router.get('/', requireAuth, (req, res) => {
  const userOrders = orders.filter((o) => String(o.userId) === String(req.user.id))
  res.json(userOrders)
})

export default router


