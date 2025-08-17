import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ToastData {
  title: string;
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastData | null>(null);
  toast$ = this.toastSubject.asObservable();

  show(options: ToastData) {
    this.toastSubject.next(options);
  }

  clear() {
    this.toastSubject.next(null);
  }
}
