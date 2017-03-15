import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { UserTableComponent } from './user/user-table/user-table.component';
import { UserRowComponent } from './user/user-table/user-row/user-row.component';

import { UserService } from './user/service/user.service';
import { LoggerService } from './common/services/logger.service';

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserTableComponent,
    UserRowComponent
  ],
  providers: [
    UserService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
