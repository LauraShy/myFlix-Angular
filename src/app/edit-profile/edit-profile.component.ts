import { Component, OnInit, Input } from '@angular/core';
import { EditUserProfileService } from '../fetch-api-data.service';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: EditUserProfileService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
/*
  editUserProfile(): void {
    this.fetchApiData.editUserProfile(this.userData).subscribe((res) => {
      this.dialogRef.close();
      localStorage.setItem('username', res.Username)
      console.log(res)
      this.snackBar.open(this.userData.Username, 'Successfully updated user details!', {
        duration: 3000
      });
    }, (res) => {
      this.snackBar.open(res, 'OK', {
        duration: 3000
      });
      setTimeout(function () {
        window.location.reload();
      }, 3500);
    })
  }
*/
}
