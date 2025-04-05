import { Component, inject, OnInit } from '@angular/core';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { ToastType, Toast, TOAST_VISIBILITY_DURATION } from '../../../shared/models/toast.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit{
  message!: string;
  isVisible!: boolean;
  type: ToastType = ToastType.SUCCESS;

  toastService = inject(ToastService);

  ngOnInit(): void {
    this.toastService.toastState.subscribe((toast) => {
      
      this.createToast(toast);
      this.showToastDuration();
      
    })
  }

  private createToast(toast: Toast){
    this.message = toast.message
    this.type = toast.type
    this.isVisible = true;
  }

  private showToastDuration(){
    setTimeout(() => {
      this.isVisible = false;
    }, TOAST_VISIBILITY_DURATION);
  }

}
