const pokemon = require("../controllers/pokemon.controllers");
const axios = require("axios");

jest.mock("axios");

describe('pruebas unitarias de pokemon 1', () => {
    describe('dado que se desea saber la informacion de un pokemon', () => {
        it('si se desea saber la informacion de magikarp con el nombre magikarp, debe de regresar la informacion de magikarp', async () => {
            axios.get.mockResolvedValue({
                data: {
                    name: "magikarp",
                    weight: 100,
                    height: 9,
                    type: [{ type: { name: "water" } }],
                    id: 129,
                }
            });

            const resultado = await pokemon.getPokemon("magikarp");
            expect(resultado).toEqual({
                nombre: "magikarp",
                peso: 100,
                altura: 9,
                tipo: ["water"],
                pokedex: 129
            })
        });
        it('si se desea saber la informacion de magikarp con el numero de magikarp, debe de regresar la informacion de magikarp', async () => {
            axios.get.mockResolvedValue({
                data: {
                    name: "magikarp",
                    weight: 100,
                    height: 9,
                    type: [{ type: { name: "water" } }],
                    id: 129,
                }
            });

            const resultado = await pokemon.getPokemon(129);
            expect(resultado).toEqual({
                nombre: "magikarp",
                peso: 100,
                altura: 9,
                tipo: ["water"],
                pokedex: 129
            })
        });
    });
    describe('devolver un error si se ingresan signos de puntuaciion', () => {
        it("Debe lanzar un error si el nombre contiene signos de puntuación", async () => {
            await expect(pokemon.getPokemon("m4g¡k?=3rp")).rejects.toThrow();
        });

    });
    describe('devolver un error si se informacion no valida', () => {
        it('se desea saber que pasa si no se encuentra el pokemon', async () => {
            axios.get.mockRejectedValue({ response: { status: 404 } });
            await expect(pokemon.getPokemon("JSON")).rejects.toThrow();
        });
    });
});

describe('pruebas unitarias de pokemon 2', () => {
    describe('devolver error si se ingresa algo diferente a numero en alguno de los parametros', () => {
        it('debe de devolver un error si se ingresa un numero decimal o string en alguno de los parametros', async () => {
            await expect(pokemon.getPokemonRange("pikachu")).rejects.toThrow();
            await expect(pokemon.getPokemonRange(25.6)).rejects.toThrow();
        });
    });
    describe('devolver 10 registros si solo se ingresa el parametro start', () => {
        it('debe de devolver 10 registros si solo se ingresa el parametro start', async () => {
            axios.get.mockResolvedValue({
                data: {
                    name: 'bulbasaur',
                    weight: 69,
                    height: 7,
                    types: [{ type: { name: 'grass' } }],
                    id: 1
                }
            });
            
            const start = 1;
            const numeroPokemon = await pokemon.getPokemonRange(start);
            expect(numeroPokemon).toHaveLength(10);
        })
    })
    describe('devolver solo 20 pokemones maximo', () => {
        it('debe de devolver un error si se ingrsan mas de 20 pokemones', async () => {
            const start = 1
            const end = 25
            await expect(pokemon.getPokemonRange(start, end)).rejects.toThrow();
        });
    });
    describe('devolver error si se ingresa un numero mayor a 151', () => {
        it('debe de devolver un error si se ingresa un numero mayor a 151', async () => {
            const start = 152;
            await expect(pokemon.getPokemonRange(start)).rejects.toThrow();
        });
    });
})

describe('pruebas unitarias 3', () => {
    describe('debe de poder pasar un tipo de pokemon y nos va a devolver cuantos pokemons hay de ese tipo', () => {
        it("debe de regresar la información al mandarle como parámetro un tipo de Pokémon", async () => {
            const tipoPokemon = await pokemon.getTipo(5);
            axios.get.mockResolvedValue({
                data: {
                    name: "ground",
                    number: 93
                }
            })
            expect(tipoPokemon).toEqual({
                name: "ground",
                number: 93
            })

        });
    }) 
})


