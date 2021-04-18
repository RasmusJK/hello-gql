const fetchGraphql = async (query) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDcxODIxYmNhNzNkZjJmY2MxNmRlMjgiLCJ1c2VybmFtZSI6InRlc3RlciIsIl9fdiI6MCwiaWF0IjoxNjE4MDczNzk3fQ.3lEi31yHm6dgs9AipxpZ9NzmWF39bTq36ZIX-phVbB8'
        },
        body: JSON.stringify(query),
    };
    try {
        const response = await fetch('https://localhost:8000/graphql', options);
        const json = await response.json();
        return json.data;
    }
    catch (e) {
        console.log(e);
        return false;
    }
};

const saveAnimal = async (message) => {
    const query = {
        query: `
           Mutation {
  addAnimal(animalName: $animal, species: $species){
    id
    animalName
  }`,
        variables: message,
    };
    const data = await fetchGraphql(query);
    return data.addAnimal;
};

const getAnimals = async () => {
    const otherQuery = {
        query: `
           {
  animals {
    id
    animalName
    species {
      speciesName
      category {
        categoryName
      }
    }
  }
}`,
    };
    const data = await fetchGraphql(otherQuery);
    return data.animals;
};
