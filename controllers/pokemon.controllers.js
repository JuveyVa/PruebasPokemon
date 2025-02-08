const axios = require("axios");
const pokeURL = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemon(input) {
    try {
        if (typeof input === "string") {
            input = input.trim().toLowerCase();
        }

        if (typeof input === "string" && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(input)) {
            throw new Error("Error al obtener la información del Pokémon, el nombre no puede contener signos de puntuación");
        }

        const response = await axios.get(pokeURL + input);
        const data = response.data;

        return {
            nombre: data.name,
            peso: data.weight,
            altura: data.height,
            tipo: data.type.map(t => t.type.name),
            pokedex: data.id
        };

    } catch (error) {
        throw new Error('No se encontro el pokemon')
    }
}

async function getPokemonRange(start, end = start + 9) {
    try {
        if (!Number.isInteger(start) || !Number.isInteger(end)) {
            throw new Error("Debes ingresar números enteros en los parámetros start y end.");
        }
    
        if (isNaN(start) || start < 1 || start > 151) {
            throw new Error("El parámetro start debe ser un número entre 1 y 151");
        }
    
        if (end > 151) {
            throw new Error("No se pueden solicitar Pokémon con un número mayor a 151");
        }
    
        if (end - start > 19) {
            throw new Error("No puedes solicitar más de 20 Pokémon a la vez");
        }
    
        try {
            const pokemones = [];
            for (let i = start; i <= end; i++) {
                pokemones.push(axios.get(pokeURL + i));
            }
    
            const datos = await Promise.all(pokemones);
            return datos.map(response => ({
                nombre: response.data.name,
                peso: response.data.weight,
                altura: response.data.height,
                tipo: response.data.types.map(t => t.type.name),
                id: response.data.id,


            }));

        } catch (error) {
            throw new Error("Hubo un error al obtener los Pokémon");
        }
    } catch (error) {
        throw new Error("Hubo un error al obtener los Pokémon");
    }
}

async function getTipo(tipo) {
    try {
        const pokeURLtipo = "https://pokeapi.co/api/v2/type/";
        const responseType = await axios.get(pokeURLtipo + tipo);
        const dataType = responseType.data;


        return {
            name: dataType.name,
            number: dataType.pokemon.length
        }

    } catch (error) {
        throw new Error("Hubo un error al obtener los tipos de pokemon");
    }
}

module.exports = {
    getPokemon,
    getPokemonRange,
    getTipo
};


