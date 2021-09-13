import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Vakit } from './models/vakit';
import { VakitService } from './services/vakit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  today = new Date();

  vakit: Vakit[] = [];
  iller: any[] = [];
  ilControl: FormControl = new FormControl();
  datepipe: any;


  constructor(private vakitService: VakitService, 
              private ngSelectConfig: NgSelectConfig,
              cd: ChangeDetectorRef) 
              {
    ngSelectConfig.addTagText = "Ekle";
    ngSelectConfig.notFoundText = "Veri Bulunamadı";

    this.vakitService.getIller().subscribe(res => this.iller = res.iller);

    this.setIl("istanbul");
    this.ilControl.valueChanges.subscribe(secilenIL => {
      console.log("Seçilen il:", secilenIL);
      this.setIl(secilenIL);
    })
    setInterval(function() { cd.detectChanges(); }, 1);
  }

  setIl(il: string) {
    this.vakitService.getVakit(il).subscribe(res => this.vakit = res.result);
  }

  
}
function dateTest(date: Date) {
  throw new Error('Function not implemented.');
}

