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
import { Add } from "src/app/models/add";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent {
  exists = false;
  submitted = false;

  fileName;
  places = [1, 2, 3, 4];
  default = 1;

  @Input() add: Add;
  // @Input() toppings: Topping[];

  // @Output() selected = new EventEmitter<Pizza>();
  @Output() create = new EventEmitter<Add>();
  // @Output() update = new EventEmitter<Pizza>();
  // @Output() remove = new EventEmitter<Pizza>();

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  form = this.fb.group({
    name: ["", Validators.required],
    text: ["", Validators.required],
    link: ["", Validators.required],
    image: ["", Validators.required],
    place: ["", Validators.required]
  });

  constructor(private fb: FormBuilder) {
    this.form.controls["place"].setValue(this.default, { onlySelf: true });
  }

  get nameControl() {
    return this.form.get("name") as FormControl;
  }

  get textControl() {
    return this.form.get("text") as FormControl;
  }

  get linkControl() {
    return this.form.get("link") as FormControl;
  }

  get imageControl() {
    return this.form.get("image") as FormControl;
  }

  get placeControl() {
    return this.form.get("place") as FormControl;
  }

  openFileBrowser(event) {
    event.preventDefault();
    const inp: HTMLElement = document.getElementById(
      "imageBrowser"
    ) as HTMLElement;
    const input = <HTMLInputElement>document.getElementById("imageBrowser");
    input.addEventListener("change", () => {
      const name = input.value.split(/\\|\//).pop();
      const truncated = name.length > 20 ? name.substr(name.length - 20) : name;

      this.fileName = truncated;
    });
    inp.click();
  }

  imageChange(event) {
    const fileList: FileList = event.target.files;
    console.log(fileList[0]);
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

  createAdd(form: FormGroup) {
    this.submitted = true;
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }

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
