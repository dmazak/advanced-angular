import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { EnvironmentService } from 'src/app/libs/environment/environment.service';
import { ItemsDocuments } from '../state/actions/item.actions';
import { TodoItemEntity } from '../state/reducers/items.reducer';

@Injectable()
export class WebSocketsService {
  private connection!: signalR.HubConnection;
  private connected = false;
  private shouldConnect = false;
  private readonly url;

  connect() {
    this.shouldConnect = true;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.url)
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    this.connection.start().then(() => {
      console.log('*** The Hub Connection is Started');
      this.connection.on('itemAdded', (msg: WebSocketMessage) => {
        this.store.dispatch(ItemsDocuments.todo({ payload: msg.message }));
      });
      this.connection.on('itemCompleted', (msg: WebSocketMessage) => {
        this.store.dispatch(ItemsDocuments.todo({ payload: msg.message }));
      });
      this.connected = true;
    });
  }

  disconnect() {
    if (this.connected) {
      this.connection.stop().then(() => {
        this.connected = false;
      });
    }
  }

  constructor(environment: EnvironmentService, private store: Store) {
    this.url = environment.bffUrl + 'todos-hub/';
  }
}

interface WebSocketMessage {
  email: string;
  message: TodoItemEntity;
}
