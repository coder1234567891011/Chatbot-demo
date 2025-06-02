import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { createCustomElement } from '@angular/elements';
import { AuthConfigModule } from './auth/auth-config.module';

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    DragDropModule,
    AuthConfigModule
  ],
  providers: [],
  entryComponents:[ChatboxComponent],
  bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap { 
   constructor(private injector: Injector) {
    const el = createCustomElement(ChatboxComponent, { injector: this.injector });
    customElements.define('app-chatbox', el);
   }

  ngDoBootstrap() {
  }
 }
