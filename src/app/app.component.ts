import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActionsService } from './services/actions/actions.service';
import { BooksComponent } from './components/sections/books/books.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { IntroComponent } from './components/sections/intro/intro.component';
import { MotivateQuoteComponent } from './components/sections/motivational-quote/motivational-quote.component';
import { RouterModule } from '@angular/router';
import { SummaryComponent } from './components/sections/summary/summary.component';

@Component({
	selector: 'c-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [
		RouterModule,
		BooksComponent,
		FooterComponent,
		HeaderComponent,
		IntroComponent,
		MotivateQuoteComponent,
		SummaryComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	private actionsService: ActionsService = inject(ActionsService);

	public ngOnInit(): void {
		this.loadSampleData();
	}

	private loadSampleData(): void {
		this.actionsService.getBookListFromApi().subscribe();
	}
}
