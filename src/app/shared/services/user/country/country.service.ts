import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Country } from '../../../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  http = inject(HttpClient);
  router = inject(Router);


  private readonly BASE_HOST_MS = `${environment.user_base_path}`;
  private readonly COUNTRY_REST_CONTROLLER = `${environment.country_controller}`

  getAllCountriesInfo(){
    return this.http.get<Country[]>(this.BASE_HOST_MS + this.COUNTRY_REST_CONTROLLER);
  }

}
