import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {

  constructor(
    private readonly pokemonService: PokemonService,
  ) { }

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length -2];

      const createPokemonDto: CreatePokemonDto = { no, name };

      this.pokemonService.create(createPokemonDto);
    })

    return data.results;
  }
}
