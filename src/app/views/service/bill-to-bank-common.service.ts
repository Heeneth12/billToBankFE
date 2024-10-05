import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillToBankCommonService {

  private apiUrl = 'http://localhost:8080'; // Base API URL

  constructor(private http: HttpClient) { }

  // Example of a GET request to fetch user details
  getUserDetails(userId: number): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get(url);
  }

  // POST request to login a user
  loginUser(number: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/user/login`;
    const body = { number, password };
    return this.http.post(url, body);
  }

  // Example of a POST request to register a new user
  registerUser(userData: any): Observable<any> {
    const url = `${this.apiUrl}/user/register`;
    return this.http.post(url, userData);
  }


    // Get collections by Salesman ID
    getCollectionsBySalesmanId(salesmanId: number): Observable<any> {
      const url = `${this.apiUrl}/collection/day-wise`;
      return this.http.get(url);
    }
  
    // Create a new collection
    createCollection(collections: any[]): Observable<any> {
      const url = `${this.apiUrl}/collection/create`;
      return this.http.post(url, collections);
    }



}
