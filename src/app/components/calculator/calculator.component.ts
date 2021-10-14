import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  top: string = '';
  bottom: string = '0';
  operation: string = '';
  operators = {
    add: '+',
    sub: '-',
    mul: '×',
    div: '÷',
  };

  constructor() {}

  ngOnInit(): void {}

  onClickKey(value: string) {
    if (this.top === 'Infinity') {
      this.top = '';
      this.bottom = value;
      this.operation = '';
      return;
    }

    if (this.bottom.length === 1 && this.bottom === '0' && value === '0')
      return;

    const nextValue = this.bottom + value;
    if (isNaN(+nextValue)) return;

    if (this.bottom === '0') {
      this.bottom = value === '.' ? this.bottom + value : value;
    } else {
      this.bottom += value;
    }
  }

  onDoOperations(operation: string) {
    if (this.top && this.bottom && this.bottom !== '') {
      this.top = this.onCompute(this.operation);
      this.bottom = '';
    } else {
      if (!this.top && operation) {
        this.top = this.bottom;
        this.bottom = '';
      }
    }

    this.operation = operation;
  }

  onDoActions(action: string) {
    switch (action) {
      case 'C':
        this.top = '';
        this.bottom = '0';
        this.operation = '';
        break;
      case 'CE':
        this.bottom = '0';
        break;
      case 'Del':
        if (this.bottom.length > 1) {
          this.bottom = this.bottom.slice(0, this.bottom.length - 1);
        } else {
          this.bottom = '0';
        }
    }
  }

  onCompute(operation: string) {
    switch (operation) {
      case 'add':
        return (+this.top + +this.bottom).toString();
      case 'sub':
        return (+this.top - +this.bottom).toString();
      case 'mul':
        return (+this.top * +this.bottom).toString();
      case 'div':
        return (+this.top / +this.bottom).toString();
    }
  }
}
