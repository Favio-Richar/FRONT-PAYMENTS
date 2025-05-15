import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/payment';

  constructor(private http: HttpClient) {}

  crearTransaccion(payload: any) {
    return this.http.post(this.apiUrl, payload);
  }
}
