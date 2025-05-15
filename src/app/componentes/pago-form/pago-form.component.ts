import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pago',
  standalone: true,
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.scss'],
  imports: [
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    NgFor
  ]
})
export class PagoComponent {
  deudaHogarSeleccionada = true;
  deudaMovilSeleccionada = false;
  email = '';
  total = 12990;
  metodoSeleccionado = '';
  metodos = ['Webpay', 'Khipu', 'Servipag', 'Unired', 'Mach', 'Compraquí'];

  constructor(private http: HttpClient) {}

  seleccionarMetodo(metodo: string) {
    this.metodoSeleccionado = metodo;
  }

  pagar() {
    if (!this.metodoSeleccionado || !this.email) {
      alert('Por favor selecciona un método de pago e ingresa tu email.');
      return;
    }

    const payload = {
      amount: this.total,
      buy_order: 'ORD-' + Math.floor(Math.random() * 10000),
      session_id: 'SES-' + Math.floor(Math.random() * 10000),
      return_url: 'http://localhost:3000/frontend/confirm-webpay.html'
    };

    this.http.post<any>('http://localhost:3000/payment', payload)
      .subscribe({
        next: (response) => {
          console.log('Redirigiendo a Webpay con token...', response);
          window.location.href = `${response.url}?token_ws=${response.token}`;
        },
        error: (error) => {
          console.error('Error al crear la transacción:', error);
          alert('Hubo un problema al procesar el pago.');
        }
      });
  }
}
