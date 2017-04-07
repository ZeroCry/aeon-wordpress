import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Post } from '../model/post.model';
import { ApiUrl } from '../constants/api-url.var';

@Injectable()
export class ClientService {
    private api: ApiUrl = new ApiUrl();
    constructor(private http: Http) {

    }

    getListPosts(page: number, options?: any) {
        let opts: string;
        opts = options == null ? '' : `&${options.type}=${options.id}`;
        return this.http.get(`${this.api.GET_POSTS}?page=${page}${opts}`)
            .map(res => {
                let posts = res.json();
                posts.forEach(post => {
                    if (post.featured_media) {
                        this.getMedia(post.featured_media)
                            .subscribe(res => {
                                post.media_url = res;
                            })
                    }
                    if (post.author) {
                        this.getAuthor(post.author)
                            .subscribe(res => {
                                post.author_name = res;
                            })
                    }
                });
                console.log(posts);
                return posts;
            });
    }

    getListCategories(page: number){
        return this.http.get(`${this.api.GET_CATEGORIES}?page=${page}`)
            .map((res: Response) => res.json())
    }

    getListTags(page: number) {
        return this.http.get(`${this.api.GET_TAGS}?page=${page}`)
            .map((res: Response) => res.json())
    }

    getListPages() {
        return this.http.get(this.api.GET_PAGES)
            .map((res: Response) => res.json())
            .map(res => {
                return res;
            });
    }

    getListComments() {
        return this.http.get(this.api.GET_COMMENTS)
            .map((res: Response) => res.json())
            .map(res => {
                return res;
            });
    }

    getMedia(id: number) {
        return this.http.get(this.api.GET_MEDIA + id)
            .map((res: Response) => res.json())
            .map(res => {
                return res.source_url;
            });
    }

    getAuthor(id: number){
        return this.http.get(this.api.GET_USER + id)
            .map((res: Response) => res.json())
            .map(res => {
                return res.name;
            });
    }

    getPostContent(id: number) {
        return this.http.get(`${this.api.GET_POSTS}/${id}`)
        .map((res: Response) => res.json())
        .map(res=>{
            return new Post(res.title, res.date, res.content);
        });
    }
}