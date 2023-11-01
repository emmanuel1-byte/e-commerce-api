const { SuccessResponse } = require('../../middleware/successHandler')
const { ErrorResponse } = require('../../middleware/errorHandler')
const service = require('../../service')

class Category {

    static async addCategory(req, res) {
        const { name } = req.body
        try {
            const newCategory = await service.category.createCategory(name)
            if (!newCategory) {
                return res.status(400).json(new ErrorResponse('category not created'))
            }
            return res.status(200).json(new SuccessResponse('category was succesfully created', newCategory))

        } catch (err) {
            console.log(err)
            return (res.status(500).json(new ErrorResponse('Error creating category')))
        }

    }

    static async listCategories(req, res) {
        try {
            const categories = await service.category.listCategory()
            if (!categories) {
                return res.status(400).json(new ErrorResponse('categories not retrieved'))
            }
            return res.status(200).json(new SuccessResponse('categories was succesfully retrieved', categories))

        } catch (err) {
            console.log(err)
            return (res.status(500).json(new ErrorResponse('Error retrieving categories')))
        }

    }

    static async findCategory(req, res) {
        const { categoryId } = req.params
        try {
            const products = await service.category.listAllFromCategory(categoryId)
            if (!products) {
                return res.status(404).json(new ErrorResponse('category  not found'))
            }
            return res.status(200).json(new SuccessResponse('categories products was succesfully retrieved', products))
        } catch (err) {

        }

    }


    static async updateCategory(req, res) {
        const { categoryId } = req.params
        const { name } = req.body
        try {
            const update = await service.category.updateCategory(name, categoryId)
            if (!update) {
                return res.status(400).json(new ErrorResponse('category was not updated', update))
            }
            return res.status(200).json(new SuccessResponse('category was successfully updated', update))

        } catch (err) {
            console.log(err)
            return (res.status(500).json(new ErrorResponse('Error updating category')))
        }

    }

    static async deleteCategory(req, res) {
        const { categoryId } = req.params
        try {
            const deleteCategory = await service.category.deleteCategory(categoryId)
            if (!deleteCategory) {
                return res.status(400).json(new ErrorResponse('category not deleted'))
            }
            return res.status(200).json(new SuccessResponse('category was successfully deleted', update))

        } catch (err) {
            console.log(err)
            return (res.status(500).json(new ErrorResponse('Error deleting category')))
        }

    }
}

module.exports = { Category }