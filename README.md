# Formularios Reactivos

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.

---

## [Control Container, Reusable Reactive Form](https://www.youtube.com/watch?v=AWWq1DHsHfI)

En este tutorial veremos formas complejas de trabajar con formularios reactivos.

## Formulario Básico

A continuación se muestra la construcción de un `Reactive Form` usando el `ReactiveFormsModule`. Para eso 
nos apoyamos del `FormBuilder`:

````typescript
@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent {

  private _fb = inject(FormBuilder);

  public form: FormGroup = this._fb.group({
    doYouPayAttentionToClasses: [false],
    doYouSubmitYourAssignmentsOnTime: [false],
    missingClasses: [false],
    dataFather: this._fb.group({
      names: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }),
    dataMother: this._fb.group({
      names: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }),
  });

  public saveData(): void {
    console.log(this.form.value);
  }
}
````

El componente `html` simplificado sería de la siguiente manera:

````html
<form [formGroup]="form" (ngSubmit)="saveData()">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked1"
    formControlName="doYouPayAttentionToClasses">
  <label class="form-check-label" for="flexSwitchCheckChecked1">¿Presta atención a las clases?</label>
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked2"
    formControlName="doYouSubmitYourAssignmentsOnTime">
  <label class="form-check-label" for="flexSwitchCheckChecked2">¿Presenta sus tareas a tiempo?</label>
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked3"
    formControlName="missingClasses">
  <label class="form-check-label" for="flexSwitchCheckChecked3">¿Falta a clases?</label>
  <div class="form-check form-switch">
    <h6>Datos del padre</h6>
  </div>
  <div class="row father-data" formGroupName="dataFather">
    <label for="name-father" class="form-label">Nombres</label>
    <input type="text" class="form-control" id="name-father" formControlName="names">
    <label for="lastname-father" class="form-label">Apellidos</label>
    <input type="text" class="form-control" id="lastname-father" formControlName="lastName">
  </div>

  <h6>Datos de la madre</h6>

  <div class="row mother-data" formGroupName="dataMother">
    <label for="name-mother" class="form-label">Nombres</label>
    <input type="text" class="form-control" id="name-mother" formControlName="names">
    <label for="lastname-mother" class="form-label">Apellidos</label>
    <input type="text" class="form-control" id="lastname-mother" formControlName="lastName">
  </div>

  <button type="submit" class="btn btn-primary">Guardar</button>
</form>
````

Finalmente, tendremos la siguiente interfaz gráfica. Además probaremos su funcionamiento, cuando damos click en `Guardar` vemos que se están tomando todos los datos correctamente.

![1.basic-form](./src/assets/1.basic-form.png)

Ahora se nos presenta el siguiente caso:

### CASO

El bloque de los datos del padre y la madre se están repitiendo, además, vamos a usar ese bloque `nombres y apellidos` en más de un formulario. 

**¿Qué hacer?** reutilizar.  
**¿Cómo?** en componentes.

Bien, entonces se llega a la solución de que debemos crear un componente que albergue estos dos campos y luego poder reutilizar el componente en donde se requiera. **Todo bien hasta ese punto, pero ahora todo el formulario, incluyendo el bloque que se reutilizó, debe ser manejado por el formulario reactivo.**

> **¿Qué haces para que un componente o elemento nativo de html sea compatible con los Reactive Forms?**

Usar la interfaz `ControlValueAccessor`.

El `ControlValueAccessor` define una interfaz que actúa como puente entre la `API de formularios de Angular` y un `elemento nativo del DOM`. Implementa esta interfaz para crear una directiva de control de formularios personalizada que se integre con los formularios de Angular.

## Formulario Middle - Con ControlValueAccessor

Vamos a crear un componente llamado `PersonDataComponent` que tendrá los campos `names` y `lastName` que reutilizaremos en diversos formularios.

````typescript
@Component({
  selector: 'app-person-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './person-data.component.html',
  styles: [
  ]
})
export class PersonDataComponent {

  @Input({ required: true })
  public title: string = '';
  private _formBuilder = inject(NonNullableFormBuilder);

