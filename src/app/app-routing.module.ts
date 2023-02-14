import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBookComponent } from './components/sections/books/components/edit-book/edit-book.component';
import { AddNewBookComponent } from './components/shared/add-new-book/add-new-book.component';
import { ADD_NEW_BOOK_PATH, EDIT_BOOK_PATH } from './models/models';

const routes: Routes = [
	{ path: ADD_NEW_BOOK_PATH, component: AddNewBookComponent },
	{ path: `${EDIT_BOOK_PATH}/:id`, component: EditBookComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
