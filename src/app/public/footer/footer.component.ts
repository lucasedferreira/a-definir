import { Component, OnInit } from '@angular/core';
import { faCamera, faChevronUp, faMapMarkerAlt, faPhoneAlt, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faChevronUp = faChevronUp;
  faCamera = faCamera;
  faMapMarker = faMapMarkerAlt;
  faPhone = faPhoneAlt;
  faEnvelope = faEnvelope;
  faHeart = faHeart;

  constructor() { }

  ngOnInit(): void {
  }

}