  public form: FormGroup = this._formBuilder.group({
    names: ['', [Validators.required]],
    lastName: ['', [Validators.required]]
  });

}
````
**DONDE**
- `NonNullableFormBuilder`, es similar a `FormBuilder`, pero los elementos FormControl construidos automáticamente tienen `{nonNullable: true}` y son no-nullables. Es decir, esto hará que los controles se restablezcan a su valor inicial, en lugar de null:

````html
<h6>{{ title }}</h6>
<div class="row father-data" [formGroup]="form">
  <div class="col-6">
    <div class="mb-3">
      <label for="name-father" class="form-label">Nombres</label>
      <input type="text" class="form-control" id="name-father" formControlName="names">
    </div>
  </div>
  <div class="col-6">
    <div class="mb-3">
      <label for="lastname-father" class="form-label">Apellidos</label>
      <input type="text" class="form-control" id="lastname-father" formControlName="lastName">
    </div>
  </div>
</div>
````

Ahora, debemos reutilizar este componente en nuestro formulario principal.

 `Nota:` En este punto, pasamos todo el formulario del `BasicPage` al `MiddlePage`, así que estaremos trabajando con este último formulario en esta sección.

El componente de `Typescript` sigue siendo el mismo que del formulario `BasicPage`. Mientras que el componente `html` sí cambió, ya que ahora estaremos usando el nuevo componente creado:

````html
<h5 class="card-title">Alumno: <small class="text-info">Martín Díaz</small></h5>
<form [formGroup]="form" (ngSubmit)="saveData()">
  <div class="section-check">
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked1"
        formControlName="doYouPayAttentionToClasses">
      <label class="form-check-label" for="flexSwitchCheckChecked1">¿Presta atención a las clases?</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked2"
        formControlName="doYouSubmitYourAssignmentsOnTime">
      <label class="form-check-label" for="flexSwitchCheckChecked2">¿Presenta sus tareas a tiempo?</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked3"
        formControlName="missingClasses">
      <label class="form-check-label" for="flexSwitchCheckChecked3">¿Falta a clases?</label>
    </div>
  </div>
  <hr>
  <div class="section-parents">
    <!-- Reutilizando componente -->
    <app-person-data title="Datos del padre"/>
    <hr>
    <!-- Reutilizando componente -->
    <app-person-data title="Datos de la madre"/>
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-primary">Guardar</button>
  </div>
</form>
````

Listo, veamos cómo queda el formulario con el nuevo componente agregado y además realicemos una prueba para ver su funcionamiento. Observamos que se sigue viendo como el formulario inicial. Ahora veamos llenemos algunos datos y veamos cómo se comporta cuando le damos en `Guardar`:

![2.middle-page](./src/assets/2.middle-page.png)

Observamos que los campos correspondientes al componente `<app-person-data/>` no están tomando los valores que le definimos manualmente en el formulario, mientras que los otros campos como los `<input type="check">` sí están tomando sus valores con total normalidad. **¿Qué está pasando?**

Pues, necesitamos que el nuevo componente `<app-person-data></app-person-data>` sea reconocido por el fomulario y para eso necesitamos que dicho componente implemente la interfaz `ControlValueAccessor`.

### Implementando la interfaz ControlValueAccessor

Esta interfaz nos va a permitir que el formulario donde coloquemos el componente `PersonDataComponent` sea reconocido como parte del formulario. Para eso, necesitamos implementar los métodos de dicha interfaz: 
`writeValue(), registerOnChange(), registerOnTouched(), setDisabledState?()`.

Ahora, en esta sección vamos a tipar el formulario reactivo del componente `PersonDataComponent`, de esa forma seremos más declarativos con nuestro formulario, es decir, construiremos nuestro formulario en base a un modelo.

Recordemos que en un apartado más arriba ya habíamos construido el formulario, pero sin tipar. A continuación mostramos el cambio que le haremos con su tipado correspondiente:

Creamos un archivo llamado `person-data.model.ts` que tendrá la interfaz de nuestro formulario reactivo:

```typescript
import { FormControl } from "@angular/forms";

export interface IPersonDataForm {
  names: FormControl<string>;
  lastName: FormControl<string>;
}

export interface IPersonData {
  names: string;
  lastName: string;
}
```

