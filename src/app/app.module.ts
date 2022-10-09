import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/ui-elements/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogotypeComponent } from './components/ui-elements/logotype/logotype.component';
import { TableCellComponent } from './components/ui-elements/table-cell/table-cell.component';
import { TableComponent } from './components/table/table.component';
import { StatsComponent } from './components/stats/stats.component';
import { BestBookComponent } from './components/best-book/best-book.component';
import { LastAddedBookComponent } from './components/last-added-book/last-added-book.component';
import { QuoteComponent } from './components/quote/quote.component';
import { DialogComponent } from './components/ui-elements/dialog/dialog.component';
import { InputComponent } from './components/ui-elements/input/input.component';
import { TextareaComponent } from './components/ui-elements/textarea/textarea.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksComponent } from './components/sections/books/books.component';
import { IntroComponent } from './components/sections/intro/intro.component';
import { SummaryComponent } from './components/sections/summary/summary.component';
import { GoToTopComponent } from './components/go-to-top/go-to-top.component';
import { MotivateQuoteComponent } from './components/sections/motivational-quote/motivational-quote.component';

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
		BestBookComponent,
		LastAddedBookComponent,
		QuoteComponent,
		DialogComponent,
		InputComponent,
		TextareaComponent,
		AddNewBookComponent,
		BooksComponent,
		IntroComponent,
		SummaryComponent,
		GoToTopComponent,
		MotivateQuoteComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
