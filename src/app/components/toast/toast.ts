import { Component, Input, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { icCheck, icError, icInfo } from '../../common/icons';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'toast',
  styleUrl: './toast.scss',
  imports: [LucideAngularModule],
  template: `
    @if (visible) {
    <div class="toast toast-end">
      <div
        class="flex items-start gap-3 bg-white rounded-xl shadow-lg p-4 w-96 border border-gray-200"
      >
        <lucide-angular class="my-icon text-green-500" [img]="getIcons()" />

        <div class="flex-1">
          <p class="font-semibold text-gray-900">{{ title }}</p>
          <p class="text-sm text-gray-500">
            {{ message }}
          </p>
        </div>

        <button class="text-gray-400 hover:text-gray-600" (click)="close()">✕</button>
      </div>
    </div>
    }

  `,
})
export class Toast implements OnInit {
  @Input() icon: 'success' | 'error' | 'info' = 'success';
  @Input() title = '';
  @Input() message = '';
  @Input() duration = 3000;
  visible = false;
  timeoutId: any;
  icons = {
    icCheck: icCheck,
    icError: icError,
    icInfo: icInfo,
  }

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    // if (this.duration > 0) {
    //   setTimeout(() => this.close(), this.duration);
    // }
    this.toastService.toast$.subscribe(toast => {
      if (toast) {
        this.title = toast.title;
        this.message = toast.message;
        this.visible = true;

        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => this.close(), toast.duration || 3000);
      }
    });
  }

  close() {
    this.visible = false;
    this.toastService.clear();
  }

  getIcons() {
    switch (this.icon) {
      case 'success':
        return this.icons.icCheck;
      case 'error':
        return this.icons.icError;
      case 'info':
        return this.icons.icInfo;
      default:
        return undefined;
    }
  }
}
