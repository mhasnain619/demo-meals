import { ExecuteGet } from "./ApiBase";

export const MealServices = {
    async getMealData() {
        let response = await ExecuteGet("https://dummyjson.com/recipes");
        return response;
    },


};
