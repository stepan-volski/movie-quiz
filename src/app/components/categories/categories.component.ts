import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RequestsService } from 'src/app/requests.service';
import { selectCategory } from 'src/app/store/actions/categories.actions';
import { gameInit } from 'src/app/store/actions/game.actions';
import { IAppState, ICategory } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit, OnDestroy {
  // @ViewChildren(MatCard) cards!: MatCard[];
  @ViewChild('title') titleRef!: ElementRef;
  cards!: any;
  currentScrollPosition = 0;
  previousScrollPosition = 0;
  totalHeight = 0;
  currentCardId = 0;
  categories: ICategory[] = [
    {
      id: 0,
      name: 'Top 250 movies',
    },
    {
      id: 1,
      name: 'Top detective stories',
    },
    {
      id: 2,
      name: 'Top russian  movies',
    },
  ];

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private hostElement: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log('init');
    this.cards = this.hostElement.nativeElement.querySelectorAll('mat-card');
    this.totalHeight = this.hostElement.nativeElement.clientHeight;
    console.log('height ', this.totalHeight);
    let ticking = false;

    document.addEventListener('scroll', (e) => {
      console.log('scroll');
      this.currentScrollPosition = window.scrollY;

      this.handleTitleScroll();

      if (!ticking) {
        ticking = true;
        this.handleCardsScroll();
        setTimeout(() => {
          ticking = false;
          this.previousScrollPosition = window.scrollY;
        }, 1500);
      }
    });
  }

  private handleTitleScroll() {
    const percentageOffset = this.currentScrollPosition / this.totalHeight;
    const startTop = 10;
    const startLeft = 8;
    const maxDistanceLeft = 4;
    const maxDistanceTop = 12;

    const top =
      percentageOffset > 0.5
        ? startTop + maxDistanceTop - percentageOffset * maxDistanceTop
        : startTop + percentageOffset * maxDistanceTop;

    let left = 0;
    if (percentageOffset >= 0 && percentageOffset < 0.25) {
      left = startLeft - percentageOffset * maxDistanceLeft * 2;
    } else if (percentageOffset > 0.75) {
      left = startLeft + (1 - percentageOffset) * maxDistanceLeft * 2;
    } else {
      left =
        startLeft -
        maxDistanceLeft / 2 +
        (percentageOffset - 0.25) * maxDistanceLeft * 2;
    }
    // percentageOffset > 0.25 && percentageOffset < 0.75
    //   ? startLeft - (0.5 - percentageOffset) * maxDistance + maxDistance / 2
    //   :

    this.renderer.setStyle(this.titleRef.nativeElement, 'top', `${top}%`);
    this.renderer.setStyle(this.titleRef.nativeElement, 'left', `${left}%`);

    // this.titleRef.nativeElement.style.top = 20;
  }

  private handleCardsScroll() {
    this.currentCardId =
      this.currentScrollPosition > this.previousScrollPosition
        ? (this.currentCardId + 1) % this.cards.length
        : this.currentCardId === 0
        ? this.cards.length - 1
        : this.currentCardId - 1;

    const offsetZ = 200 * this.currentCardId;

    this.cards.forEach((card: HTMLElement, i: number) => {
      card.style.transform = `translate3d(${400 * i - 2 * offsetZ}px, ${
        -200 * i + 1 * offsetZ
      }px, ${-200 * i + offsetZ}px)`;

      card.style.opacity = 1 - (0.5 * (i * 200 - offsetZ)) / 200 + '';
    });
  }

  private handleScrollEvent(event: Event, cards?: any) {
    this.currentScrollPosition = window.pageYOffset;

    this.currentScrollPosition > this.previousScrollPosition
      ? this.scrollToNextCard(cards)
      : null;

    this.previousScrollPosition = this.currentScrollPosition;

    // cards.forEach((card: HTMLElement, i: number) => {
    //   card.style.transform = `translate3d(${400 * i - 2 * scrollPosition}px, ${
    //     -100 * i + 0.5 * scrollPosition
    //   }px, ${-200 * i + scrollPosition}px)`;

    //   card.style.opacity = 1 - (0.5 * (i * 200 - scrollPosition)) / 200 + '';
    // });
  }

  private scrollToNextCard(cards: any) {
    this.currentCardId++;
    const scrollPosition = 200 * this.currentCardId;
    console.log('scrollPosition', scrollPosition);

    cards.forEach((card: HTMLElement, i: number) => {
      card.style.transform = `translate3d(${400 * i}px, ${
        -100 * i + 0.5 * scrollPosition
      }px, ${-200 * i + scrollPosition}px)`;

      card.style.opacity = 1 - (0.5 * (i * 200 - scrollPosition)) / 200 + '';
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.handleScrollEvent);
  }

  onSelectCategory(id: number) {
    this._store.dispatch(
      selectCategory({ selectedCategory: this.categories[id] })
    );
    this._store.dispatch(gameInit());
    this._router.navigate(['/quiz']);
  }
}
