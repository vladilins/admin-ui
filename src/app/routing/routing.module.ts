import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "../containers/admin/admin.component";
import { LoginComponent } from "../components/login/login.component";
import { AuthGuard } from "../guards/auth.guard";
import { NotFoundComponent } from "../components/not-found/not-found.component";

const routes: Routes = [
  { path: "admin", component: AdminComponent },
  { path: "", redirectTo: "admin", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
