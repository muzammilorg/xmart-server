import { categoryModel } from "../models/category.schema.js"

export default class Categories {
    static async create(req, res) {

        try {

            if(!req.file){
               return res.status(400).json({message: "Please Upload File", status: "failed"})
            }
            

            if(!req.file){
              return  res.status(400).json({message: "Please Upload File", status: "failed"})
            }


            const {name} = req.body

            if (!name) {
              return  res.status(400).json({message: "All Field Are Required", status: "failed"})
                
            }

            const newCategory = new categoryModel({
                name,
                image: req?.file?.path,
                adminId: req?.user?._id
            })

            if (name == categoryModel?.name) {
               return res.status(409).json({message: 'Category Already Exist', status: 'failed'})
            }

            await newCategory.save();

            res.status(201).json({message: 'Category Created Successfully', status: 'success', data: newCategory})
        } catch (error) {
            console.log(error)
           return res.status(500).json({message: "Internal Server Error From Create", status: "failed"})
        }
        
    }

    static async getAll(req, res) {
        try {

            const data = await categoryModel.find();
            res.status(200).json({message: "All Categories Fetched Successfully", status: 'success', data})
            
        } catch (error) {
            res.status(500).json({message: "Internal Server Error", status: "failed"})
        }
    }
    
    static async deleteOne(req,res) {
        try {
            const id = req.params?.id;

            if (!id) {
            return res.status(400).json({message: 'Missing Category Id', status: 'failed'})
            }

            const category = await categoryModel.findByIdAndDelete(id);

            if (!category) {
            return res.status(404).json({message: 'Category Not Found', status: 'failed'})
            }

            res.status(200).json({message: 'Category Deleted Successfully', status: 'success', data: category})

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal Server Error', status: 'failed'})
        }
    }

    
}