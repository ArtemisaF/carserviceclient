import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  owners: Array<any>;

  constructor(private ownerService: OwnerService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {

      this.owners = data._embedded.owners.map(owner => {
        return {
          ...owner,
          dni: owner._links.self.href.split('/')[owner._links.self.href.split('/').length - 1]
        }
      });

      this.owners = this.owners.filter(owner => owner.name !== null);

      for (const owner of this.owners) {
        this.giphyService.get(owner.name).subscribe(url => owner.giphyUrl = url);
      }
    });
  }
}