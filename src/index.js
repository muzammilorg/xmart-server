import express from 'express'
import cors from 'cors'
import Constants from './constants.js'
import connectDb from './db/db.connect.js'
import userRoutes from './router/users.router.js'
import categoryRoutes from './router/category.router.js' 
import productRoutes from './router/product.router.js' 
import orderRoutes from './router/order.router.js' 
import reviewRoutes from './router/review.router.js' 


const app = express()
const port = Constants.PORT;
app.use(express.json())
app.use(cors())

connectDb(Constants.URI)

app.use('/users', userRoutes)
app.use('/category', categoryRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)
app.use('/review-rating', reviewRoutes)

app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`)
})

