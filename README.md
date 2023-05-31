# Salasanageneraattori

ICT-Campin ryhmätyöprojekti, jossa harjoitellaan ketterän kehityksen periaatteiden soveltamista.

Salasanageneraattori ainakin alkuun antaa valinnan mukaisen, 8-24 merkkiä pitkän, satunnaisista merkeistä koostuvan merkkijonon.

## Amplify-linkki Salasanageneraattoriin

https://main.d2w6et4gd387tl.amplifyapp.com/

## Dependencies

- Node.js backendissa
- MongoDB tietokantana

# Asennus

## AWS

- Tee AWS tunnukset (Free tierillä saa hyvin testailtua vuoden ajan)

### AWS Lambda (Toimii backendinä joka hakee sanat tietokannasta)

Valmistelu omalla koneellasi:

- Asenna [Node.js](https://nodejs.org/en)
- Jos käytät omaa tietokantaa, vaihda `src/aws/index.mjs`-tiedostoon toinen URL
- Avaa komentorivi `src/aws/` kansiossa
- Käytä `npm install` komentoa tarvittavien moduulien asentamiseen. Sen pitäisi tehdä ja asentaa `node_modules`-kansioon moduulit
- Tee `src/aws/`-kansion sisällöstä zip-tiedosto, jonka täytyy sisältää `node_modules`- kansio ja sen sisältö

  AWS-sivulla:

- Tee uusi AWS Lambda funktio
- Lataa tekemäsi zip-tiedosto tehtyyn Lambdaan

### API Gateway (Rajapinta backendiin yhdistämisessä)

- Tee uusi AWS API Gateway- rajapinta (REST- tai HTTP-API:n pitäisi toimia)
- Lisää siihen uusi `Resource` painamalla `Actions`-painiketta ja valitse `Create Resource`
- Anna Resourcelle nimi ja varmista, että `Enable API Gateway CORS`-checkbox on käytössä
- Lisää tähän Resourceen uusi `Method` samasta `Actions`-valikosta valitsemalla `Create Method`. Valitse Methodin tyypiksi `GET`, ja paina OK
- Valitse `Integration type`:ksi `Lambda Function` ja laita `Lambda Function`-kenttään tekemäsi Lambda funkion nimi. Jos aloitat kirjoittamaan nimeä, kentän pitäisi ehdottaa funktion nimeä. Jos et näe sitä, varmista, että `Lambda Region` on sama kuin minne teit funktion
- Paina `Actions`-valikosta `Deploy API`, jonka jälkeen saat rajapinnan linkin, jota voit käyttää selaimessa tai projekteissa

**HUOM! Aina kun teet muutoksia API Gatewayssa, muista painaa `Actions`-valikosta `Deploy API`. Muuten tekemäsi muutokset eivät tule toimintaan**

### AWS Amplify (Frontendin hostaus ja automaattinen buildaus)

- Tee uusi Amplify App
- Anna frontend sourceksi Github-projektin `src/frontend/`-kansio
- Sen jälkeen saat linkin, josta pääset sivulle
- Amplify lukee muutokset Github-reposta ja ottaa muutokset automaattisesti sivulle
- Jos haluat, että sivu käyttää omaa backendiäsi, niin vaihda `src/frontend/salasana_generaattori.js`:n `GetWords()` funktioon oma API:si

## Paikallisesti/Node.js (Tällä hetkellä rikki)

Ei toimi kunnolla tällä hetkellä, koska keskityimme enemmän AWS:sään

- Asenna [Node.js](https://nodejs.org/en)
- Käynnistä Node-serveri komennolla `node src/backend/app.js`
