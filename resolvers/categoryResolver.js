
/*const categoryData = [
    {
        id: '1',
        categoryName: 'Mammal',
    },
];*/
import Category from '../models/category.js';
import {AuthenticationError} from "apollo-server-express";

export default {
    Species: {
        category (parent)  {
           // return categoryData.filter(category => category.id === parent.category).pop();
            return Category.findById(parent.category)
        },
    },
    Mutation: {
        addCategory: (parent, args,{user}) => {
            console.log('categoryResolver, addCategory',args,user);
            if(!user){
                throw new AuthenticationError('Not authenticated');
            }

            const newCategory = new Category(args);
            return newCategory.save();
        },
    },

};
