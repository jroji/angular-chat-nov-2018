import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HttpClientModule } from '@angular/common/http';
import { BoardComponent } from './board/board.component';
import { TextComponent } from './text/text.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ContactsComponent,
    BoardComponent,
    TextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
