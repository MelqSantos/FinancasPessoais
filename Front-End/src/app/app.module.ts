// Módulos
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { GaugeModule } from 'angular-gauge';
import { NgChartsModule } from 'ng2-charts';
import { GaugeChartModule } from 'angular-gauge-chart';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
registerLocaleData(ptBr);

// Comonentes
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { CadastrarComponent } from './paginas/cadastrar/cadastrar.component';
import { AlertaComponent } from './shared/alerta/alerta.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { CategoriasComponent } from './paginas/categorias/categorias.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { EconomiasComponent } from './paginas/economias/economias.component';
import { GraficoComponent } from './shared/grafico/grafico.component';
import { TransacoesComponent } from './paginas/transacoes/transacoes.component';
import { GaugeChartComponent } from './shared/gauge-chart/gauge-chart.component';
import { RelatoriosComponent } from './paginas/relatorios/relatorios.component';
import { InterceptorService } from './paginas/components/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastrarComponent,
    AlertaComponent,
    DashboardComponent,
    CategoriasComponent,
    PerfilComponent,
    EconomiasComponent,
    GraficoComponent,
    TransacoesComponent,
    GaugeChartComponent,
    RelatoriosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    OrderModule,
    CurrencyMaskModule,
    GaugeModule,
    NgChartsModule,
    GaugeChartModule,
    MatProgressBarModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    GaugeModule.forRoot()
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
