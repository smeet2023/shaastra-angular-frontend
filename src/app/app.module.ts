import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // <-- required!

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient , withFetch } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';


// ✅ Import AuthModule
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ParticipantDashboardComponent } from './participant-dashboard/participant-dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminDashboardComponent,
    ParticipantDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    AuthModule, // ✅ Add this so Angular recognizes LoginAdminComponent, FormsModule, etc.
    NgxChartsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
