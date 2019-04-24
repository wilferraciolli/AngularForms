import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Employee} from "../models/employee.model";
import {Observable} from "rxjs";

@Injectable()
export class FormPoster {

  constructor(private http: Http) {

  }

  /**
   * Function to make a http call to a back end server and retrieve an array os strings.
   */
  getLanguages(): Observable<any> {
    return this.http.get('http://localhost:4100/languages')
      .delay(3000)
      .map(this.extractLanguages)
      .catch(this.handleError);
  }

  postEmployeeForm(employee: Employee): Observable<any> {
    //create the json body
    let body = JSON.stringify(employee);

    //create headers
    let headers = new Headers({'Content-Type': 'application/json'});

    //build the request
    let options = new RequestOptions({headers: headers});

    return this.http.post('http://localhost:4100/employess', body, options)
      .map(this.extractData)
      .catch(this.handleError);

    // console.log('posting employee ', employee);
  }

  private extractLanguages(response: Response) {
    //get the body of the payload
    let body = response.json();

    //return the data part of the response body
    return body.data || {};
  }

  private extractData(response: Response) {
    //get the json body of the response
    let body = response.json();

    //return the field attributes only OR an empty object
    return body.fields || {};
  }

  private handleError(error: any) {
    console.error('post error: ', error);
    return Observable.throw(error.status + ' ' + error.statusText);
  }
}
