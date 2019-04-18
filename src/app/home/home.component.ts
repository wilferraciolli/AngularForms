import {Component} from '@angular/core';
import {Employee} from "../models/employee.model";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  languages = ['English', 'Greek', 'Other'];
  model = new Employee('', '', true, '', 'default')
  hasPrimaryLanguageError = false;

  /**
   * Function to check whether a value other than the default was chosen.
   * This is to validate the select model
   * @param event
   */
  validatePrimaryLanguage(event) {
    console.log('lang ' + this.model.primaryLanguage);
    if (this.model.primaryLanguage == 'default') {
      this.hasPrimaryLanguageError = true;
    } else {
      this.hasPrimaryLanguageError = false;
    }
  }

  firstNameToUpperCase(value: string) {
    if (value.length > 0) {
      //make the first letter capital
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      this.model.firstName = value;
    }

  }
}
