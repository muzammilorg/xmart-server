import { orderModel } from "../models/order.schema.js";
import { productModel } from "../models/product.schema.js";
import { reviewModel } from "../models/review.schema.js";


const updateProductRating = async (productId) => {
    const reviews = await reviewModel.find({ productId });
    const totalRating = reviews.length ?? 0;
    const sumRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = Math.round(sumRating / totalRating);
    await productModel.findByIdAndUpdate(productId, { rating: avgRating })
}

const validateOrder = async ({ userId, productId }) => {
    const orders = await orderModel.find({
        userId,
        products: { $elemMatch: { id: productId } }
    })

    return orders.length > 0;
}

export default class ReviewRating {
    static async create(req, res) {
        try {
            const { review, rating, productId } = req.body;

            console.log(`${review} <--Review, ${rating} <--Rating, ${productId} <--productId`)

            if (!review || !rating || !productId) {
                return res.status(400).json({ message: 'Missing Required Fields', status: 'failed' })
            }

            const product = await productModel.findById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product Not Found', status: 'failed' })
            }


            const hasOrdered = validateOrder({
                userId: req?.user?._id,
                productId
            })


            if (!hasOrdered) {
                return res.status(403).json({ message: "Access Denied, You've not purchased this product", status: 'failed' })

            }

            const newReview = new reviewModel({
                review,
                rating,
                productId,
                userId: req?.user?.id
            })

            await newReview.save();
            await updateProductRating(productId);

            res.status(201).json({ message: 'Rating Submitted Successfully', status: 'success', })



        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', status: 'failed' })
        }
    }

    static async remove(req, res) {
        try {

            const { id } = req.params;
            const review = await reviewModel.findById(id);

            if (!review) {
                return res.status(404).json({ message: 'Review Not Found', status: 'failed' })
            }

            if (review.userId.toString() !== req?.user?._id.toString()) {
                return res.status(403).json({ message: "Access Denied, You're Not Authorized User", status: 'failed' })
            }

            const {productId} = review;

            await reviewModel.findByIdAndDelete(id);
            await updateProductRating(productId);

            res.status(200).json({message: "Review Remove Successfully", status: "success", })

        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', status: 'failed' })

        }
    }

    static async getProductRatings(req, res) {
        try {
            
            const {productId} = req.params;
            const product = await productModel.findById(productId);

            if(!product) {
            return res.status(404).json({ message: 'Product Not Found', status: 'failed' })
            }

            const reviews =  await reviewModel.find({productId});
            res.status(200).json({message: "Product Reviews Fetch Successfully", status: "success", data: reviews})




        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', status: 'failed' })
            
        }
    }
}