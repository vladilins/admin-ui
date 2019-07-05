import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnInit
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators
} from "@angular/forms";

import { map } from "rxjs/operators";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent {
  exists = false;

  // @Input() pizza: Pizza;
  // @Input() toppings: Topping[];

  // @Output() selected = new EventEmitter<Pizza>();
  // @Output() create = new EventEmitter<Pizza>();
  // @Output() update = new EventEmitter<Pizza>();
  // @Output() remove = new EventEmitter<Pizza>();

  form = this.fb.group({
    name: ["", Validators.required],
    toppings: [[]]
  });

  constructor(private fb: FormBuilder) {}

  get nameControl() {
    return this.form.get("name") as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError("required") && this.nameControl.touched;
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (this.pizza && this.pizza.id) {
  //     this.exists = true;
  //     this.form.patchValue(this.pizza);
  //   }
  //   this.form
  //     .get("toppings")
  //     .valueChanges.pipe(
  //       map(toppings => toppings.map((topping: Topping) => topping.id))
  //     )
  //     .subscribe(value => this.selected.emit(value));
  // }

  // createPizza(form: FormGroup) {
  //   const { value, valid } = form;
  //   if (valid) {
  //     this.create.emit(value);
  //   }
  // }

  // updatePizza(form: FormGroup) {
  //   const { value, valid, touched } = form;
  //   if (touched && valid) {
  //     this.update.emit({ ...this.pizza, ...value });
  //   }
  // }

  // removePizza(form: FormGroup) {
  //   const { value } = form;
  //   this.remove.emit({ ...this.pizza, ...value });
  // }
}
