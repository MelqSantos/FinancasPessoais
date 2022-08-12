import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { NotificationService } from 'src/app/service/notification.service';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from 'src/model/Categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categoria: Categoria = new Categoria();
  listaCategorias: Categoria[];
  categoriaUtil: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private alerta: NotificationService, 
    private router: Router,
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ""){
      this.router.navigate(['/']);
    }

    this.getAll()
  }

  getAll(){
    this.categoriaService.getAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp

      // Ordena as categorias pelo Id
      this.listaCategorias.sort((a, b) => (a.id < b.id) ? -1 : 1)
    })
  }

  // Busca categoria pelo ID
  getByIdCategoria(idCategoria: string){
    this.categoriaService.getByIdCategoria(Number(idCategoria)).subscribe((resp: Categoria) => {
      this.categoriaUtil = resp
    })
  }

  cadastrar(){
    if(this.categoria.descricao == undefined){
      this.alerta.showWarning('Favor verificar os campos vazios!','Atenção')
    } 
    else{
      this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria) =>{
        this.categoria = resp;
  
        this.alerta.showSuccess('Categoria cadastrada!','sucesso')
        // Reseta o objeto categoria
        this.categoria = new Categoria();
        // Refresh na lista(Tabela) de categorias
        this.getAll()
      })
    }
  }

  editar(){
    this.categoriaService.putCategoria(this.categoriaUtil).subscribe((resp: Categoria) => {
      this.categoria = resp
      this.alerta.showInfo('Categoria atualizada!', 'Sucesso')
      
      // Zera e atualiza as variáveis
      this.categoriaUtil = new Categoria();
      this.getAll()
    },
    error => {
      if(error.status == 400){
        this.alerta.showWarning('É necessário excluir as transações com esta categoria antes de editar!', 'Atenção')
      }
    })
  }
  
  deletar(){
    this.categoriaService.deleteCategoria(this.categoriaUtil.id).subscribe(() => {
      this.alerta.showSuccess('Categoria deletada!', 'Sucesso')

      // Zera e atualiza as variáveis
      this.categoriaUtil = new Categoria();
      this.getAll()
    })
  }


}
