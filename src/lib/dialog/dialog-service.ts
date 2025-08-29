import { Injectable, ComponentRef, ViewContainerRef } from "@angular/core";
import { Dialog, DialogConfig } from "./dialog";

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