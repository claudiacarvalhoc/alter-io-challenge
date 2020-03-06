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
    this.counter = {"A": 0,"B": 0,"C": 0,"D": 0,"E": 0,"F": 0,"G": 0,"H": 0,"I": 0,"J": 0,"K": 0,"L": 0,"M": 0,"N": 0,"O": 0,"P": 0,"Q": 0,"R": 0,"S": 0,"T": 0,"U": 0,"V": 0,"W": 0,"X": 0,"Y": 0,"Z": 0};
  }

  generator2D() : void {
    this.initCounter();

    if (this.hasCharacter()) {
      this.fill20PercentOfGrid();
    }

    for (let i = 0; i < this.array.length; ++i) {
      for (let j = 0; j < this.array.length; ++j) {
        let index = this.randomIntFromInterval(25);
        if (this.array[i][j] === '') {
          this.array[i][j] = this.alphabet[index];
          this.counter[this.alphabet[i]] = this.counter[this.alphabet[i]] + 1;
        }
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