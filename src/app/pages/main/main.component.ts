import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class MainComponent implements OnInit {

  user!: User | null;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((resp) => {
      this.user = resp;
    })
  }
}
