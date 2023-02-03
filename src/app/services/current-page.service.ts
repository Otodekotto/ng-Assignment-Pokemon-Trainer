import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentPageService {
  private catalogue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public catalogue$: Observable<boolean> = this.catalogue.asObservable();
  constructor() {}
  updateCurrentPage(boolean: boolean) {
    this.catalogue.next(boolean);
  }
}
