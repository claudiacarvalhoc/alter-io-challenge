import { Component, OnInit } from '@angular/core';
// import { Hero } from '../hero';
// import { HeroService } from '../hero.service';

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

  ngOnInit() {
    this.initMatriz();
    this.setGridDefaultValues();
    this.initCounter();
    console.log(this);
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
    for (let i = 0; i < this.alphabet.length; ++i) {
      this.counter[this.alphabet[i]] = 0;
    }
    console.log(this.counter);
  }

  generator2D() : void {
    this.initCounter();

    if (this.hasCharacter()) {
      this.fill20PercentOfGrid();
    }

    for (let i = 0; i < this.array.length; ++i) {
      for (let j = 0; j < this.array.length; ++j) {
        let index = this.randomIntFromInterval(25);
        this.array[i][j] = this.alphabet[index];
        this.counter[this.alphabet[i]] = this.counter[this.alphabet[i]] + 1;
      }
    }
    console.log(this.counter);
  }

  setSelectedCharacter(value): void {
    if (this.alphabetRegex.exec(value)) {
      this.selectedCharacter = value;
    } else {
      alert('This field only accept values between A-Z');
    }
  }

  fill20PercentOfGrid(): void {
    let matrixSize: number = this.arraySize * this.arraySize;
    let numberOfItems: number = matrixSize * 0.20;
    let index = 1;
    while(index <= numberOfItems) {
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