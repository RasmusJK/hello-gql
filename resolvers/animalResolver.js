/*const animalData = [
    {
        id: '1',
        animalName: 'Frank',
        species: '1',
    },
];*/
import Animal from '../models/animal.js';
import {AuthenticationError} from 'apollo-server-express';




export default {
    Query: {
        animals: (parent, args) => {
            return Animal.find();
        },
        animal: (parent,args) => {
            return Animal.findById(args.id);
        }

    },

    Mutation:{
        addAnimal: (parent,args,{user}) =>{
            console.log('animalResolver. addAnimal',args,user);
            if(!user){
                throw new AuthenticationError('Not authenticated');
            }
            const newAnimal = new Animal(args);
            return newAnimal.save()
        },
        modifyAnimal: (parent, args,{user}) => {
            console.log('animalResolver, modifyAnimal', args,user);
            if(!user){
                throw new AuthenticationError('Not authenticated');
            }
            const data = {
                animalName: args.animalName,
                species: args.species
            };
            return Animal.findByIdAndUpdate(args.id, data);
        }

    }
};
