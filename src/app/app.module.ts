import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoToTopComponent } from './components/footer/components/go-to-top/go-to-top.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BooksComponent } from './components/sections/books/books.component';
import { EditBookComponent } from './components/sections/books/components/edit-book/edit-book.component';
import { SearchBarComponent } from './components/sections/books/components/search-bar/search-bar.component';
import { TableComponent } from './components/sections/books/components/table/table.component';
import { IntroComponent } from './components/sections/intro/intro.component';
import { MotivateQuoteComponent } from './components/sections/motivational-quote/motivational-quote.component';
import { BestBookComponent } from './components/sections/summary/components/best-book/best-book.component';
import { LastAddedBookComponent } from './components/sections/summary/components/last-added-book/last-added-book.component';
import { QuoteComponent } from './components/sections/summary/components/quote/quote.component';
import { StatsComponent } from './components/sections/summary/components/stats/stats.component';
import { SummaryComponent } from './components/sections/summary/summary.component';
import { AddNewBookComponent } from './components/shared/add-new-book/add-new-book.component';
import { ButtonComponent } from './components/shared/ui-elements/button/button.component';
import { DialogComponent } from './components/shared/ui-elements/dialog/dialog.component';
import { InputComponent } from './components/shared/ui-elements/input/input.component';
import { LogotypeComponent } from './components/shared/ui-elements/logotype/logotype.component';
import { PaginationComponent } from './components/shared/ui-elements/pagination/pagination.component';
import { TableCellComponent } from './components/shared/ui-elements/table-cell/table-cell.component';
import { TextareaComponent } from './components/shared/ui-elements/textarea/textarea.component';
import { BookFormComponent } from './components/shared/book-form/book-form.component';
import { FormErrorComponent } from './components/shared/book-form/components/form-error/form-error.component';

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
		PaginationComponent,
		SearchBarComponent,
		EditBookComponent,
		BookFormComponent,
		FormErrorComponent,
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
