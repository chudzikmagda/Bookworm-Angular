import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewBookComponent } from './components/shared/add-new-book/add-new-book.component';

const routes: Routes = [
	{ path: 'add-new-book', component: AddNewBookComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
