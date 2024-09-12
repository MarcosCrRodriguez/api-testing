import { Component, OnInit } from '@angular/core';
import { CardService } from './../../services/card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css',
})
export class MayorMenorComponent implements OnInit {
  deckId: string = '';
  card1: any = null; // Carta de la máquina
  card2: any = null; // Carta del jugador
  playerScore: number = 0;
  machineScore: number = 0;
  noMoreCards: boolean = false;
  message: string = '';
  cardsVisible: boolean = false;
  firstRound: boolean = true;
  backCardImage: string = 'https://deckofcardsapi.com/static/img/back.png'; // Imagen de carta dada vuelta
  gameOver: boolean = false;
  gameStarted: boolean = false;
  cardsLoaded: boolean = false; // Verificación de cartas cargadas
  remainingCards: number = 52; // Agregamos un contador de cartas restantes

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.initializeDeck();
  }

  initializeDeck(): void {
    this.cardService.createDeck().subscribe((response) => {
      this.deckId = response.deck_id;
      this.noMoreCards = false;
      this.playerScore = 0;
      this.machineScore = 0;
      this.message = '';
      this.cardsVisible = false;
      this.firstRound = true;
      this.gameOver = false;
      this.gameStarted = false;
      this.cardsLoaded = false;
      this.remainingCards = 52; // Reiniciamos la cantidad de cartas
    });
  }

  startGame(): void {
    this.gameStarted = true;
    this.cardsVisible = false;
    this.firstRound = true;
    this.cardsLoaded = false;
  }

  playerChoice(choice: 'higher' | 'equal' | 'lower'): void {
    if (!this.deckId || this.gameOver || !this.gameStarted) return;

    this.cardsVisible = false;
    this.firstRound = false;

    // Hacemos la solicitud de las cartas
    this.cardService.drawCards(this.deckId).subscribe((response) => {
      if (response.cards.length === 0 || this.remainingCards < 2) {
        this.noMoreCards = true;
        this.declareWinner();
        return;
      }

      this.card1 = response.cards[0];
      this.card2 = response.cards[1];

      this.cardsLoaded = true;

      const card1Value = this.getCardValue(this.card1.value);
      const card2Value = this.getCardValue(this.card2.value);

      let isCorrect = false;

      if (choice === 'higher' && card2Value > card1Value) {
        isCorrect = true;
      } else if (choice === 'equal' && card2Value === card1Value) {
        isCorrect = true;
      } else if (choice === 'lower' && card2Value < card1Value) {
        isCorrect = true;
      }

      if (isCorrect) {
        this.playerScore++;
      } else {
        this.machineScore++;
      }

      this.cardsVisible = true;

      // Actualizamos el número de cartas restantes
      this.remainingCards -= 2;

      // Si ya no quedan suficientes cartas para otra ronda, terminamos el juego
      if (this.remainingCards < 2) {
        this.noMoreCards = true;
        this.declareWinner(); // Permitimos que juegue la última ronda completa
      }
    });
  }

  getCardValue(value: string): number {
    if (value === 'ACE') return 14;
    if (value === 'KING') return 13;
    if (value === 'QUEEN') return 12;
    if (value === 'JACK') return 11;
    return parseInt(value, 10);
  }

  declareWinner(): void {
    this.gameOver = true;

    if (this.playerScore > this.machineScore) {
      this.message = `¡Ganaste! Puntaje: Jugador ${this.playerScore} - Máquina ${this.machineScore}`;
    } else if (this.playerScore < this.machineScore) {
      this.message = `¡Perdiste! Puntaje: Jugador ${this.playerScore} - Máquina ${this.machineScore}`;
    } else {
      this.message = `¡Empate! Puntaje: Jugador ${this.playerScore} - Máquina ${this.machineScore}`;
    }

    // Deshabilitar los botones después de la última mano
    this.gameStarted = false;
  }

  handleNewDeck(): void {
    this.initializeDeck();
  }
}
