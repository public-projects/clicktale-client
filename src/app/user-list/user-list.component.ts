import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Observable, Subject } from 'rxjs';
import { User } from '../classes/user';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges {
  @Input() term: string;
  users$: Observable<User[]>;
  private searchTerms = new Subject<string>();
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.usersService.searchUsers(term, true))
    );
    setTimeout(() => {
      this.searchTerms.next(this.term);
    }, 400);

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes');
    console.log(changes.term.currentValue);
    // this.usersService.searchUsers(this.term, true);
    this.searchTerms.next(changes.term.currentValue);
  }
}
