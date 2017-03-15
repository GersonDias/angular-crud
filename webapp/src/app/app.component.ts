import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <header-component></header-component>
  <user-table></user-table>
  <footer-component></footer-component>`,
})
export class AppComponent  { name = 'Angular'; }
