import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContactsComponent } from './contacts.component';
import { ButtonModule } from 'primeng/primeng';


@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [ContactsComponent],
  exports: [ContactsComponent],
})
export class ContactsModule { }
