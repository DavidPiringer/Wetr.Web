# Wetr.Web

## Voraussetzungen für erfolgreiche Inbetriebnahme
* npm
* Angular CLI
* Wetr.WebService läuft mit Port '54405', ansonsten unter /src/app/services/api/api-configuration.ts anpassen
* MySql Docker Container aktiv, damit Wetr.WebServer einwandfrei funktioniert

## Services
Die API Services wurden am Anfang mithilfe der swagger.json Datei generiert. Danach wurden die generierten Services per Hand angepasst. Die root-Url der API kann in der Datei api-configuration.ts angepasst werden. Neben den API-Services existiert noch ein Authenitication-Service (für die Authentifizierung) und Dashboard-Service (für das persistieren der Benutzerpräferenzen).

### API Services
#### Base
Stellt die Basis aller API Services. Enthält einige Hilfsmethoden wie z.B. `newParams(): HttpParams`.

#### Station Service
* `GetAll(): Observable<Array<Station>>`
Holt sich alle Stationen.

* `GetByUserName(userName: string): Observable<Array<Station>>`
Holt sich nur die Stationen für den mitgegeben Benutzernamen.

* `GetById(id: number): Observable<Station>`
Holt sich nur eine Station mit gegebener Id.

* `GetAllStationTypes(): Observable<Array<StationType>>`
Liefert alle Typen von Stationen.

* `GetAllCommunities(): Observable<Array<Community>>`
Liefert alle Gemeinden.

* `UpdateStation(s: Station): Observable<null>`
Aktualisiert eine Station.

* `InsertStation(s: Station): Observable<null>`
Fügt eine neue Station hinzu.

* `DeleteStation(s: Station): Observable<null>`
Löscht eine Station.

#### Measurement Service
* `ByFilter(filterSettings:FilterSettings):Observable<Array<Measurement>>`
Holt sich alle Messungen mit gegeben Filter. Der Filter beinhaltet ein Feld von Station, eine Zeitspanne (von/bis), ein Intervaltyp (Tag/Week/Month/Year) und ein Akkumulierungstyp (Min/Max/Avg). 

* `ByStations(stations:Array<Station>, from:Date, to:Date):Observable<Array<Measurement>>`
Eine einfache Abfrage für ein Feld von Messungen.

* `Insert(m: Measurement): Observable<null>`
Fügt eine Messung hinzu.

#### User Service

* `Login(username:string, password:string): Observable<boolean>`
Ruft die API-Route für den Login auf. Die Überprüfung erfolgt im Authentication-Service.

#### Search Service

* `BySearchValue(searchValue: string): Observable<Array<SearchResult>>`
Liefert aus einem String die dazugehörigen Suchresultate.

* `BySearchResults(searchResults: Array<SearchResult>): Observable<Array<Station>>`
Liefert aus einem Feld von Suchresultaten die dazugehörigen Stationen.

### Authentication Service

* `public login(username:string, password:string): Observable<boolean>`
Hier erfolgt die Überprüfung auf ein erfolgreiches Login. Wenn es erfolgreich war, wird im lokalen Speicher ein Item (`currentUser`) angelegt. Der Wert dieses Attributes ist aktuell der Benutzername, sollte aber mit einem JSON Web Token ausgetauscht werden.

* `public getCurrentUser(): string`
Liefert den Benutzername, welcher im lokalen Speicher gespeichert wird.

* `public isLoggedIn(): boolean`
Überprüft ob im lokalen Speicher ein Schlüssel mit 'currentUser' exisitiert und liefert den boolschen Wert der Überprüfung zurück.

* `public logout()`
Löscht das Item (key: 'currentUser') im lokalen Speicher.

### Dashboard Service
* `public getItems():DashboardItem[]`
Liefert alle, im lokeln Speicher, gespeicherten Dashboard-Items.

* `public saveItem(item:DashboardItem)`
Persistiert ein Dashboard-Item im lokalen Speicher.

* `public removeItem(item:DashboardItem)`
Löscht ein Dashboard-Item aus dem lokalen Speicher.

* `public updateItem(item:DashboardItem)`
Aktualisiert ein Item im lokalen Speicher.

<div style="page-break-after: always;"></div>

## Komponenten

### ChartComponent
Zuständig für die Anzeige als Diagramm. Enthält auch ein kleines Menü, um durch die verschiedenen Messtypen zu navigieren (Temperature, Pressure, ...).
![ChartComponent](doc/chart.png)

### DashboardComponent
Zeigt das Dashboard an. Holt sich die Dashboard-Items mithilfe des Services und generiert daraus DashboardItemComponents.
![DashboardComponent](./doc/dashboard.png)

### DashboardItemComponent
Ist eine einzelne Anzeige auf dem Dashboard. Hier können verschiedenste Abfragen durchgeführt und die Präferenzen gespeichert werden.
![DashboardItemComponent](doc/dashboarditem.png)

### DashboardItemSettingsComponent
Ist eine Teilkomponente eines Dashboard-Items. Hier kann die Konvertierung der Temperatur (Celsius, Fahrenheit, ...) eingestellt werden.
![DashboardItemSettingsComponent](doc/dashboarditemsettings.png)

### LoginComponent
Kümmert sich um die Eingabe der Login-Daten und um entsprechende Weiterleitung bei Erfolg.
![LoginComponent](doc/login.png)

### MeasurementFormComponent
Zuständig für die valide Eingabe von Messdaten. Damit können neue Messungen hinzugefügt werden.
![MeasurementFormComponent](doc/newmeasurement.png)

### MeasurementTableComponent
Ist wie ChartComponent eine Anzeigekomponente für ein Dashboard-Item.
![MeasurementTableComponent](doc/table.png)

### MenuComponent
Das Hauptmenü, welches immer (außer bei Login) angezeigt wird. Benötigt um zu Navigieren.
![MenuComponent](doc/menu.png)

### MyStationsListComponent
Liefert eine Liste mit den eigenen Stationen. Nur möglich wenn man eingeloggt ist, ansonsten wird man auf die Login-Seite navigiert.
![MyStationsListComponent](doc/mystations.png)

### MyStationsListItemComponent
Ein Item für die Liste der eigenen Stationen. Zeigt Informationen zu einer Station an. Außerdem gibt es die Möglichkeit Stationen zu löschen oder auf die Details/Editierungs-Seite zu navigieren.
![MyStationsListItemComponent](doc/mystationsitem.png)

### SearchComponent
Für die Suche von Stationen, Gemeinden, Bezirken oder Ländern (Provinzen) zuständig. Befindet sich am Anfang auf der Dashboard-Seite. Bei Eingabe wird ein Dropdown-Menü geöffnet mit Suchvorschlägen.
![SearchComponent](doc/search.png)

### SearchItemComponent
Stellt einen Suchvorschlag für die Suche dar.
![SearchItemComponent](./doc/searchitem.png)

### StationDetailsComponent
Zeigt die Details einer Station an. Wenn man eingeloggt und der Besitzer der jeweiligen Station ist, werden auch Lösch- und Editierfunktionen freigeschaltet.
![StationDetailsComponent](./doc/stationdetails.png)

### StationFormComponent
Für die Eingabe von Stationsdaten zuständig. Damit können bereits existierende Stationen editiert und neue hinzugefügt werden.
![StationFormComponent Edit](./doc/editstation.png)
![StationFormComponent New](./doc/newstation.png)

# Web

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
