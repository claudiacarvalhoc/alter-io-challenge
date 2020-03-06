import { Component, OnInit } from '@angular/core';
import { debounce } from 'debounce';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: [ './generator.component.css' ]
})
export class GeneratorComponent implements OnInit {
  selectedCharacter:string = '';
  alphabetRegex:any = /^([A-Za-z]|[A-Za-z]*|[A-Za-z])+$/;
  alphabet:string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  array:string[][];
  counter: { [id: string] : number; } = {};
  arraySize: number = 10;
  CHARACTER_TIME_OUT: number = 4000;
  GENERATE_2D_TIME_OUT: number = 2000;
  code: number = 0;

  ngOnInit() {
    this.initMatriz();
    this.setGridDefaultValues();
    this.initCounter();
    this.scheduleGenerator2D();
  }

  initMatriz(): void {
    this.array = [
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','','']
    ];
  }

  setGridDefaultValues(): void {
    for (let i = 0; i < this.array.length; ++i) {
      for (let j = 0; j < this.array.length; ++j) {
        this.array[i][j] = this.alphabet[0];
      }
    }
  }

  initCounter(): void {
    this.counter = {"A": 0,"B": 0,"C": 0,"D": 0,"E": 0,"F": 0,"G": 0,"H": 0,"I": 0,"J": 0,"K": 0,"L": 0,"M": 0,"N": 0,"O": 0,"P": 0,"Q": 0,"R": 0,"S": 0,"T": 0,"U": 0,"V": 0,"W": 0,"X": 0,"Y": 0,"Z": 0};
  }

  scheduleGenerator2D(): void {
    setTimeout(() => {
      this.generator2D();
      this.updateCode();
      this.scheduleGenerator2D();
    }, this.GENERATE_2D_TIME_OUT);
  }

  updateCode(): void {
    const date = new Date();
    const seconds = date.getSeconds();

    const i = seconds % 10;
    const j = Math.floor(seconds / 10);

    const letter_i = this.array[i][j];
    const letter_j = this.array[j][i];

    const number_i = this.counter[letter_i] > 9 ? Math.floor(this.counter[letter_i] / 2) : this.counter[letter_i];
    const number_j = this.counter[letter_j] > 9 ? Math.floor(this.counter[letter_j] / 2) : this.counter[letter_j];

    this.code = (number_i * 10) + number_j;
  }

  generator2D() : void {
    this.initMatriz();
    this.initCounter();

    if (this.hasCharacter()) {
      this.fill20PercentOfGrid();
    }

    for (let i = 0; i < this.array.length; ++i) {
      for (let j = 0; j < this.array.length; ++j) {
        let index = this.randomIntFromInterval(25);
        if (this.array[i][j] === '') {
          this.array[i][j] = this.alphabet[index];
          this.counter[this.alphabet[index]] = this.counter[this.alphabet[index]] + 1;
        }
      }
    }
  }

  onChange(value): void {
    debounce(this.setSelectedCharacter(value), this.CHARACTER_TIME_OUT);
  }

  setSelectedCharacter(value): void {
    if (this.alphabetRegex.exec(value)) {
      this.selectedCharacter = value;
    } else {
      alert('This field only accept values between A-Z');
    }
  }

  fill20PercentOfGrid(): void {
    let numberOfItems: number = (this.arraySize * this.arraySize) * 0.20;
    let maxMiss = numberOfItems * 0.25;

    let index = 1;
    let miss = 0;
    while(index < numberOfItems || miss > maxMiss) {
      const i = Math.floor(Math.random() * Math.floor(9));
      const j = Math.floor(Math.random() * Math.floor(9));
      if (this.array[i][j] === '') {
        this.array[i][j] = this.selectedCharacter;
        this.counter[this.selectedCharacter]++;
      }
      
      index++;
    }
  }

  randomIntFromInterval(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  hasCharacter(): boolean {
    return this.selectedCharacter !== '';
  }
}