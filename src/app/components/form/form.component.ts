import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
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
import { AdsService } from "src/app/services/ads.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  exists = false;
  submitted = false;
  newAdd: boolean;
  add: Add;

  fileName;
  places = [1, 2, 3, 4];
  default = 1;

  form = this.fb.group({
    title: ["", Validators.required],
    text: ["", Validators.required],
    url: ["", Validators.required],
    imageUrl: [null, Validators.required],
    place: ["", Validators.required]
  });

  constructor(private fb: FormBuilder, private adsService: AdsService) {
    this.form.controls["place"].setValue(this.default, { onlySelf: true });
  }

  ngOnInit(): void {
    this.adsService.currentAdd.subscribe(add => (this.newAdd = add));
  }

  get nameControl() {
    return this.form.get("title") as FormControl;
  }

  get textControl() {
    return this.form.get("text") as FormControl;
  }

  get linkControl() {
    return this.form.get("url") as FormControl;
  }

  get imageControl() {
    return this.form.get("imageUrl") as FormControl;
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
      const title = input.value.split(/\\|\//).pop();
      const truncated =
        title.length > 20 ? title.substr(title.length - 20) : title;

      this.fileName = truncated;
    });
    inp.click();
  }

  imageChange(event) {
    const fileList: FileList = event.target.files;
    console.log(fileList[0]);
  }

  createAdd(form: FormGroup) {
    this.submitted = true;
    const { value, valid } = form;
    this.add = value;

    if (valid) {
      this.adsService.newAdd(this.add).subscribe(
        data => {
          this.form.reset();
          this.form.controls["place"].setValue(this.default, {
            onlySelf: true
          });
          this.adsService.changeAdd(true);
          this.submitted = false;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