Ahora usamos la interfaz anterior para tipar nuestro formulario:

```typescript
@Component({
  selector: 'app-person-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './person-data.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersonDataComponent),
      multi: true,
    },
  ],
})
export class PersonDataComponent implements ControlValueAccessor {

  private _formBuilder = inject(NonNullableFormBuilder);

  /* other attributes */

  public form: FormGroup = this._formBuilder.group<IPersonDataForm>({
    names: this._formBuilder.control('', { validators: [Validators.required] }),
    lastName: this._formBuilder.control('', { validators: [Validators.required] }),
  });

  // ControlValueAccessor --------------------------------------------------------
  writeValue(obj: IPersonData): void {
    if (obj) {
      this.form.setValue(obj);
    }
  }

  registerOnChange(fn: Function): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: Function): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
```

### Emitir errores hacia el formulario padre

El formulario anterior ya podría ser reconocido por algún formulario donde sea colocado, pero ahora viene otra pregunta: **¿Cómo hacemos para que nuestro formulario reutilizable emita los errores a su componente padre?**, bueno para eso necesitamos implementar la interfaz `Validator`.

Básicamente, el funcionamiento de la interfaz `Validator` es, cuando en este componente ocurra algún error de validación del formulario los errores se van a propagar al formulario que esté conteniendo este componente.

Veamos su implementación:


```typescript
@Component({
  selector: 'app-person-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './person-data.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PersonDataComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PersonDataComponent),
      multi: true,
    }
  ],
})
export class PersonDataComponent implements ControlValueAccessor, Validator {

  private _formBuilder = inject(NonNullableFormBuilder);

  private _onChanged: Function = (_value: { names: string; lastName: string; }) => { };
  private _onTouch: Function = (_value: { names: string; lastName: string; }) => { };

  /* other properties */

  constructor() {
    this.form.valueChanges
      .subscribe(() => {
        const value = this.form.value;
        this._onChanged(value);
        this._onTouch(value);
      });
  }

  // ControlValueAccessor --------------------------------------------------------
  /* ControlValueAccessor methods */

  // Validator  ------------------------------------------------------------------
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.form.valid ? null : { personData: true };
  }

  registerOnValidatorChange?(fn: () => void): void {
    this._onChanged = fn;
  }

}
```

### Reutilizando componente PersonDataComponent en formulario reactivo

Una vez terminado de desarrollar nuestro componente reutilizable que tiene un formulario con dos campos, ahora lo vamos a reutilizar en el formulario `MiddlePageComponent`.


Nuestro formulario principal quedaría así:

```html
<form [formGroup]="form" (ngSubmit)="saveData()">
  <div class="section-check">
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked1"
        formControlName="doYouPayAttentionToClasses">
      <label class="form-check-label" for="flexSwitchCheckChecked1">¿Presta atención a las clases?</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked2"
        formControlName="doYouSubmitYourAssignmentsOnTime">
      <label class="form-check-label" for="flexSwitchCheckChecked2">¿Presenta sus tareas a tiempo?</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked3"
        formControlName="missingClasses">
      <label class="form-check-label" for="flexSwitchCheckChecked3">¿Falta a clases?</label>
    </div>
  </div>
  <hr>
  <div class="section-parents">
    <!-- Reutilizando componente <pp-person-data> -->
    <app-person-data title="Datos del padre" formControlName="dataFather"/>
    <hr>
    <!-- Reutilizando componente <pp-person-data> -->
    <app-person-data title="Datos de la madre" formControlName="dataMother"/>
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-primary">Guardar</button>
  </div>
</form>
```
Observar que el componente que hemos desarrollado está siendo tratado como un elemento de fomulario nativo html, por lo que usamos el `formControlName` para especificar a qué campo hace referencia. 

Antes de comenzar a construir el formulario reactivo en el archivo de typescript, es improtante crear las interfaces de modelo sobre el que nos basaremos para hacerlo tipado el formulario:

