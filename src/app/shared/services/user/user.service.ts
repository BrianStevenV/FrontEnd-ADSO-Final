import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CreateUserRequestDto, UserResponseDto } from '../../models/user.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);
  router = inject(Router);
  
  private readonly BASE_HOST_MS = `${environment.user_base_path}`;
  private readonly USER_REST_CONTROLLER = `${environment.user_controller}`
  private readonly USER_POST_CREATE_USER = `${environment.user_post_create_user}`
  private readonly USER_GET_USER_BY_ID = `${environment.user_get_user_by_id}`
  private readonly USER_PATCH_UPDATE_USER = `${environment.user_patch_update_user}`

  createUser( user: CreateUserRequestDto): Observable<HttpResponse<CreateUserRequestDto>>{
    console.log("from user Service");
    return this.http.post<CreateUserRequestDto>(this.BASE_HOST_MS + this.USER_REST_CONTROLLER + this.USER_POST_CREATE_USER, user, {observe: 'response'});
  }

  getUserById(id: number): Observable<UserResponseDto>{
    const headers = AuthService.createAuthHeaders();
    console.log('Final URL:', this.BASE_HOST_MS + this.USER_REST_CONTROLLER + `/${id}`, {headers});
    return this.http.get<UserResponseDto>(this.BASE_HOST_MS + this.USER_REST_CONTROLLER + `/${id}`, {headers});
  }
}
