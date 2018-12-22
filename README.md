# Chat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Tutorial - Spanish

Este es el ejemplo / proyecto a realizar por los alumnos del curso de Angular de Fictizia. Se irán añadiendo instrucciones aquí paso a paso

  ### Generar el proyecto. 
  
  Podemos generar el proyecto utilizando el comando 
  ```
  ng new chat
  ````
  Esto generará una carpeta chat en la que se crearán los archivos necesarios para comenzar un proyecto angular. Podemos lanzar la aplicación utilizando el comando siguiente y accediendo al puerto localhost:4200
  ````
  ng serve
  ````

  ### Generar un componente avatar. 
  En este componente, visualizaremos la información de los contactos que vayamos utilizando. Podemos generar nuevos componentes utilizando el siguiente comando.
  ```
  ng generate component avatar
  ````

  Por defecto, nos generará un componente con el selector app-avatar. Si añadimos el html siguiente, visualizaremos en nuestra aplicación el mensaje app avatar works!
  ````
  <app-avatar></app-avatar>
  `````
  Una vez tenemos el componente creado, podemos añadirle propiedades mediante Inputs. Consulta las slides si tienes dudas, pero acabaremos con algo asi en nuestro avatar.component.ts
  ````
  class AvatarComponent {
    @Input() imgSrc: string;
  }
  ````
 algo así en nuestro avatar.component.html
 ```
  <img [src]="imgSrc">
  ```
 y así en nuestro app.component.html
 ```
  <app-avatar imgSrc="<una url que os guste.jpg"></app-avatar>
 ```

Con esto, habremos creado nuestro primer componente con propiedades de entrada (Inputs)

  ### Generar un componente de introducción de texto.
  
  Ahora que ya sabemos crear un componente, y utilizar Inputs para pasarles propiedades, podemos crear un componente para enviar mensajes en nuestro chat. Este componente, va a utilizar NgModel para recoger la información que introduzcamos en un input. NgModel vincula el valor de un input con una propiedad. Para utilizarlo debemos seguir 3 pasos.
  
  Primero, vamos al app.module.ts para añadir el módulo de formularios de Angular. Angular no importa todos los módulos por defecto para dejarnos escoger que queremos y que no queremos usar. En este caso, vamos a añadir el modulo FormsModule al app.module.ts, añadiendo el import, e incluyendolo dentro del array de imports

```
import { FormsModule } from '@angular/forms';

@NgModule({
  ...
  imports: [
    BrowserModule,
    FormsModule
  ],
  ...
})
export class AppModule { }
```

Ahora ya podemos utilizar NgModel en nuestro componente. Vamos a empezar generando el componente
  
  ```
  ng g c text
  ```

Podemos incluirlo en el html del app.component.html utilizando el selector
```
<app-text></app-text>
```

Ahora vamos a crear una variable "message" en nuestro text.component.ts para almacenar el valor introducido en el input por el usuario

```
export class TextComponent implements OnInit {
  message: string = '';
  
  constructor() {}
  ngOnInit() {}
}
```
Y vamos a añadir un input en nuestro text.component.html para que el usuario pueda introducir el mensaje que desea
```
<input [(ngModel)]="message" type="text" placeholder="Message">
{{ message }}
```
Si introducimos un valor en el input, veremos que automaticamente se muestra debajo, gracias al NgModel, hemos creado una relación entre el input y la variable que hemos creado previamente. Cada vez que modifiquemos esta variable se verá reflejado en la vista.

Vamos a añadir un botón para confirmar el mensaje

```
<input [(ngModel)]="message" type="text" placeholder="Message">
<button (click)="sendInfo()"> Enviar </button>
```

Mediante la notación (click), podemos escuchar el evento click en el botón y llamar a una función sendInfo que hayamos definido en nuestro componente. Vamos a mostrar el mensaje por un alert

```
export class TextComponent implements OnInit {
  message: string = '';
  
  constructor () {}
  ngOnInit () {}
  
