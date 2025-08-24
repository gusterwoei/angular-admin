import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, ElementRef, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DialogButton {
  label: string;
  action: () => void;
  class?: string;
}

export interface DialogConfig {
  content: TemplateRef<any>;
  buttons: DialogButton[];
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dialog #dialogRef class="modal" [class.modal-open]="visible">
      <div class="modal-box">
        <ng-container *ngTemplateOutlet="config.content"></ng-container>
        <div class="modal-action">
          <form method="dialog">
            @for (button of config.buttons; track $index) {
              <button
                [ngClass]="'btn ' + (button.class || '')"
                (click)="onButtonClick(button)"
                type="button"
              >
                {{ button.label }}
              </button>
            }
          </form>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button (click)="close()" type="button">close</button>
      </form>
    </dialog>
  `
})
export class Dialog {
  @Input() config!: DialogConfig;
  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  onButtonClick(button: DialogButton) {
    button.action();
    this.close();
  }

  close() {
    this.visible = false;
    this.closed.emit();
  }

  show() {
    this.visible = true;
    this.dialogRef?.nativeElement?.showModal();
  }
}

@Injectable({ providedIn: 'root' })
export class DialogService {
  private dialogRef: ComponentRef<Dialog> | null = null;

  constructor() { }

  show(config: DialogConfig, viewContainerRef: ViewContainerRef): Promise<void> {
    return new Promise((resolve) => {
      this.dialogRef = viewContainerRef.createComponent(Dialog);
      this.dialogRef.instance.config = config;
      this.dialogRef.instance.closed.subscribe(() => {
        this.close();
        resolve();
      });

      this.dialogRef.instance.show();
    });
  }

  close() {
    if (this.dialogRef) {
      this.dialogRef.destroy();
      this.dialogRef = null;
    }
  }
}