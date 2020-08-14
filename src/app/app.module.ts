import { NgxSpinnerService } from 'ngx-spinner';
import { EditPanelComponent } from './pages/edit-panel/edit-panel.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSmartModalService, NgxSmartModalModule, } from 'ngx-smart-modal';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EditPanelService } from './pages/edit-panel/edit-panel.service';
import { ToastrModule } from 'ngx-toastr';
import { AdminPanelService } from './pages/admin-panel/admin-panel.service';
import { CustomHttpInterceptor } from '../providers/http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    EditPanelComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSmartModalModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],

  providers: [
    AdminPanelService,
    EditPanelService,
    NgxSmartModalService,
    NgxSpinnerService,
    //AuthorizationGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
