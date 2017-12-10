import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProducerComponent } from './producer.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'producer', component: ProducerComponent }
    ])
  ],
  exports: [RouterModule]
})
export class ProducerRoutingModule { }