```typescript
// Otras interfaces
//
// Usado en el middle-page
export interface IStudentForm {
  doYouPayAttentionToClasses: FormControl<boolean>;
  doYouSubmitYourAssignmentsOnTime: FormControl<boolean>;
  missingClasses: FormControl<boolean>;
  dataFather: FormControl<IPersonData | null>;
  dataMother: FormControl<IPersonData | null>;
}
```

Finalmente, el último cambio se realizará en el formulario padre del `MiddlePageComponent`. El componente que agregamos en el formulario reactivo lo trataremos como un campo del tipo `formControl`, por eso es que usamos el `formControlName` en el html y en su componente de typescript con la ayuda del `formBuilder` lo definiremos como un `control (formControl)`:

````typescript
@Component({
  selector: 'app-middle-page',
  standalone: true,
  imports: [ReactiveFormsModule, PersonDataComponent],
  templateUrl: './middle-page.component.html',
  styles: [
  ]
})
export class MiddlePageComponent {
  private _fb = inject(NonNullableFormBuilder);

  public form: FormGroup = this._fb.group<IStudentForm>({
    doYouPayAttentionToClasses: this._fb.control(false),
    doYouSubmitYourAssignmentsOnTime: this._fb.control(false),
    missingClasses: this._fb.control(false),
    dataFather: this._fb.control(null, { validators: [Validators.required] }),
    dataMother: this._fb.control({ value: null, disabled: true }, { validators: [Validators.required] }),
  });

  public saveData(): void {
    console.log(this.form.value);
  }
}
````

Ejecutamos la aplicación y esta vez veremos que el formulario está reconociendo los campos del nuevo componente:

![3.middle-page](./src/assets/3.middle-page.png)

Como ahora el componente `PersonDataComponent` ya tiene implementado el `ControlValueAccessor` podemos tratar a ese componente como un elmento de formulario html nativo. En ese sentido, lo vamos a iniciar deshabilitado, para eso, necesitamos realizar lo siguiente:

````typescript
@Component({
  selector: 'app-middle-page',
  standalone: true,
  imports: [ReactiveFormsModule, PersonDataComponent],
  templateUrl: './middle-page.component.html',
  styles: [
  ]
})
export class MiddlePageComponent {
  /* other property */

  public form: FormGroup = this._fb.group<IStudentForm>({
    /*other propety*/
    dataMother: this._fb.control({ value: null, disabled: true }, { validators: [Validators.required] }),
  });

  /* other method */
}
````

Como observamos, estamos iniciando el campo `dataModher` deshabilitado, eso significa que ese objeto estaría llegando al método `setDisabledState()` del `ControlValueAccessor` y allí hacemos la comprobación y deshabilitación de los campos:

````typescript
// En el PersonDataComponent
//
setDisabledState(isDisabled: boolean): void {
  isDisabled ? this.form.disable() : this.form.enable();
}
````

![campos desactivados](./src/assets/4.middle-page.png)

---

# ControlContainer

---

`ControlContainer` es una clase base para directivas de formulario que contienen múltiples instancias registradas de NgControl. Podemos usar ControlContainer para acceder a FormControls, FormGroups y FormArrays y administrar un formulario principal dividido en componentes.

`ControlContainer` es como un asistente que te ayuda a trabajar con controles de fomularios en diferentes partes de tu aplicación Angular, especialmente cuando tienes formularios anidados.

![Control Container](./src/assets/5.control-container.png)

De la imagen anterior podemos decir: 

> Un `componente` en Angular puede tener muchos formularios reactivos, muchos `FormGroup`. Lo interesante es que **apenas se cree un FormGroup** inmediatamente Angular creará un `ControlContainer` para el componente. Ese `ControlContainer` lo que hará será albergar la instancia de cada formulario que hayamos creado en ese componente. Entonces, si nuestro componente tuviese 10 formularios, las 10 instancias de los formularios estarán dentro del `ControlContainer`. 
>
> El principio anterior se repetirá en cada uno de los componentes que implemente formularios reactivos, es decir, en cada componente que se cree formularios reactivos, de inmediato ese componetne tendrá su propio `ControlContainer.`

## Uso del ControlContainer en Formularios Anidados

