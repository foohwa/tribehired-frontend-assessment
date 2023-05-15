import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../interface/post";
import {PostService} from "../../services/post.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
  ],
  standalone: true
})
export class HomeComponent {
  public posts$: Observable<Post[]> = this.postSvc.getAllPosts();

  constructor(private postSvc: PostService) {
  }
}
