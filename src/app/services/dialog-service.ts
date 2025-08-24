import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { DialogComponent, DialogConfig } from '../components/dialog/dialog';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private dialogRef: ComponentRef<DialogComponent> | null = null;

  constructor() { }

  show(config: DialogConfig, viewContainerRef: ViewContainerRef): Promise<void> {
    return new Promise((resolve) => {
      this.dialogRef = viewContainerRef.createComponent(DialogComponent);
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