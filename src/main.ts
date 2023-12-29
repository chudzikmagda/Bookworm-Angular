import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [provideHttpClient(), provideAnimations()],
});
