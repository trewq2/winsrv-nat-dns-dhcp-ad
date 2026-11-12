# Tanári tájékoztató – Windows Server 2012 hálózati labor

**Célcsoport:** informatikai rendszer- és alkalmazás-üzemeltető technikus tanulók.

**Eszközök:** VirtualBox, egy Windows Server 2012 VM, egy Windows 7 Professional/Enterprise/Ultimate VM. Az első fázisban a szerveren 2 adapter (WAN=NAT és LAN1=Internal Network), a kliensen 1 adapter (LAN1=Internal Network). A két /25 alhálózat kialakításakor a szerverre harmadik (LAN2) adapter kerül.

**Tananyag:** 8 modul, 66 részletes, kattintásról kattintásra vezetett lépés, 71 feljavított képernyőkép a kapcsolódó feladatok mellett, közérthető elmélet (AD DS, tartomány, DNS, RRAS/NAT, DHCP, alhálózatok), képernyőképes bizonyítéklista, 40 kérdéses záróteszt.

**Javasolt feldolgozás:** A teljes feladatsor több gyakorlati órára való. Egyetlen tanórán inkább 1–2 összetartozó modul elvégzését tervezd. A modulokon látható percértékek csak tájékoztató jellegűek, a virtuális gépek sebessége és az előismeretek befolyásolják őket.

**Képernyőképek:** 18 kötelező és 2 opcionális képernyőkép szerepel a listában. Az egyes képekhez ajánlott fájlneveket megadja az oldal. A leadás Classroomon vagy az intézményi felületen történhet, a statikus honlap önmaga nem fogad feltöltést.

**Teszt:** 40 kérdés, 1 pont/kérdés, 0–40 pont, százalék és részletes visszajelzés. A tanuló adja meg a nevét és osztályát, kitölti a tesztet, majd a részletes eredménylapot PDF-ként menti. A megoldások kliensoldalon vannak; a megoldókulcs a JavaScriptből hozzáférhető, ezért formális, felügyelt vizsgára nem alkalmas.

**Különösen figyelj:** a WAN NAT-cím és a belső LAN1 cím ne keveredjen, a kliens tartományi DNS-e a szerver belső interfészére mutasson, a DHCP-hatóköröket /25-ös maszk alapján hozzák létre, és a WAN felé ne osszon DHCP-t a szerver.

**Publikálás:** a ZIP tartalma közvetlenül egy GitHub repository gyökerébe tölthető; Settings → Pages → main / root. A `README.md` teljes útmutatót tartalmaz.
