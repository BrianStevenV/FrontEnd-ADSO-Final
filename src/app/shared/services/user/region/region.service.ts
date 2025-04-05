import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Region } from '../../../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  http = inject(HttpClient);
  router = inject(Router);

  private readonly BASE_HOST_MS = `${environment.user_base_path}`;
  private readonly REGION_REST_CONTROLLER = `${environment.region_controller}`

  getAllRegionsInfo(){
    return this.http.get<Region[]>(this.BASE_HOST_MS + this.REGION_REST_CONTROLLER);
  }
}
