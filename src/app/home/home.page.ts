import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private pokemonService = inject(PokemonService);
  pokemons: any[] = [];
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  ngOnInit(): void {
    this.loadData();
    this.pokemonService.getPokemons().subscribe((response) => {
      this.pokemons = response.results.map((p: any) => {
        const id = p.url.split('/').filter(Boolean).pop(); // Extrai o ID do Pokémon
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return {
          name: p.name,
          id,
          image,
        };
      });
    });
  }
    loadData(): void {
    this.message = 'Carregando...';
    this.messageType = '';

    this.pokemonService.getPokemons().subscribe({
      next: (response) => {
        this.pokemons = response.results;
        this.message = 'Status da API: OK! Dados carregados com sucesso.';
        this.messageType = 'success';
        console.log('Dados recebidos:', this.pokemons);
      },
      error: (error) => {
        this.message = `Status da API: FALHA. Erro: ${error.message || 'Erro desconhecido'}.`;
        this.messageType = 'error';
        console.error('Erro ao carregar dados da API:', error);
      },
      complete: () => {
        console.log('Requisição à API concluída.');
      }
    });
  }
}