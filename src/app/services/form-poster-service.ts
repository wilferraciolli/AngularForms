import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Employee} from "../models/employee.model";
import {Observable} from "rxjs";

@Injectable()
export class FormPoster {

  constructor(private http: Http) {

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

  private extractData(response : Response){
    //get the json body of the response
    let body =  response.json();

    //return the field attributes only OR an empty object
    return body.fields || {};
  }

  private handleError(error: any){
    console.error('post error: ', error);
    return Observable.throw(error.statusText);
  }
}
