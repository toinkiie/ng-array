import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  STATE_OFF = 0;
  TABLE_HEIGHT = 4;
  TABLE_WIDTH = 4;
  title = 'ng-array';
  formAxis: FormGroup;
  tableMatrix: [[boolean]];

  constructor(public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formAxis = this.fb.group({
      row: [null, Validators.required],
      col: [null, Validators.required],
      colState: [false, Validators.required]
    });
    this.tableMatrix = Object.assign([], this.generateTable(this.TABLE_HEIGHT, this.TABLE_WIDTH));
  }

  onFormAxisSumbmit() {
    if (!this.formAxis.valid) {
      return;
    }
    const formData = this.formAxis.getRawValue();
    const rowIndex = this.reverseRowIndex(Number(formData.row) - 1);
    const colIndex = formData.col - 1;
    this.toggleState(rowIndex, colIndex, Boolean(Number(formData.colState)));
  }

  toggleState(rowIndex: number, colIndex: number, overrideState: boolean | null = null) {
    if (this.isArrayOutOfBounds(rowIndex, colIndex)) {
      alert('Table axis out of bounds.');
      return;
    }
    this.tableMatrix[rowIndex][colIndex] = (overrideState !== null) ? overrideState : !this.tableMatrix[rowIndex][colIndex];
  }


  reset() {
    this.tableMatrix = Object.assign([], this.generateTable(this.TABLE_HEIGHT, this.TABLE_WIDTH));
  }

  reverseRowIndex(row: number) {
    return (this.TABLE_HEIGHT - 1) - row;
  }

  private generateTable(height: number, width: number) {
    const row = [];
    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
      const col = [];
      for (let colIndex = 0; colIndex < height; colIndex++) {
        col.push(this.STATE_OFF);
      }
      row.push(col);
    }
    return Object.assign(row);
  }

  private isArrayOutOfBounds(rowIndex: number, colIndex: number) {
    return typeof this.tableMatrix[rowIndex] === 'undefined' ||
      typeof !this.tableMatrix[rowIndex][colIndex] === 'undefined';
  }
}