Podemos hacer uso del `ControlContainer` cuando tenemos un componente que tiene un formulario reactivo y uno de los campos de dicho formulario (grupoB) lo agrupamos en otro componente y ahora lo que queremos lograr es que esta unión del formulario con el otro componente sea tratado como un formulario normal:

![componente control-container](./src/assets/6.componente-control-container.png)

Veamos a continuación cómo implementar el `ControlContainer`. Para eso, lo primero que haremos será crear nuestra interfaz de modelo para tener tipado nuestro fomulario:


````typescript
// Más interfaces
//
// Usado en advanced-one-page
export interface IStudentAdvancedOneForm {
  doYouPayAttentionToClasses: FormControl<boolean>;
  doYouSubmitYourAssignmentsOnTime: FormControl<boolean>;
  missingClasses: FormControl<boolean>;
}
````

### Componente Reutilizable

Este ejemplo lo trabajaremos en el directorio `advanced-one-page`, por lo que necesitamos crear un componente dentro de dicho directorio que será el componente que reutilizaremos para este ejemplo:

````bash
src/app/forms/pages/advanced-one-page/person-data/person-data.component.ts
src/app/forms/pages/advanced-one-page/person-data/person-data.component.html
````

Procedemos a implementar este nuevo componente creado:

````html
<h6>{{ title }}</h6>
<div class="row father-data" [formGroupName]="formGroupName">
  <div class="col-6">
    <div class="mb-3">
      <label for="name-father" class="form-label">Nombres</label>
      <input type="text" class="form-control" id="name-father" formControlName="names">
    </div>
  </div>
  <div class="col-6">
    <div class="mb-3">
      <label for="lastname-father" class="form-label">Apellidos</label>
      <input type="text" class="form-control" id="lastname-father" formControlName="lastName">
    </div>
  </div>
</div>
````
Nótese que en la etiqueta `div` estamos usando el atributo del formulario reactivo  `formGroupName` que nos permite agrupar campos del formulario, por lo que en los `<input>` observamos el uso de otro atributo del formulario reactivo el `formControlName`.

Ahora toca implementar el componete de typescript `PersonDataComponent`:

````typescript
@Component({
  selector: 'advanced-person-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './person-data.component.html',
  styles: [],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true})
  ]
})
export class PersonDataComponent implements OnInit {

  private _formBuilder = inject(NonNullableFormBuilder);
  private _parentContainer = inject(ControlContainer);

  @Input({ required: true })
  public title: string = '';

  @Input({ required: true })
  public formGroupName: string = '';

  public get parentFormGroup(): FormGroup {
    return this._parentContainer.control as FormGroup;
  }

  public get formGroupChild(): FormGroup<IPersonDataForm> {
    return this._formBuilder.group<IPersonDataForm>({
      names: this._formBuilder.control('', { validators: [Validators.required] }),
      lastName: this._formBuilder.control('', { validators: [Validators.required] }),
    });
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(this.formGroupName, this.formGroupChild);
  }

}
````
**DONDE**
- Recordemos la teoría, decíamos que cuando en un componente apenas se haga uso de un `FormGroup` inmediatamente Angular crearía un `ControlContainer` para ese componente. En nuestro caso, para nuestro componente `PersonDataComponent` Angular también le creará un `ControlContainer`, ya que estamos haciendo uso de un `FormGroup`. Ahora, con todo lo dicho, lo que necesitamos es poder acceder al `ControlContainer` del padre y no a nuestro propio `ControlContainer`. Entonces, para eso necesitamos agregar en el decorador `@Component` la configuración: 

````json
viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
]
````
Donde el `skipSelf`, buscará la referencia a la instancia de este control container, pero no en este componente, sino fuera de él, usará la referencia del control container más cercano, o sea su padre.

- `private _parentContainer = inject(ControlContainer)`, como configuramos en el decorador el poder acceder al `ControlContainer` padre, al hacer la inyección de dependencia, lo que finalmente será inyectado es el `ControlContainer` padre. Entonces, esta inyección nos va a permitir acceder al controlContainer del componente padre, pero es importante agregar en la configuración del `@Component()` la configuración del `viewProviders`, si no agregamos dicha configuración, usará el `ControlContainer` de este componente `PersonDataComponent` y nosotros no queremos eso, al contrario, queremos usar el `ControlContainer` del padre de este componente.

