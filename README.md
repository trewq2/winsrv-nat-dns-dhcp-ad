# WINDOWS SERVER 2012 + WINDOWS 7 – Interaktív hálózati labor

Tanulói, GitHub Pages-en működő weboldal a hálózati adminisztráció önálló gyakorlásához. Tartalom: Active Directory, tartomány létrehozása, DNS, Windows 7 tartományba léptetése, RRAS/NAT, két alhálózat, DHCP és hibakeresés.

## GitHub Pages publikálás

1. Hozz létre egy új, nyilvános GitHub repositoryt, például `windows-server-2012-labor` néven.
2. A ZIP-fájlt **csomagold ki**. A kicsomagolt fájlok között az alábbiak vannak:
   - `index.html` – a weboldal nyitólapja
   - `styles.css` – megjelenés
   - `data.js` – magyar tananyag, lépések, 40 kérdés és megoldás
   - `guides.js` – minden feladathoz részletes, kattintásról kattintásra haladó útmutató és a kapcsolódó mintaképek
   - `app.js` – interakciók, helyi mentés, értékelés és nyomtatás
   - `assets/` – 71 enyhén feljavított mintaképernyőkép, a lépésekbe építve
   - `README.md` és `TANARI_TAJÉKOZTATÓ.md` – útmutatók
3. **A mappa tartalmát**, ne csak magát a mappát, töltsd fel a repository gyökerébe. Az `index.html` közvetlenül a repository gyökerében legyen.
4. GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**. Branch: `main`, folder: `/(root)`, majd **Save**.
5. A publikált cím formája: `https://FELHASZNALONEV.github.io/windows-server-2012-labor/`.
6. A kezdőlapon nyiss meg egy tananyagot; a képek már az egyes lépések mellett láthatók. A teszt és a PDF-nyomtatás működését ellenőrizd.

A weboldal nem használ szervert, adatbázist, külső CDN-t, fontletöltést vagy belépést. Offline is működhet, ha a teljes mappa együtt marad. A haladás, név és teszteredmény a **böngésző saját localStorage tárolójában** maradnak; másik eszközön nem lesznek automatikusan elérhetők.

## Tanulói munkamenet

1. Az Áttekintés oldalon nézd meg a topológiát és az IP-címzési tervet.
2. Haladj sorrendben az 1–8. modul gyakorlati lépéseivel. Minden feladat mellett megtalálod a hozzá tartozó képet és a részletes végrehajtási lépéseket. A mintaképeken esetenként régi IP-címek és gépnevek vannak; mindig az oldalon kiírt aktuális beállítás a mérvadó.
3. A kulcsbeállításokról készíts saját képernyőképet. 18 kötelező és 2 extra bizonyíték szerepel a listán.
4. Töltsd ki a 40 kérdéses tesztet. A kérdéssorrend keveredik; a tanuló elnavigálhat, visszatérhet, megjelölheti a kihagyott tételeket.
5. A teszt lezárása után válaszd a **PDF eredménylap** gombot. A böngésző nyomtatási ablakában: **Mentés PDF-ként**. A részletes eredmény 40 válasszal, a tanuló nevével, osztályával és pontszámával készül el.
6. A saját képernyőképeket és a PDF eredménylapot a tanár által megadott Classroom-feladathoz vagy más felületre kell feltölteni. A weboldal nem tölti fel őket automatikusan.

## Laborhálózat

**Kezdetben:**
- Server 2012 adapter 1: NAT (WAN; VirtualBox DHCP – címe többnyire `10.0.2.15`, de az `ipconfig` eredménye dönt).
- Server 2012 adapter 2: Internal Network `LAN1`; `192.168.15.254/24`, nincs átjáró.
- Windows 7 Professional/Enterprise/Ultimate: **egyetlen** Internal Network `LAN1` adapter; ideiglenesen `192.168.15.2/24`; átjáró és DNS: `192.168.15.254`.
- Tartomány: `gyakorlat.local`; NetBIOS: `GYAKORLAT`; szerver: `SRV-DC1`; kliens: `WIN7-01`.

**DHCP-szakaszban:**
- Server LAN1 `192.168.15.254/25` (alhálózat `192.168.15.128/25`).
- Server LAN2, új 3. adapter: Internal Network `LAN2`; `192.168.15.126/25` (alhálózat `192.168.15.0/25`).
- LAN1 DHCP: `.129–.254`, kizárás `.250–.254`, gateway/DNS `.254`.
- LAN2 DHCP: `.1–.126`, kizárás `.122–.126`, gateway/DNS `.126`.
- A Windows 7-es kliens egyetlen adapterét LAN1 és LAN2 között átállítva a két hatókör külön is tesztelhető.

## Fontos biztonsági és kompatibilitási megjegyzések

- Mindkét régi Windows-verzió támogatási ideje lejárt. Kizárólag **elkülönített gyakorló** VM-ben használd őket, személyes és éles környezeti fiókokkal ne kísérletezz.
- A Windows 7 Home kiadások nem támogatják a tartományhoz csatlakozást.
- A szerver belső kártyáján nincs alapértelmezett átjáró. A tartományvezérlő DNS-rekordja ne mutasson az Internet felőli VirtualBox NAT-címre.
- Ne kapcsold ki általánosan a Windows tűzfalat; csak a ténylegesen szükséges szabályokat állítsd be.
- A PDF-exportot célszerű a gazdagép naprakész böngészőjében használni, nem a régi Windows 7 Internet Explorerben. Szükség esetén nyomtass és válassz PDF-nyomtatót.
- A teszt **gyakorló értékelés**, amely a kliensoldalon fut; megoldókulcsa a JavaScriptben megtalálható. Felügyelt, csalásbiztos vizsgának önmagában nem megfelelő.
- 50 perces tájékoztató visszaszámlálás látható, de a teszt nem zár automatikusan, ha lejár.

## Licenc és mintaábrák

Az alkalmazás saját, oktatási célú feldolgozás, a képernyőképek a felhasználó által biztosított forrásdokumentumból származnak. A képeken korábbi operációs rendszer-beállítások látszódhatnak. A forrásból vett képernyőképek önálló továbbhasznosításának jogosultságát a közzétevőnek kell megítélnie.
