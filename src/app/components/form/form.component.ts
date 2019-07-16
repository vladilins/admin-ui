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
import { AdsService } from "src/app/services/ads.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent {
  exists = false;
  submitted = false;

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
    // this.adsService.currentAds.subscribe(add => (this.add = add));
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
      const truncated = title.length > 20 ? title.substr(title.length - 20) : title;

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
    this.add = value

    if (valid) {
      this.adsService.addAdd(this.add).subscribe(
        data => {
          console.log("success");
          this.form.reset();
          this.submitted = false;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  // updateAdd(form: FormGroup) {
  //   const { value, valid, touched } = form;
  //   if (touched && valid) {
  //     this.update.emit({ ...this.add, ...value });
  //   }
  // }

  // removeAdd(form: FormGroup) {
  //   const { value } = form;
  //   this.remove.emit({ ...this.add, ...value });
  // }
}
