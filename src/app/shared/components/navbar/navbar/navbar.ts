import { Component } from '@angular/core';
import { Profile } from '../../../models/client/profile';
import { AuthentificationSerivce } from '../../../services/authentification-service/authentification-serivce';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { version } from '../../../enums/general.enum';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
 public profile!: Profile;
  public profile$!: Observable<Profile>;
  public version: string = version;
  public defaultUserAvatar: string = "assets/img/icons/avatar.png";

  constructor(
    private authService: AuthentificationSerivce,
    private router: Router,
  ) {}

  ngOnInit(): void {
    //this.defaultUserAvatar = "url('assets/img/fakeUser2.jpg')";
    this.profile$ = this.getProfile();
    
    this.getProfileSync();
  }

  private getProfile(): Observable<Profile> {
    return this.authService.getProfile();
  }

  private getProfileSync() {
    this.authService.getProfile().subscribe((profile) => {
      this.profile = profile;
      
    });
  }

  public setImgUrl(defaultImg: boolean, img?: any): string {
    return `url("${(defaultImg ? this.defaultUserAvatar : img ? ('data:image/jpeg;base64,' + img) : this.defaultUserAvatar)}")`
  }

  public logOut() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }

}
