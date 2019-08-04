import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {description} from "@angular/compiler/src/i18n/shared";


@Component({
  templateUrl: 'build/pages/add-review/add-review.html',
})
export class AddReviewPage {

  title: any;
  description: any;
  rating: any;

  constructor(private view: ViewController) {

  }

  save(): void{
    let review={
      title:this.title,
      description: this.description,
      rating: this.rating
    };
    this.view.dismiss(review);
  }

  close(): void{
    this.view.dismiss();
  }

}
