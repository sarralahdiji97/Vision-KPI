import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  standalone:false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MultiSelectComponent),
    }
  ]
})
export class MultiSelectComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() data: any[] | undefined;
  @Input() label!: string;
  @Input() bindValueKey!: string;
  @Input() bindLabelKey: string[] = [];
  @Input() search!: boolean;
  @Input() multiple!: boolean;
  @Input() required!: boolean;
  @Input() disable!: boolean;
  @Input() value: any;
  @Output() selectionChange = new EventEmitter<any>();

  public formControl!: FormControl;
  public filteredItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.formControl = new FormControl({ value: this.value, disabled: this.disable }, this.required ? Validators.required : null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disable'] && this.formControl) {
    if (this.disable) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
  }
    this.filteredItems = <any[]>this.data;
   // this.formControl?.setValue(this.value); 
  // Mettre à jour la valeur seulement si elle a changé
  if (changes['value'] && !changes['value'].firstChange && this.formControl.value !== this.value) {
    this.formControl.setValue(this.value);
  }
    //Note:Hafedh to verify
    // setTimeout(() => {
    //   console.log('label',this.label);
    //   console.log('settimeout',this.value);
    //   debugger
    //   this.formControl?.setValue(this.value);
    // }, 1);
  }

  //For white space in search Input
  handleInput(event: KeyboardEvent): void {
    event.stopPropagation();
  }

  writeValue(value: any): void {
    if (value) {
      this.formControl.patchValue(value, { emitEvent: false });
    } else {
      this.formControl.reset('');
    }
  }

  registerOnChange(fn: (value: string) => void) {
    this.formControl.valueChanges
      .subscribe(fn);
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  onTouched: () => void = () => { };

  onKey(event: any) {
    let filterValue = (<HTMLTextAreaElement>event.target).value.toLowerCase();
    this.filteredItems = this.searchItem(filterValue.toLowerCase());
  }


  generateLabel(item: any): string {
    let label = '';
    if (this.bindLabelKey.length > 0) {
      for (let index = 0; index < this.bindLabelKey.length; index++) {
        label = label + ' ' + item[this.bindLabelKey[index]];
      }
    } else label = item;
    return label
  }

  searchItem(SearchedWord: string): any[] {
    return this.data?.filter(item => {
      return this.generateLabel(item).toLocaleLowerCase().includes(SearchedWord);
    }) || [];
  }


}
