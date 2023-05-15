import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap
} from "rxjs";
import {Post} from "../../interface/post";
import {CommonModule, Location, NgOptimizedImage} from "@angular/common";
import {PostService} from "../../services/post.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Comment} from "../../interface/comment";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  standalone: true
})
export class PostDetailComponent {
  public searchQueryControl = new FormControl('', {nonNullable: true});
  public post$: Observable<Post> = this.activatedRoute.params.pipe(
    switchMap(({id}) => this.postService.getPostById(id))
  )
  public comments$: Observable<Comment[]> = this.activatedRoute.params.pipe(
    switchMap(({id}) => this.postService.getPostComments(id)),
    shareReplay(1)
  )
  public filteredComments$: Observable<Comment[]> = combineLatest([this.searchQueryControl.valueChanges.pipe(startWith("")), this.comments$]).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map(([searchTerm, comments]) => {
        return this.filterCommentArray(searchTerm, comments);
      }
    )
  );

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private location: Location) {
  }

  public navigateBack(): void {
    this.location.back();
  }

  public filterCommentArray(searchTerm: string, comments: Comment[]): Comment[] {
    if (!searchTerm) {
      return comments;
    }

    return comments.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
}
