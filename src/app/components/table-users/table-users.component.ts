import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorSubmit } from 'src/app/models/Error';
import { UsuarioDB } from 'src/app/models/Usuario';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CrudServiceService } from 'src/app/services/crud-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
})
export class TableUsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'identificacion',
    'rol',
    'actions',
  ];
  dataUsers: UsuarioDB[] = [];
  dataSource: any;
  edit = false;
  @Input() create = false;
  contrasena = '';
  user: UsuarioDB = {
    name: '',
    email: '',
    phone: '',
    identificacion: '',
    rol: '',
    id: '',
    idFirebase: '',
  };
  errorForm: ErrorSubmit = {
    message: '',
    status: false,
  };
  alert = false;
  usuarioLogged: string="";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editActive(elem: UsuarioDB) {
    this.user = elem;
    this.edit = !this.edit;
    this.create = false;
    // document.getElementById('conatiner-app1')?.scroll(10000,10000)
  }
  openDialog(elemet: UsuarioDB) {
    localStorage.setItem('userDelete', JSON.stringify(elemet));
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  sendEdit() {
    this.authService.updateUser(this.user).subscribe((resp: any) => {
      if (resp.id) {
        this.edit = false;
        this.alertSubmit();
        return;
      } else {
        this.errorForm = {
          message: 'Valide los campos',
          status: true,
        };
      }
    });
  }
  sendCreate() {
    this.authService
      .createUser(this.user, this.contrasena)
      .then((r) => {
        console.log(r);

        this.crudService.getInfo().subscribe((d) => {
          this.dataUsers = d;
          this.dataSource = new MatTableDataSource<UsuarioDB>(d);
          this.dataSource.paginator = this.paginator;
        });
        this.create = false;
      })
      .catch((e) => {
        console.log(e);
      });

    this.alertSubmit();
  }

  alertSubmit() {
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 2000);
  }

  constructor(
    private crudService: CrudServiceService,
    private authService: AuthServiceService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {}

  ngOnInit(): void {
    let rol: any = JSON.parse(localStorage.getItem('user') || '');
    this.usuarioLogged = rol.rol
    console.log(this.usuarioLogged)

    this.crudService.getInfo().subscribe((d) => {
      this.dataUsers = d;
      this.dataSource = new MatTableDataSource<UsuarioDB>(d);
      this.dataSource.paginator = this.paginator;
    });
  }
}
