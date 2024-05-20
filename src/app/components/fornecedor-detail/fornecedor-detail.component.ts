import { Component } from '@angular/core';
import { FornecedorComponent } from '../fornecedor/fornecedor.component';
import { FornecedoresService } from '../../services/fornecedores.service';
import { Fornecedores } from '../../interfaces/fornecedores';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';


@Component({
  selector: 'app-fornecedor-detail',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './fornecedor-detail.component.html',
  styleUrl: './fornecedor-detail.component.css'
})
export class FornecedorDetailComponent {
  fornecedores?: Fornecedores;

  fornecedoresForm: FormGroup = new FormGroup({})

  constructor(private route: ActivatedRoute, private fornecedoresService: FornecedoresService, private formbuilder: FormBuilder, router: Router) {
    this.getFornecedorById()
    this.router = router;
  }

  id?: string;
  router: Router;
  getFornecedorById() {
    this.id = this.route.snapshot.paramMap.get('id') ?? ''
    this.fornecedoresService.getbyId(this.id).subscribe((fornecedoresResponse) => (this.fornecedores = fornecedoresResponse));
    this.fornecedoresForm = this.formbuilder.group({
      nome: [this.fornecedores?.nome],
      endereco: [this.fornecedores?.endereco],
      telefone: [this.fornecedores?.telefone],
      id: [this.fornecedores?.id]
    })

  }

  update(): void {

    if (this.fornecedoresForm.valid) {
      const fornecedorAlterado: Fornecedores = {
        nome: this.fornecedoresForm.value.nome,
        endereco: this.fornecedoresForm.value.endereco,
        telefone: this.fornecedoresForm.value.telefone,
        id: this.fornecedoresForm.value.id
      }
      this.fornecedoresService.atualizar(fornecedorAlterado).subscribe()
      alert('Alterado com sucesso!')

    }
  }
}
