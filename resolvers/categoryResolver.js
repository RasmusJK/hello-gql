
/*const categoryData = [
    {
        id: '1',
        categoryName: 'Mammal',
    },
];*/
import Category from '../models/category.js';

export default {
    Species: {
        category (parent)  {
           // return categoryData.filter(category => category.id === parent.category).pop();
            return Category.findById(parent.category)
        },
    },
    Mutation: {
        addCategory: (parent, args) => {
            console.log('categoryResolver, addCategory',args);
            const newCategory = new Category(args);
            return newCategory.save();
        },
    },

};
