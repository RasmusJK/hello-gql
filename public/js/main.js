'use strict';

window.addEventListener('load', async () => {
    const ul = document.querySelector('ul');
    const rfrsh = document.querySelector('#refresh');
    const form = document.querySelector('form');
   // const username = 'Rasmus Karling';
    const animalName = form.elements.animalName;
    const animalSpecies = form.elements.animalSpecies;
    const animalCategory = form.elements.animalCategory;
    console.log('hello');

    if('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js');
            const  registration = await navigator.serviceWorker.ready;
            if ('sync' in registration) {
                form.addEventListener('submit',async (event)=>{
                    event.preventDefault();
                    const message = { animal: animalName.value,/* species: animalSpecies.value, category: animalCategory.value*/};
                    console.log(message);
                    try {
                        await saveData('outbox', message);
                       await registration.sync.register('send-message');
                    }catch (e) {
                        console.log(e);
                    }

                });
            }
        }catch (e) {
            console.log(e);
        }
    }

    const init = async () => {
        const data = [];
        try {
            const animals = await getAnimals();
            for (const animal of animals) {
                data.push(animal);
            }
        }
        catch (e) {
            console.log(e.message);
        }

        ul.innerHTML = '';
        data.forEach(item => {
            console.log(item);
            ul.innerHTML += `<ul> ${item.animalName}: ${item.species.speciesName}: ${item.species.category.categoryName},   </ul>`;
        });
    };

    init();

    rfrsh.addEventListener('click', init);
});
