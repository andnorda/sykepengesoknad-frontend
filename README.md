# Nytt i denne appen

* create-react-app
    * bootstrappet med [Create React App](https://github.com/facebook/create-react-app)
    * utvidet med [craco](https://github.com/gsoft-inc/craco) for typescript og less
* express-server er fjenet
    * decorator hentes som en react-komponent
        * personbrukers nye decorator når den er ferdig
    * mock kjøres fra frontend
        * se /mock
    * data hentes via `use-fetch`
        * `saga` er fjernet
        * se /rest
* state håndteres via hooks
    * `redux` er fjernet
    * lokal state med `use-state`
    * global state med `use-context`
    * se /stores
* syfotekster brukes ikke lenger
    * tekstfil lagres sammen med komponenten
    * importeres i komponenten
    * html escapes med [html-react-parser](https://github.com/remarkablemark/html-react-parser)
* less håndteres med webpack
    * lessfil lagres sammen med komponenten
    * importeres i komponenten
    * lokal less-bygging er fjernet
* `nav-frontend`[-komponenter](https://design.nav.no/components) brukes fremfor egne
    * IKKE bruk typografi-klasser på html-elementer
    * IKKE definer egen typografi
    * IKKE definer egne farger
* `digisyfo-npm` brukes ikke lenger

# Kjøre mot lokal backend
Applikasjonen kan kjøre mot en lokal syfosoknad backend.
Start lokal syfosoknad backend ved å kjøre main metoden i `no.nav.syfo.TestApplication.kt` i IntelliJ

* For å kjøre frontend koden: 
    - `$ npm run backend-proxy`
    - I et annet vindu `$ npm run start`
    - Åpne `http://localhost:8080` i en nettleser
