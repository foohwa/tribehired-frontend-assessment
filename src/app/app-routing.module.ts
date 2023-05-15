import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {PostDetailComponent} from "./pages/post-detail/post-detail.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "post/:id",
    component: PostDetailComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
