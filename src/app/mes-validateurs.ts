import {AbstractControl} from '@angular/forms';

export class MesValidateurs{
  static passwordConfirming(c: AbstractControl): {[s: string]: boolean} {
    if (c.get('pwd').value !== c.get('confirmPwd').value) {
      return {invalid: true};
    }
    return null;
  }
}
