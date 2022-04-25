import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { EnvironmentService } from 'src/app/libs/environment/environment.service';

@Injectable()
export class UsersDataService {
  baseUrl: string;
  constructor(
    private client: HttpClient,
    environmentService: EnvironmentService
  ) {
    this.baseUrl = environmentService.bffUrl + 'users/'; // TODO add a path here.
  }

  // one for checking if an email address is available

  isEmailAvailable(email: string): Observable<boolean> {
    return this.client.head(this.baseUrl + `email?email=${email}`).pipe(
      map(() => false), // if we get a 200 - 299 back, then you can't use that email
      catchError(() => of(true)) // if we get ANY error back, you can (TODO: think more deeply about this tomorrow)
    );
  }
  // one for checking if a username is available
  isUsernameAvailable(username: string): Observable<boolean> {
    return this.client
      .head(this.baseUrl + `username?username=${username}`)
      .pipe(
        map(() => false),
        catchError(() => of(true))
      );
  }
}
