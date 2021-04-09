/*const speciesData = [
    {
        id: '1',
        speciesName: 'Cat',
        category: '1',
    },
];*/
import Species from '../models/species.js'
import {AuthenticationError} from "apollo-server-express";

export default {
    Animal: {
        species (parent)  {
          //  return speciesData.filter(species => species.id === parent.species).pop();
            return Species.findById(parent.species)
        },
    },
    Mutation: {
        addSpecies: (parent, args,{user}) => {

            console.log('speciesResolver, addSpecies', args,user);
            if(!user){
                throw new AuthenticationError('Not authenticated');
            }
            const newSpecies = new Species(args);
            return newSpecies.save();
        },
    },

};