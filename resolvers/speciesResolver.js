/*const speciesData = [
    {
        id: '1',
        speciesName: 'Cat',
        category: '1',
    },
];*/
import Species from '../models/species.js'

export default {
    Animal: {
        species (parent)  {
          //  return speciesData.filter(species => species.id === parent.species).pop();
            return Species.findById(parent.species)
        },
    },
    Mutation: {
        addSpecies: (parent, args) => {
            console.log('speciesResolver, addSpecies', args);
            const newSpecies = new Species(args);
            return newSpecies.save();
        },
    },

};