  sendInfo () {
    alert(this.message);
  }
}
```

  ### Comunicando entre componentes
  
  Hemos creado un componente de introducción de texto, que nos servirá para introducir un nombre de usuario, un mensaje, o un comentario, dependiendo del contexto en el que lo utilizemos. Nuestro objetivo ahora es mostrar ese mensaje en el componente padre app.component.html. Para ello tendremos que usar los Output (Más info en las slides). Los outputs nos ayudan a definir "eventos propios del componente" que podremos escuchar como escuchamos los click, change y demás.
  
 ```
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @Output() written = new EventEmitter();
  message: string = '';
  
  constructor() { }

  ngOnInit() {
  }

  sendInfo() {
    this.written.emit(this.message);
  }
  
  ```
Como podéis ver, hemos definido el Output "written", y hemos modificado la función sendInfo para que, en vez de mostrar un mensaje alert por pantalla, emita la información a través de ese Output. De esta forma, podemos escuchar ese mensaje desde *app.component* con la notación de parentesis

````
  <app-text (written)="receiveMessage($event)"></app-text>
````

Ahora, podemos definir esa función receiveMessage en nuestro app.component.ts para que guarde el valor del mensaje enviado en una variable. Como véis, hemos utilizado una variable especial $event en la llamada a la función, esto debe ir siempre que queramos recoger la información que nos envía el evento. En el caso de nuestro evento, recibiremos lo que hemos enviado en el emit de el Output

````

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat';
  parentMessage: string;

  receiveMessage(message) {
    this.parentMessage = message;
  }
````
y mostrarlo en nuestro html
````
<h3>Mensaje desde el hijo:</h3>
<p>{{ parentMessage }}</p>
<app-text (written)="receiveMessage($event)"></app-text>
````

Ahora que tenemos nuestro componente que envia mensajes,y hemos llevado la información al componente app.component, podemos crear nuestro nuevo componente para visualizar una lista de mensajes. Lo primero que vamos a hacer es cambiar como almacena app.component los mensajes. Hasta ahora, simplemente se mostraba el último mensaje enviado. Para ello, vamos a añadir cada mensaje a un array de mensajes en el componente app.

````
export class AppComponent {
  title = 'chat';
  // Cambiamos el tipo de string a array, y lo inicializamos para poder pushear mensajes
  parentMessage: string[] = [];

  receiveMessage(message) {
    // Cambiamos el envio de mensajes para añadirlos al array
    this.parentMessage.push(message);
  }
  ...
 }
````

Ahora que estamos guardando los mensajes en formato array, vamos a crear un nuevo componente BOARD que muestre esos mensajes.

````
ng g c board
````

Para que el componente board, pueda recibir la información desde el componente app, debemos añadir una propiedad Input. Las propiedades inputs nos sirven para transmitir información a componentes hijos. Son aquellas propiedades que hacen nuestro componente reutilizable. Pensad en el atributo src de un componente img, o el atributo required de un input. En nuestro caso, board recibirá una lista de mensajes

````

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class AppComponent {
  @Input() messages;
}

````

Y en el html, vamos a utilizar una de las directivas que nos proporciona angular, ngFor, para pintar una lista de elementos desde un array, en este caso, la lista de mensajes. Para utilizarlo, debemos añadir * ngFor, seguido por let message of messages, donde message es la variable que declaramos por cada elemento del array, y messages el nombre de nuestra propiedad

````
<p *ngFor="let message of messages"> {{ message }} </p>
````

Una vez tenemos creado el componente, podemos utilizarlo modificando el html de nuestro App.component, utilizando la propiedad input que hemos creado

````
<app-board [messages]="messages"></app-board>
<app-text (written)="receiveMessage($event)"></app-text>
````

### Level up: Utilizando servicios

La parte más complicada de angular, y en general de los frameworks orientados a componentes, es precisamente la comunicación entre componentes. Hemos visto ya el sistema de Input - Output, pero cuando tenemos una estructura más compleja, o necesitamos reutilizar lógica, los componentes se nos quedan algo cortos. Es por eso que angular aporta los servicios. Estos son elementos no visuales, que nos permiten crear funciones, métodos y almacenar información, que será compartida entre todos los componentes que utilizen este servicio, ya que los servicios siguen un modelo Singleton, es decir, una única instancia compartida por los componentes que los utilizan.

Vamos a crear un servicio para obtener contactos para nuestro chat, utilizando una api gratuita llamada randomuser.me

Vamos a comenzar generandolo de forma muy similar a los componentes

````
ng g service users
````

Al hacerlo, habrá aparecido en nuestra carpeta un nuevo archivo users.service.ts (con el test incluido) directamente en la carpeta src, que tendrá esta pinta.

````
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  
}

````

Para los servicios, utilizaremos el decorador Injectablem, con un parámetro por defecto, que indica en que modulo se va a utilizar (root). Vamos a añadir un nuevo método para recuperar una lista de usuarios, de momento hardcodeados

````
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = [
    { name: { first: 'Jon', last: 'Rojí' }, image: 'url'},
    { name: { first: 'María', last: 'Fernandez' }, image: 'url'},
    { name: { first: 'Jon', last: 'Rojí' }, image: 'url'},
  ];
  constructor() { }
  
  getUsers() { return this.users; }
}
````

Con esto tenemos un servicio del que podremos recuperar los usuarios, estemos en el componente que estemos utilizando el servicio. Para utilizarlo en uno de nuestros componentes, solo tenemos que añadir el servicio que queremos utilizar en el constructor. Vamos a nuestro app.component.ts

````
export class AppComponent {
  title = 'chat';
  parentMessages: string[] = [];
  // Añadimos una nueva propiedad users para guardar en app component los usuarios y pintarlos
  users: object[] = [];
  
  // Añadimos el nuevo servicio en el constructor
  constructor(private usersService: UsersService) {}
  
  // ngOnInit es una función de angualr que se ejecuta justo después de que el componente se haya renderizado
  ngOnInit() {
    // utilizamos el servicio con this y el nombre que le hemos dado en el constructor
    this.users = this.usersService.getUsers();
  }

  receiveMessage(message) {
    this.parentMessages.push(message);
  }

 }
`````

y en nuestro html, vamos a pintar la lista de usuarios, utilizando nuestro componente avatar, y un ngfor para pintar todos los que tenemos. Podéis cambiar las urls de la lista de usuarios en el usersservice para visualizar imágenes correctas.

````
<div *ngFor="let user of users">
  <app-avatar [imgSrc]="user.image">
  <h2> {{ user.name.first }} {{ user.name.last }}
</div>

<app-board [messages]="parentMessages"></app-board>
<app-text (written)="receiveMessage($event)"></app-text>
````
