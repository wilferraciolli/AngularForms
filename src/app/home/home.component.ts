import {Component} from '@angular/core';
import {Employee} from "../models/employee.model";
import {FormPoster} from "../services/form-poster-service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  languages = ['English', 'Greek', 'Other'];
  model = new Employee('', '', true, '', 'default')
  hasPrimaryLanguageError = false;

  constructor(private formPoster: FormPoster) {

  }

  /**
   * Function to check whether a value other than the default was chosen.
   * This is to validate the select model
   * @param event
   */
  validatePrimaryLanguage(value) {
    console.log('lang ' + this.model.primaryLanguage);
    if (value == 'default') {
      this.hasPrimaryLanguageError = true;
    } else {
      this.hasPrimaryLanguageError = false;
    }
  }

  /**
   * Function to replace  the first character to always be capital.
   * @param value
   */
  firstNameToUpperCase(value: string) {
    if (value.length > 0) {
      //make the first letter capital
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      this.model.firstName = value;
    }

  }

  /**
   * Function to handle when the form gets submitted.
   * @param form data passed from angular form.
   */
  submitForm(form: NgForm) {

    //validate
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    if (this.hasPrimaryLanguageError){
      //returnb out of the method if validation failed
      return;
    }

    // console.log(this.model); //show the value for the model entity
    // console.log(form.value); //show the value for the form data

    //create an Observable to create data on the api. this willr eturn the data or the error
    this.formPoster.postEmployeeForm(this.model)
      .subscribe(
        data => console.log('success: ', data),
        error => console.log('error: ', error)
      )
  }
}
