import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Subject, Observable } from 'rxjs';
import { User } from '../classes/user';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss'],
  providers: [UsersService]
})
export class UsersSearchComponent implements OnInit {
  @Output() updateList: EventEmitter<string> =  new EventEmitter();
  users$: Observable<User[]>;
  term: string;
  private searchTerms = new Subject<string>();

  constructor(private usersService: UsersService) { }

  // Push a search term into the observable stream.
  search(): void {
    this.searchTerms.next(this.term);
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.usersService.searchUsers(term, false)),
    );
  }
  updateUsersList() {
    this.updateList.emit(this.term);
  }
}
