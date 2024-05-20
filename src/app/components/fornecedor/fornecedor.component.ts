import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Fornecedores } from '../../interfaces/fornecedores';
import { FornecedoresService } from '../../services/fornecedores.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.css'
})
export class FornecedorComponent {
  fornecedores: Fornecedores[] = [];
  fornecedoresForm: FormGroup = new FormGroup({})

  constructor(private fornecedoresService: FornecedoresService, private formbuilder: FormBuilder) {
    this.fornecedoresForm = this.formbuilder.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required]
    })
  }
  generateRandomString(length: number): string {
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  inserir() {
    if (this.fornecedoresForm.valid) {
      const fornecedorNovo: Fornecedores = {
        nome: this.fornecedoresForm.value.nome,
        telefone: this.fornecedoresForm.value.telefone,
        endereco: this.fornecedoresForm.value.endereco,
        id: this.generateRandomString(6)
      }
      this.fornecedoresForm.reset()
      this.fornecedores.push(fornecedorNovo)
      this.fornecedoresService.adicionar(fornecedorNovo).subscribe()
      alert('Cliente cadastrado com sucesso!')

    }
  }

  listar(): void {
    this.fornecedoresService.listar().subscribe((listFornecedor) => (this.fornecedores = listFornecedor))
  }

  ngOnInit(): void {
    this.listar();
  }

  remover(id: string): void {
    this.fornecedores = this.fornecedores.filter((c) => c.id !== id)
    //cliente recebe a lista c itens que o id é difer. do id que refernciado

    this.fornecedoresService.remover(id).subscribe()

    //service observable, deve fazer subscribe
    alert('Fornecedor removido com sucesso!')
  }
}
