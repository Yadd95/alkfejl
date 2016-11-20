# MovieReviewer
Egy egyszerű (imdb-szerű) filmelemző oldal, ahol filmekről lehet bemutatókat, értékeléseket írni, ajánlási és pontozási rendszerrel.

## Funkcionális elvárások

### Adminisztrátoroknak
#### Adminisztráció
- Új filmek felvétele az értékelhető filmek közé
- Főoldali bejegyzések kiírása

#### Moderálás
- Filmelemzések szövegének módosítása
- Filmelemzések törlése
- (Mindenhol) Hozzászólások törlése
- (Mindenhol) Hozzászólások módosítása

### Felhasználóknak
#### Profilkezelés
- Profiladatok szerkesztése (email, jelszó, bemutatkozás)
- Profilértékelések megtekintése (mennyien tekintették hasznosnak a bemutatóit, melyik a legelismertebb bemutatója)

#### Filmelemzések
* Új elemzése hozzáadása:
  - Film kiválasztása
  - Értékelés megadása: 
    * Összpontszám (Átlagolja a többiből)
    * Külön pontokra szedve 
      * Történet
      * Zene/Hang
      * Színészi játék
      * Vizualitás
      * Szinkron
  - Ismertető szöveg írása
    * Beilleszthetőek képek illusztrációképpen
* Előző elemzések módosítása
* Előző elemzések törlése

#### Hozzászólások
- Hozzászólások írása más felhasználók elemzéseihez
- Más felhasználók hozzászólásainak '+1'-ezése (Egyetért) vagy '-1'-ezése (Nem ért egyet)
- Saját filmismertetőkhöz írt hozzászólások moderelása

### Vendégeknek
- Regisztráció, bejelentkezés
- Filmismertetők hasznosnak jelölése
- Keresés a filmek között cím, rendező, év, studió, műfaj szerint
- Pontozások alapján a filmek listázása

## Nem funkcionális követelmények
- Felhasználóbarát, ergonomikus elrendezés és kinézet.
- Gyors működés.
- Jelszavak tárolása, funkciókhoz való hozzáférés, biztonságos működés.
- Filmértékelések tárolásához elegendő háttértár

## SZAKTERÜLETI FOGALOMJEGYZÉK

Filmismertető: Egy hosszabb terjedelmű szöveges véleménykifejzés egy filmről. Pontokra szedve vagy folyamatosan egyben, ez a felhasználótól függ.

Értékelés: Egy egész szám 1-től 5-ig, amivel a film adott jellemzőjét(a fentebb felsoroltakra bontva) osztályozza a felhasználó


## Tervezés
### Felépítés

**Oldaltérkép:**

+ **Publikus:**
  + Kezdőlap
  + Bejelentkezés
  + Regisztráció
  + Filmek listázása
    + Film megtekintése 
      + Bemutatók listázása
        + Bemutató megtekintése
        
+ **Bejelentkezett Felhasználónak:**
  + Kezdőlap
  + Filmek listázása
    + Film megtekintése
      + Bemutatók listázása
        + Bemutató megtekintése
      + Bemutató hozzáadása
  + Saját bemutatók listázása   
    + Bemutató hozzáadása
    + Bemutató megtekintése
    + Bemutató törlése
    + Bemutató szerkesztése
  + Kijelentkezés

+ **Bejelentkezett Adminisztrátoroknak:**
  + Kezdőlap
  + Filmek listázása
    + Új film hozzáadása
    + Film szerkesztése
    + Film törlése
    + Film megtekintése
      + Bemutatók listázása
        + Bemutató szerkesztése
        + Bemutató törlése
        + Bemutató megtekintése
      + Bemutató hozzáadása
  + Saját bemutatók listázása   
    + Bemutató hozzáadása
    + Bemutató megtekintése
    + Bemutató törlése
    + Bemutató szerkesztése
  + Kijelentkezés


**Végpontok**

+ **GET/**: főoldal
+ **GET/login**: bejelentkező adatok felküldése
+ **GET/register**: regisztrációs oldal
+ **GET/registraion**: regisztrációs adatok felküldése
+ **GET/logout**: kijelentkezés kezelése 
+ **GET/reviews**: saját bemutatók oldal
+ **GET/profile**: profil oldal
+ **POST/movies**: filmek listája oldal
+ **GET/new_review**: új bemutató oldal
+ **POS/create_review**: új bemutató adatainak felküldése
+ **GET/delete_r/:id**: bemutató törlése
+ **GET/modify_r/:id**: bemutató szerkesztése
+ **POST/edit_r/:id**: szerkesztés felküldése 
+ **GET/new_movie**: új film felvétele
+ **POST/create_movie**: új film adatainak felküldése
+ **GET/delete_m/:id**: film törlése
+ **GET/modify_m/:id**: film szerkesztése
+ **POST/edit_m/:id**: szerkesztés adatainak felküldése
+ **GET/filter**: Film lista szűrése 
+ **GET/movie/:id/reviews**: A kiválasztott filmhez tartozó bemutatók listázása
+ **GET/new_review/:id**: Új bemutató készítése
+ **GET/review/:id**: Egy bemutató megtekintése
+ **GET/movie/:id/show**: Egy film adatainak megtekintése


