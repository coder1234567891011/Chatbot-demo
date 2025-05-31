import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChatboxComponent } from './chatbox.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    ChatboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    DragDropModule
  ],
  providers: [],
  entryComponents:[ChatboxComponent],
  bootstrap: [ChatboxComponent]
})
export class AppModule implements DoBootstrap { 
   constructor(private injector: Injector) {
    const linkEl = document.createElement('link');
    linkEl.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    linkEl.rel = 'stylesheet';
    document.head.appendChild(linkEl);
    const el = createCustomElement(ChatboxComponent, { injector: this.injector });
    customElements.define('app-chatbox', el);
   }

  ngDoBootstrap() {
  }
 }