- `@Input({ required: true }) public formGroupName: string = '';`, propiedad que será pasado al momento de utilizar el componente. Esta propiedad será asignada al elmento del formulario reactivo en el html `formGroupName` para agrupara los demás campos del formulario.

- El get `parentFormGroup` retornará el formulario padre.
- `return this._parentContainer.control as FormGroup`, casteamos a FormGroup porque sabemos que hay un único formulario FormGroup padre. Si hubieran más formularios padres, tendríamos que usar el `this._parentContainer.control?.get(index)` buscar la posición, pero en este caso, solo tenemos uno por eso hacemos defrente el cast.

- `this.parentFormGroup.addControl(this.formGroupName, this.formGroupChild)`, al formulario padre o la instancia principal `this.parentFormGroup`, le agregamos un nuevo control cuyo nombre es `this.formGroupName` y el control a agregar es `this.formGroupChild`.

Finalmente, recordar que el siguiente trozo de código representa el formulario html de este componente:

````typescript
public get formGroupChild(): FormGroup<IPersonDataForm> {
  return this._formBuilder.group<IPersonDataForm>({
    names: this._formBuilder.control('', { validators: [Validators.required] }),
    lastName: this._formBuilder.control('', { validators: [Validators.required] }),
  });
}
````

### Componente Padre

Ahora nos toca implementar el componente principal o padre:

````html
<form [formGroup]="form" (ngSubmit)="saveData()">
<div class="section-check">
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked1"
      formControlName="doYouPayAttentionToClasses">
    <label class="form-check-label" for="flexSwitchCheckChecked1">¿Presta atención a las clases?</label>
  </div>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked2"
      formControlName="doYouSubmitYourAssignmentsOnTime">
    <label class="form-check-label" for="flexSwitchCheckChecked2">¿Presenta sus tareas a tiempo?</label>
  </div>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked3"
      formControlName="missingClasses">
    <label class="form-check-label" for="flexSwitchCheckChecked3">¿Falta a clases?</label>
  </div>
</div>
<hr>
<div class="section-parents">
  <advanced-person-data title="Datos del padre" formGroupName="dataFather" />
  <hr>
  <advanced-person-data title="Datos de la madre" formGroupName="dataMother" />
</div>
<div class="col-auto">
  <button type="submit" class="btn btn-primary">Guardar</button>
</div>
</form>
````
Nótese que en el `<div class="section-parents"></div>` estamos incluyendo el componente reutilizable `<advanced-person-data />` y además le pasamos las dos propiedades que espera recibir dicho componente.

Ahora, definimos la clase de typescript:

```typescript
@Component({
  selector: 'app-advanced-one-page',
  standalone: true,
  imports: [ReactiveFormsModule, PersonDataComponent],
  templateUrl: './advanced-one-page.component.html',
  styles: [
  ]
})
export class AdvancedOnePageComponent {
  private _fb = inject(NonNullableFormBuilder);

  public form: FormGroup = this._fb.group<IStudentAdvancedOneForm>({
    doYouPayAttentionToClasses: this._fb.control(false),
    doYouSubmitYourAssignmentsOnTime: this._fb.control(false),
    missingClasses: this._fb.control(false),
  });

  public saveData(): void {
    console.log(this.form.value);
  }
}
```
Del código anterior podemos observar que solamente estamos definiendo los tres campos que están en el formulario html, mientras que los otros dos grupos de campos: `dataFather` y `dataMother` no lo definimos ya que eso lo estamos haciendo dentro del mismo contenedor reutilizable. En otras palabras, dentro del contenedor reutilizable estamos obteniendo este formulario reactivo padre y allí mismo le estamos agregando el formulario que construimos en dicho componente hijo.

Listo, esto sería todo. Ahora realicemos unas pruebas y veamos su funcionamiento:

![control-container-advanced](./src/assets/7.control-container-advanced.png)

Vemos que el `ControlContainer` implementado está funcionando correctamente.

## Accediendo desde el formulario principal hacia el formulario hijo

