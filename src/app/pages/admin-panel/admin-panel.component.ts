import { ToastrService } from 'ngx-toastr';
import { AdminPanelService } from './admin-panel.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})


export class AdminPanelComponent implements OnInit {
  showModal = false
  constructor(private modalService: NgxSmartModalService, private router: Router, private service: AdminPanelService, private toast: ToastrService) { }

  ngOnInit() {
  }

  item1
  item2
  item3
  clickFilter(item, i) {
    switch (i) {
      case 1:
        this.item1 = item
        break
      case 2:
        this.item2 = item
      case 3:
        this.item3 = item
    }
  }

  selectedItem
  isShare = false
  openModal(item, type) {
    this.showModal = true
    this.modalService.getModal('newsModal').open()
    this.selectedItem = item

    type == 'share' ? this.isShare = true : this.isShare = false
  }

  navigate() {
    this.router.navigate(['/editpanel', 5 /* this.selectedItem.id */])
  }

  shareMethod(sharetype) {
    const obj = { media: sharetype, id: this.selectedItem.id }

    this.service.onPostShare(obj).subscribe(() => {
      this.modalService.getModal('newsModal').close()
      return this.toast.success('موفق', 'عملیات با موفقیت انجام شد')
    })
  }

  dropDownList = [
    { btnLable: 'مرتب سازی', item1: 'aa', item2: 'b', item3: 'c', item4: '' },
    { btnLable: 'نوع خبر', item1: 'a', item2: 'b', item3: 'c', item4: '' },
    { btnLable: 'سایت منبع', item1: 'a', item2: 'b', item3: 'c', item4: '' },
    { btnLable: 'وضعیت انتشار', item1: 'a', item2: 'b', item3: 'c', item4: '' }
  ]

  cardArray = [
    {
      title: 'Shiba Inu', sub: 'Dog Breed', desc: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
    A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
    bred for hunting.`, image: './../../assets/img/shiba2.jpg', date: '1399/09/09'
    },
    {
      title: 'Shiba Inu', sub: 'Dog Breed', desc: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
    A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
    bred for hunting.`, image: './../../assets/img/shiba2.jpg', date: '1399/09/09'
    },
    {
      title: 'Shiba Inu', sub: 'Dog Breed', desc: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
    A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
    bred for hunting.`, image: './../../assets/img/shiba2.jpg', date: '1399/09/09'
    },
    {
      title: 'Shiba Inu', sub: 'Dog Breed', desc: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
    A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
    bred for hunting.`, image: './../../assets/img/shiba2.jpg', date: '1399/09/09'
    },
    {
      title: 'Shiba Inu', sub: 'Dog Breed', desc: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
    A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
    bred for hunting.`, image: './../../assets/img/shiba2.jpg', date: '1399/09/09'
    },
    {
      title: 'Shiba Inu', sub: 'Dog Breed', desc: `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
    A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
    bred for hunting.`, image: './../../assets/img/shiba2.jpg', date: '1399/09/09'
    },
  ]
}
