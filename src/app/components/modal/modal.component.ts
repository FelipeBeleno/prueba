import { Component, OnInit } from '@angular/core';
import { UsuarioDB } from 'src/app/models/Usuario';
import { CrudServiceService } from 'src/app/services/crud-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  userDelete: UsuarioDB = {
    email: '',
    id: '',
    idFirebase: '',
    identificacion: '',
    name: '',
    phone: '',
    rol: '',
  };
  closeModal = false;

  handleDelete() {
    this.crudService
      .deleteUser(this.userDelete.idFirebase.toString())
      .subscribe((r) => {
        console.log(r);

        this.crudService.getInfo();
        this.closeModal = true;
      });
  }
  constructor(private crudService: CrudServiceService) {}

  ngOnInit(): void {
    this.userDelete =
      JSON.parse(localStorage.getItem('userDelete') || '') || this.userDelete;
    console.log(this.userDelete);
  }
}