Supongamos que queremos acceder desde el formulario principal a los campos del formulario hijo, del formulario que colocamos en otro componente **¿cómo podríamos hacerlo?**

Para poder acceder a los campos del hijo, sencillamente desde el formulario padre podemos utilizar `controls[]` o `get()` y colocar dentro el nombre del grupo de campos `(formGroupName)` al que queremos acceder.

````typescript
@Component({
  selector: 'app-advanced-one-page',
  standalone: true,
  imports: [ReactiveFormsModule, PersonDataComponent],
  templateUrl: './advanced-one-page.component.html',
  styles: [
  ]
})
export class AdvancedOnePageComponent {
  private _fb = inject(NonNullableFormBuilder);

  public form: FormGroup = this._fb.group<IStudentAdvancedOneForm>({
    doYouPayAttentionToClasses: this._fb.control(false),
    doYouSubmitYourAssignmentsOnTime: this._fb.control(false),
    missingClasses: this._fb.control(false),
  });

  public saveData(): void {
    console.log(this.form.value);
    console.log(this.form.controls['dataFather'].value); //<-- accediendo a los campos del formulario hijo
    console.log(this.form.get('dataFather')?.value); //<-- otra forma de acceder a los campos del formulario hijo
  }
}
````
Resultado obtenido en la consola del navegador:
````js
{
  doYouPayAttentionToClasses: true, doYouSubmitYourAssignmentsOnTime: true, missingClasses: true, 
  dataFather: {lastName: "Díaz Flores", names: "Martín Gaspar"}, 
  dataMother: {lastName: "Saldaña", names: "Fernanda"}
}

{names: 'Martín Gaspar', lastName: 'Díaz Flores'}
{names: 'Martín Gaspar', lastName: 'Díaz Flores'}
````

## Manteniendo el tipado del formulario hijo

En el código estamos accediendo a los campos de los formularios hijos de varias formas, como por ejemplo: `this.form.controls['dataFather'].value`. Ahora, qué pasa si quisiéramos mantener el tipado, lo que podríamos hacer es:

````typescript
const data = this.form.controls['dataFather'].value as IPersonData;
````

Pero, podríamos hacerlo de otra forma, apoyándonos de las bondades de typescript. Para eso crearemos un archivo de utilitario y definiremos una función de conversión:

````typescript
import { FormGroup } from "@angular/forms";

export const getFormControlValueAsType = <T>(formGroup: FormGroup, controlName: string): T | null => {
  const control = formGroup.get(controlName);
  return control ? control.value as T : null;
}
````
Ahora sí, podemos usar la función genérica y este nos retornará el valor tipado:

````typescript
@Component({...})
export class AdvancedOnePageComponent {
  // Other code

  public saveData(): void {
    const data = getFormControlValueAsType<IPersonData>(this.form, 'dataFather');
    console.log(data);
  }
}
 ````
 Como resultado debemos obtener el json de abajo, pero lo interesante de aquí es que la constante data está tipada, es decir si le damos `.` nos mostrará `names` y  `lastName`:
 
 ````js
 {names: 'Martín Gaspar', lastName: 'Díaz Flores'}
 ````

## Uso del Control Container 2

En este apartado volveremos a usar el `ControlContainer` pero esta vez de manera distinta a lo que hicimos en el apartado anterior.

Lo primero que haremos será crear nuestro modelo para tipar nuestro formulario. Observemos que el modelo que vamos a crear tiene todos los campos del formulario tipado:

````typescript
// Usado en advanced-two-page
export interface IStudentAdvancedTwoForm {
  doYouPayAttentionToClasses: FormControl<boolean>;
  doYouSubmitYourAssignmentsOnTime: FormControl<boolean>;
  missingClasses: FormControl<boolean>;
  dataFather: FormGroup<IPersonDataForm>;
  dataMother: FormGroup<IPersonDataForm>;
}
````

### Componente Hijo

Ahora crearemos nuestro componente reutilizable y lo implementaremos. Empezamos con el `advanced-two-person-data.component.html`:

