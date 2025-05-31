import { Component, ElementRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';

const GREETING_MESSAGE = "Hello!"

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss'],
  providers:[],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class ChatboxComponent implements OnInit {
  @Input('agentid') agentId: string = '';
  @Input('agentaliasid') agentAliasId: string = '';
  @Input('sessionid') sessionId: string = '';
  loading = false;
  isOpen = false;
  userInput = '';
  messages: { text: string, user: boolean }[] = [];

  cdkDragFreeDragPosition = { x: 0, y: 0 };

  constructor(private http: HttpClient, private hostRef : ElementRef) {}

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

  sendMessage(userInput:any) {
    if (!userInput.trim()) return;

    const userMessage = userInput;
    if(userInput !== GREETING_MESSAGE){
      this.messages.push({ text: userMessage, user: true });
    }
    this.loading = true;

    // Send to backend API
    this.http.post<{ reply: string }>('http://localhost:3000/api/chat', 
    { message: userMessage, agentId: this.agentId, agentAliasId:this.agentAliasId, sessionId: this.sessionId  })
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
