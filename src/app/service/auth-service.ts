import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {User} from "../model/app-user.model";
import {environment} from "../../environments/environment";
import {CustomResponse} from "../model/custom-response";

const API = environment.AUTH_API;

const httpOptions =environment.httpOptions

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public static  authenticated = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private http: HttpClient) { }

  login( formValue :{mail: string, password: string}): Observable<any> {
    return this.http.post(API + '/sign-in', {
     ...formValue
    }, httpOptions);
  }

  signUp(user: User): Observable<any> {
    return this.http.post(API + '/api/sign-up',
    {
      firstName: user.firstName,
      lastName : user.lastName,
      birthDate : user.birthdate,
      mail: user.mail,
      password: user.password
    }
    , httpOptions);
  }


  getUserProfile():Observable<CustomResponse> {
    return this.http.get<CustomResponse>(API + `/api/account`)
  }

}
