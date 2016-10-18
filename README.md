# MovieReviewer
Egy egyszerű (imdb-szerű) filmelemző oldal, ahol filmekről lehet bemutatókat, értékeléseket írni, ajánlási és pontozási rendszerrel.

## Funkcionális elvárások

### Adminisztrátoroknak
#### Moderálás
- Filmelemzések szövegének módosítása
- Filmelemzések törlése
- Hozzászólások törlése
- Hozzászólások módosítása
- Főoldali bejegyzések kiírása

### Felhasználóknak
#### Profilkezelés
- Profiladatok szerkesztése (email, jelszó, bemutatkozás)
- Profilértékelések megtekintése (mennyien tekintették hasznosnak a bemutatóit, melyik a legelismertebb bemutatója)

#### Filmelemzések
ÚJ ÉRTÉKELÉS: 
 - Értékelés megadása: 
   * Összpontszám (Átlagolja a többiből)
   * Külön pontokra szedve 
     * Történet
     * Zene/Hang
     * Színészi játék
     * Vizualitás
     * Szinkron
 - Ismertető szöveg írása
   * Az ismertető a későbbiekben is változtatható
   * Beilleszthetőek képek illusztrációképpen

#### Hozzászólások
- Hozzászólások írása más felhasználók elemzéseihez
- Más felhasználók hozzászólásainak +1-ezése (Egyetértek) vagy -1-ezése (Nem ért egyet)

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