````html
<h6>{{ title }}</h6>
<div class="row father-data" [formGroup]="formGroup">
  <div class="col-6">
    <div class="mb-3">
      <label for="name-father" class="form-label">Nombres</label>
      <input type="text" class="form-control" id="name-father" formControlName="names">
    </div>
  </div>
  <div class="col-6">
    <div class="mb-3">
      <label for="lastname-father" class="form-label">Apellidos</label>
      <input type="text" class="form-control" id="lastname-father" formControlName="lastName">
    </div>
  </div>
</div>
````
**¡Importante!** Observar que lo que engloba a todos los elementos del html es el `[formGroup]`, aquí lo estamos definiendo como si fuera un formulario.

Ahora crearemos el componente de typescript `advanced-two-person-data.component.ts`:

````typescript
@Component({
  selector: 'advanced-two-person-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './advanced-two-person-data.component.html',
  styles: [
  ]
})
export class AdvancedTwoPersonDataComponent implements OnInit {

  @Input({ required: true })
  public title: string = '';

  @Input({ required: true })
  public controlKey: string = '';

  public formGroup!: FormGroup;

  public get parentFormGroup() {
    return this._parentContainer.control?.get(this.controlKey) as FormGroup;
  }

  private _parentContainer = inject(ControlContainer);

  ngOnInit(): void {
    this.formGroup = this.parentFormGroup;
  }

}
````

**NOTA**

- Observar que ahora `no estamos usando en la anotación @Component el viewProviders`.
- Para que esto funcione necesariamente tenemos que usar en el componente hijo el `FormGroup`, es decir, necesitamos envovler todo su elemento html en un `FormGroup`.
- Pero si usamos en el componente hijo las directivas: `formGroupName, formArrayName o formControlName` esta nueva solución no nos sirve, en ese caso nos sirviría la solución de la página `advanced-one-page`, es decir la solución donde agregábamos en la anotación `@Component el atributo viewProviders`.

### Componente Principal

A continuación se muestra el componente html del `advanced-two-page.component.html`:

````html
<form [formGroup]="form" (ngSubmit)="saveData()">
  <div class="section-check">
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked1"
        formControlName="doYouPayAttentionToClasses">
      <label class="form-check-label" for="flexSwitchCheckChecked1">¿Presta atención a las clases?</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked2"
        formControlName="doYouSubmitYourAssignmentsOnTime">
      <label class="form-check-label" for="flexSwitchCheckChecked2">¿Presenta sus tareas a tiempo?</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked3"
        formControlName="missingClasses">
      <label class="form-check-label" for="flexSwitchCheckChecked3">¿Falta a clases?</label>
    </div>
  </div>
  <hr>
  <div class="section-parents">
    <advanced-two-person-data title="Datos del padre" controlKey="dataFather" />
    <hr>
    <advanced-two-person-data title="Datos de la madre" controlKey="dataMother" />
  </div>
  <div class="col-auto">
    <button type="submit" [disabled]="form.invalid" class="btn btn-primary">Guardar</button>
  </div>
</form>
````

Finalmente se muestra el componente de typescript `advanced-two-page.component.ts`:

````typescript
@Component({
  selector: 'app-advanced-two-page',
  standalone: true,
  imports: [ReactiveFormsModule, AdvancedTwoPersonDataComponent],
  templateUrl: './advanced-two-page.component.html',
  styles: [
  ]
})
export class AdvancedTwoPageComponent {
  private _fb = inject(NonNullableFormBuilder);

  public form: FormGroup = this._fb.group<IStudentAdvancedTwoForm>({
    doYouPayAttentionToClasses: this._fb.control(false),
    doYouSubmitYourAssignmentsOnTime: this._fb.control(false),
    missingClasses: this._fb.control(false),
    dataFather: this._fb.group({
      names: this._fb.control('', { validators: [Validators.required] }),
      lastName: this._fb.control('', { validators: [Validators.required] }),
    }),
    dataMother: this._fb.group({
      names: this._fb.control('', { validators: [Validators.required] }),
      lastName: this._fb.control('', { validators: [Validators.required] }),
    }),
  });

  public saveData(): void {
    console.log(this.form.value);
  }
}
````

Ahora comprobamos el formulario con el nuevo uso del `ControlContainer`:

![control container advanced 2](./src/assets/8.control-container-advance-2.png)
