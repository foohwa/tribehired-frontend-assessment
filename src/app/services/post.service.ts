import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../interface/post';
import {Comment} from "../interface/comment";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public BASE_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private httpClient: HttpClient) {
  }

  public getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.BASE_URL}/posts`);
  }

  public getPostById(postId: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.BASE_URL}/posts/${postId}`);
  }

  public getPostComments(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.BASE_URL}/comments?${postId}`)
  }
}
