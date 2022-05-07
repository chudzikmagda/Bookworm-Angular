import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/ui-elements/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogotypeComponent } from './components/ui-elements/logotype/logotype.component';
import { TableCellComponent } from './components/ui-elements/table-cell/table-cell.component';
import { TableComponent } from './components/table/table.component';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
    declarations: [
        AppComponent,
        ButtonComponent,
        HeaderComponent,
        FooterComponent,
        LogotypeComponent,
        TableCellComponent,
        TableComponent,
        StatsComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
