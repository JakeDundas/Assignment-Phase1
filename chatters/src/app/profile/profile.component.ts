import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ImageUploadService } from '../services/image-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  _id = ""
  username = ""
  email = ""
  role = ""
  profileImage = ""
  selectedFile: any;

  constructor(private router: Router, private imageUploadService: ImageUploadService, private dataService: DataService) {
    if (localStorage.getItem('isLoggedIn') != 'true') {
      this.router.navigate(['login'])
    }
   }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    const _id = localStorage.getItem('userId') ?? ""
    this.dataService.getUser({user_id: _id}).subscribe((res: any) => {
      if(res.error) {
        alert(res.error)
        return;
      }
      this._id = _id
      this.username = res.user.username
      this.email = res.user.email
      this.role = res.user.role
      this.profileImage = res.user.profileImage
    })
  }

  onFileSelected(event: any) {
    console.log(event)
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    const formData = new FormData()
    formData.append('image', this.selectedFile, this.selectedFile.name)
    this.imageUploadService.imageUpload(formData).subscribe((res: any) => {
      console.log(res.data.filename + ", " + res.data.size)
      this.dataService.updateUserProfileImage({user_id: this._id, imageName: res.data.filename}).subscribe((res: any) => {
        this.ngOnInit()
      })
    })
  }

}
