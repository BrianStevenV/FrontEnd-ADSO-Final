import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user/user.service';
import { DashboardUserResponseDto } from '../../../shared/models/user.model';
import { TableComponent } from "../../../design-system/organisms/table/table.component";
import { Validators } from '@angular/forms';
import { ButtonComponent } from "../../../design-system/atoms/button/button.component";
import { ButtonProps } from '../../../shared/types/types-prop-design-system/atoms/ButtonProps.type';
import { ModalComponent } from "../../../design-system/molecules/modal/modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableComponent, ButtonComponent, ModalComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  //TODO: Directive Administrator Role here
  private router = inject(Router)
  private userService = inject(UserService)
  private changeDetectorRef = inject(ChangeDetectorRef)

  headers = ['ID', 'Email', 'Role', 'Status', 'Created At', 'Country']
  keys = ['id', 'email', 'roleName', 'status', 'createdAt', 'countryName']

  currentPage!: number
  totalItems!: number
  itemsPerPage!: number
  dataToDashboard!: DashboardUserResponseDto[];

  modalVisible = false
  modalTitle = ''
  closeButtonNameModal = 'Back'
  submitButtonNameModal = 'Submit'
  modalFormFields: { name: string, label: string, type: string, validators: any[], maxLength: number }[] = []

  modalMode!: 'changeStatus' | null;

  changeStatusBtnProps: ButtonProps = {
    buttonName: 'Change Status',
    buttonType: 'button',
    onClick: () => this.openChangeStatusModal()
  }
  
  ngOnInit(): void {
    this.loadInitialData();
  }

  openChangeStatusModal(): void{
    this.modalVisible = true;
    this.modalTitle = 'Change User Status';
    this.modalMode = 'changeStatus';
    this.modalFormFields = [
      {
        name: 'userId',
        label: 'User ID',
        type: 'number',
        validators: [Validators.required],
        maxLength: 9999999999
      }
    ];
    this.modalFormFields = [...this.modalFormFields];
    this.changeDetectorRef.detectChanges();
  }

  closeModal(): void {
    this.modalVisible = false;
    this.modalMode = null;
  }
  
  onModalSubmit(formValue: any): void {
    if(this.modalMode === 'changeStatus') {
      this.userService.patchChangeStatusUser(formValue.userId).subscribe({
        next: (response) => {
          console.log('User status changed successfully:', response);
          this.getAllUsers();
        },
        error: (error) => {
          console.error('Error changing user status:', error);
        }
      });
    }
  }

  private loadInitialData() {
    this.getAllUsers();
  }

  private getAllUsers(){
    this.userService.getDashboardUsers().subscribe({
      next: (response) => {
        this.totalItems = response.totalElements;
        this.itemsPerPage = response.pageSize;
        this.dataToDashboard = response.content;

        console.log('Users:', this.dataToDashboard);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    })
  }
}
