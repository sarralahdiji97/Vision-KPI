import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    standalone: false,
  selector: 'opm-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  public isForbiddenPage!: boolean;
  private sub!: Subscription;
  constructor(private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.activateRouter.queryParams.subscribe((params: any) => {
      this.isForbiddenPage = params.forbidden;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
