import Category from '../db/models/category/category-model.js';
import { Car } from '../db/models/cars/cars-model.js';

export default class CategoryService{
    //카테고리 등록
    async CategoryUp({carId, carType}){
        const category = {carId, carType};
        try{
            if(!carId || !carType){
                return {message: "MISSING_FIELD"};
            }
            const existCategory = await Category.findOne({carId:category.carId});
            if(existCategory != null){
                return {message: "DUPLICATED"};
            }
            const newCategory = await Category.create(category);
            return {message: "SUCCESS", category: newCategory};
        }catch(err){
            return err;
        }
    }
    //카테고리 전체조회
    //상세조회는 필요 없나..?
    async getAllCategory(carType){
        
        try{
           
            const allCategory = await Category.find(
                {category : carType},
                { carName:1, carPrice:1, img:1, speed:1 ,mileage:1 ,fuel:1 ,carId:1 ,option:1, category:1});
            if(allCategory){
                return {message: "SUCCESS", category: allCategory};
            }
            if(allCategory.length > 0){
                return {message: "NO_CATEGORY"};
            }
        }catch(err){
            return err;
        }
    }
    //카테고리 수정
    async updateCategoryInfo(carId, data){
        try{
            const updateCategory = await Category.findOneAndUpdate(
                {carId: carId},
                {carType: data.carType},
                {new: true});
            if(updateCategory){
                return {message: "SUCCESS", category: updateCategory};
            }else{
                return {message: "NO_MATCHES"};
            }
        }catch(err){
            return err;
        }
    }
    //카테고리 삭제
    async deleteCategoryInfo(carId){
        try{
            const deleteCategory = await Category.findOneAndDelete({carId:carId});
            if(deleteCategory){
                return {message: "SUCCESS"};
            }else{
                return {message: "NO_MATCHES"};
            }
        }catch(err){
            return err;
        }
    }
}