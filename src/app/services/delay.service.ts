// services/delay.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DelayService {
  private queues: Map<string, Function[]> = new Map();
  private isProcessingQueue: Map<string, boolean> = new Map();

  enqueueFunction(queueName: string, fn: Function) {
    if (!this.queues.has(queueName)) {
      this.queues.set(queueName, []);
      this.isProcessingQueue.set(queueName, false);
    }
    this.queues.get(queueName)!.push(fn);
    this.processQueue(queueName);
  }

  private processQueue(queueName: string) {
    if (this.isProcessingQueue.get(queueName)) {
      return;
    }
    this.isProcessingQueue.set(queueName, true);
    this.executeNextFunction(queueName);
  }

  private executeNextFunction(queueName: string) {
    if (!this.queues.get(queueName) || this.queues.get(queueName)!.length === 0) {
      this.isProcessingQueue.set(queueName, false);
      return;
    }

    const nextFunction = this.queues.get(queueName)!.shift();
    nextFunction!();

    setTimeout(() => {
      this.executeNextFunction(queueName);
    }, 500);  // 500 Millisekunden Delay
  }
}
