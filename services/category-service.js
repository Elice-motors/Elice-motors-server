
import { Car } from "../db/models/cars/cars-model.js";

export default class CategoryService{
    //카테고리 등록
    async CategoryUp({carId, carType}){
        const category = {carId, carType};
        try{
            const existCategory = await category.findOne({carId:category.carId});
            if(existCategory != null){
                return {message: "DUPLICATED"};
            }
            const newCategory = await category.create(category);
            return {message: "SUCCESS", category: newCategory};
        }catch(err){
            return err;
        }
    }
    //카테고리 전체조회
    async getAllCategory(carType){
        
        try{
            const allCategory = await Car.find(
                {category : carType},
                { carName:1, carPrice:1, img:1, speed:1 ,mileage:1 ,fuel:1 ,carId:1 ,option:1, category:1, color:1});
            if(allCategory){
                return {message: "SUCCESS", category: allCategory};
            }
            if(allCategory.length > 0){
                return {message: "NO_MATCHES"};
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