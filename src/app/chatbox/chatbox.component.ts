import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const GREETING_MESSAGE = "Hello!"

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss'],
  providers:[HttpClient]
})

export class ChatboxComponent {
  loading = false;
  isOpen = false;
  userInput = '';
  messages: { text: string, user: boolean }[] = [];

  cdkDragFreeDragPosition = { x: 0, y: 0 };

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(){
    this.sendMessage(GREETING_MESSAGE)
    setTimeout(()=>{
      if(!this.isOpen){
        this.toggleChat()
      }
    },3000)
  }

  constrainPosition(position: { x: number; y: number }): { x: number; y: number } {
    const element = document.querySelector('.chat-container') as HTMLElement;
    const parent = document.querySelector('.drag-boundary') as HTMLElement;
  
    const maxX = parent.clientWidth - element.clientWidth;
    const maxY = parent.clientHeight - element.clientHeight;
  
    return {
      x: Math.min(Math.max(0, position.x), maxX),
      y: Math.min(Math.max(0, position.y), maxY)
    };
  }

  sendMessage(userInput:any) {
    if (!userInput.trim()) return;

    const userMessage = userInput;
    if(userInput !== GREETING_MESSAGE){
      this.messages.push({ text: userMessage, user: true });
    }
    this.loading = true;

    // Send to backend API
    this.http.post<{ reply: string }>('http://localhost:3000/api/chat', 
    { message: userMessage })
      .subscribe(res => {
        this.messages.push({ text: res.reply, user: false });
        this.userInput = '';
        this.loading = false;
      }, err => {
        this.messages.push({ text: "Sorry, there was an error.", user: false });
        this.loading = false;
      });
  }
}
