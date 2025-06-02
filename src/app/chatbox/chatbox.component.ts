import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  @Input('position') position: string ='btm-right'
  @ViewChild('overlay-container', { static: false }) ovrerlay!: ElementRef
  loading = false;
  isOpen = false;
  userInput = '';
  messages: { text: string, user: boolean, suggestedResponses?: string, graphs?: string }[] = [{text:"Hello! Welcome to Vanguard Group. How may I assist you today?",user: false}];

  cdkDragFreeDragPosition = { x: 0 , y: 0 };

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(){
    // this.initializeChatboxPos(this.position)
    setTimeout(()=>{
      if(!this.isOpen){
        this.toggleChat()
      }
    },3000)
  }

  ngOnChanges(){
    console.log(this.cdkDragFreeDragPosition)
  }
  
  // initializeChatboxPos(position: string){
  //   let parent = this.ovrerlay.nativeElement.getBoundingClientRect();
  //   switch(position){
  //     case 'btm-right':
  //       this.cdkDragFreeDragPosition.x = parent.width
  //       this.cdkDragFreeDragPosition.y = parent.height
  //       break;
  //     case 'btm-left':
  //       this.cdkDragFreeDragPosition.y = parent.height
  //       break;
  //     case 'top-right':
  //       this.cdkDragFreeDragPosition.x = parent.width
  //       break;
  //   }
  // }
  sendMessage(userInput:any) {
    if (!userInput.trim()) return;

    const userMessage = userInput;
    this.loading = true;

    // Send to backend APId1ra5p3c4yynd2.cloudfront.net
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
