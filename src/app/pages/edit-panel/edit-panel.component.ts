import { Component, OnInit } from '@angular/core';
import { editFormDTO } from './editFormDTO';
import { EditPanelService } from './edit-panel.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  styleUrls: ['./edit-panel.component.scss']
})


export class EditPanelComponent implements OnInit {

  Model = new editFormDTO()

  constructor(private service: EditPanelService, private toastr: ToastrService, private avtiveRoute: ActivatedRoute) { }

  ngOnInit() {
    this.Model.id = this.avtiveRoute.snapshot.params.id
    this.onGetData()
  }

  onGetData() { this.service.getData(this.Model.id).subscribe((res: any) => this.Model = res) }

  src
  changeImg(event) {
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      let ext = file.name.split('.')[1]
      let extType = file.type
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        let res = (reader.result as string).split(',')[1];
        this.src = 'data:' + extType + ';base64,' + res;
        this.Model.imageUrl = this.src
      }
    }
  }

  saveMethod() {
    this.service.putData(this.Model).subscribe(() => {
      this.toastr.success('موفق', 'عملیات با موفق انجام شد')
    })
  }

}
