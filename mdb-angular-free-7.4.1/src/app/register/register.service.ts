import { Login } from './../models/Login';
import { UserModel } from './../models/UserModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { RestResponse } from './../models/RestResponse.model';
import { TypeDocument } from './../models/TypeDocument';
import { ReserveModel } from '../models/ReserveModel';
import { showReserve } from '../models/showReserve';
@Injectable({
    providedIn: 'root'
})
export class CreateUserService {
    constructor(private http: HttpClient) { }

    public saveOurUpdate(user: UserModel): Observable<RestResponse> {
        return this.http.post<RestResponse>('https://hotel-yeimar.herokuapp.com/listUser', user);
    }

    public verifyUser(document: string): Observable<RestResponse> {
        return this.http.get<RestResponse>('https://hotel-yeimar.herokuapp.com/listUser/verifyUser/' + document);
    }

    public validateReserveshared(date1: String, date2: String): Observable<Number> {
        return this.http.get<Number>("https://hotel-yeimar.herokuapp.com/listReserve/sharedAvailability?date=" + date1 + "&date=" + date2);
    }

    public validateindividualAvailabilityRoom(date1: String, date2: String, camas:number): Observable<Number> {
        return this.http.get<Number>("https://hotel-yeimar.herokuapp.com/listReserve/individualAvailabilityRoom?date=" + date1 + "&date=" + date2+ "&date=" + camas);
    }

    public saveReserve(reserve: ReserveModel): Observable<RestResponse> {
        return this.http.post<RestResponse>('https://hotel-yeimar.herokuapp.com/listReserve', reserve);
    }

    public ValidateLogin(login: Login): Observable<UserModel> {
        return this.http.get<UserModel>("https://hotel-yeimar.herokuapp.com/listUser/verifyUser?data=" + login.Loginemai + "&data=" + login.password);
    }

    public getTypeDocument(): Observable<TypeDocument[]> {
        return this.http.get<TypeDocument[]>(
            'https://hotel-yeimar.herokuapp.com/listTypeDocument'
        );
    }

    public showreserve(id: number): Observable<showReserve[]> {
        return this.http.get<showReserve[]>("https://hotel-yeimar.herokuapp.com/listReserve/listHistoryReserveClient/"+id);
    }
}