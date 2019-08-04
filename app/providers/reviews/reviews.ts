import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Reviews {

    data: any;

    constructor(private http: Http) {
        this.data = null;
    }

    getReviews(){

        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {

            //this.http.get('http://localhost:8080/api/reviews')
            this.http.get('https://reviewsking.herokuapp.com/api/reviews')
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });

    }

    createReview(review){

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('https://reviewsking.herokuapp.com/api/reviews', JSON.stringify(review), {headers: headers})
            .subscribe(res => {
                console.log(res.json());
            });

    }

    deleteReview(id){

        this.http.delete('https://reviewsking.herokuapp.com/api/reviews' + id).subscribe((res) => {
            console.log(res.json());
        });

    }

}