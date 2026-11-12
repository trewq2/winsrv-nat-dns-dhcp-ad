/* Windows Server 2012 + Windows 7 gyakorlólabor – önállóan működő tananyag-adatok */
window.LAB_DATA = {
  modules: [
    {
      id:'prep', icon:'🖧', title:'01 · Előkészítés és hálózat', minutes:35,
      intro:'Virtuális gépek, hálózati kártyák, IP-címek és gépnevek. A stabil hálózati alap nélkül a további szerepkörök nem működnek.',
      goals:['A NAT és a belső hálózat közötti különbség megértése','A két virtuális gép összekötése belső LAN-on','IP-címek, átjáró és DNS dokumentálása'],
      theory:[
        ['VirtualBox NAT','A virtuális gép a VirtualBox címfordításán keresztül éri el a külvilágot. A NAT-os szerveradapter gyakran 10.0.2.15 címet kap, de mindig az ipconfig eredményét kell ellenőrizni.'],
        ['Internal Network / Belső hálózat','Az azonos nevű (LAN1) belső hálózatra kapcsolt gépek egymást látják, a gazdagépet és az internetet közvetlenül nem. Az internethez később a szerver NAT-szolgáltatása vezet.'],
        ['Alapértelmezett átjáró','Az átjáró a más hálózatok felé vezető út. A kliensen a szerver LAN-címe lesz az átjáró, a szerver belső adapterén viszont nem adunk meg külön átjárót.']
      ],
      steps:[
        ['Készíts visszaállítási pontot','A VirtualBox-ban készíts pillanatképet mindkét gépről a beállítások megváltoztatása előtt. Minden módosítás saját, elkülönített virtuális laboron történjen.',null,'Bizonyíték: a két virtuális gép listája és állapota.'],
        ['Szerver: első adapter = NAT','A Windows Server 2012 gépen a VirtualBox → Settings → Network → Adapter 1: Enable, Attached to: NAT. Az IP-t a VirtualBox DHCP adja; nem írjuk be kézzel a 10.0.2.15 címet.','ipconfig /all','Ezt az adaptert WAN-nak nevezzük át.'],
        ['Szerver: második adapter = belső LAN1','Adapter 2: Enable, Attached to: Internal Network, név: LAN1. Windowsban: Control Panel → Network and Sharing Center → Change adapter settings. Az adapter neve legyen LAN1.','ncpa.cpl','A WAN és LAN1 adaptereket azonosítsd, nehogy felcseréld őket.'],
        ['LAN1 IPv4-cím beállítása','A szerver LAN1 interfészén: IP = 192.168.15.254; maszk = 255.255.255.0; átjáró = üres; elsődleges DNS = 127.0.0.1. A DNS-szerepkör későbbi telepítéséig a névfeloldás korlátozott lehet.',null,'A LAN-adapterre ne állíts be alapértelmezett átjárót.'],
        ['Kliens: csak egy belső LAN1 adapter','A Windows 7 virtuális gép egyetlen hálózati adaptere Internal Network / LAN1 legyen, ne NAT. Enélkül nem éri el a szerver saját LAN-ját. A Windows 7 Professional, Enterprise vagy Ultimate kiadása alkalmas tartományba léptetésre.',null,'A korábbi, NAT-os 10.0.2.15 Windows 7 beállítást ennél a gyakorlatnál felváltja a belső LAN1.'],
        ['Windows 7 ideiglenes statikus cím','A kliens IPv4-címe: 192.168.15.2; maszk: 255.255.255.0; átjáró: 192.168.15.254; DNS: 192.168.15.254. Később, a két alhálózat kialakításakor változtatjuk meg.',null,'A Windows 7 kliensen a hálózati profil lehet Otthoni/Munkahelyi a laborhoz.'],
        ['Nevezd át a gépeket','Szerver: SRV-DC1; kliens: WIN7-01. A szerveren Server Manager → Local Server → Computer name, Windows 7-en Control Panel → System → Change settings → Change. Mindkét átnevezés után indítsd újra az érintett gépet.','hostname','A régebbi mintaképeken más gépnevek és IP-k szerepelhetnek; mindig az itt közölt értékeket használd.'],
        ['Ellenőrizd az összeköttetést','A kliensről pingeld a szerver belső IP-jét; a szerveren ellenőrizd a két adaptert és a route táblát. A szerveren az internetnek WAN-on keresztül már működnie kell.','ipconfig /all\nping 192.168.15.254\nroute print','Ha a ping sikertelen, először a LAN1 nevet és a tűzfalszabályokat ellenőrizd, ne kapcsold ki általánosan a tűzfalat.']
      ],
      shots:[['15_01','Hálózati és megosztási központ'],['16_02','Az IPv4 tulajdonságok megnyitása'],['16_03','Statikus LAN-beállítás mintája'],['17_02','Hálózati adapter átnevezése'],['18_02','Számítógép átnevezése']]
    },
    {
      id:'domain',icon:'🏛️',title:'02 · Active Directory és tartomány',minutes:65,
      intro:'Windows Server 2012: az AD DS szerepkör telepítése és a gyakorlat.local tartomány felépítése új erdőben.',
      goals:['A tartomány és tartományvezérlő szerepének értelmezése','Az AD DS szerepkör telepítése','Az új erdő és tartomány létrehozása'],
      theory:[
        ['Tartomány (domain)','Központi felhasználó-, számítógép- és jogosultságkezelési egység. A gépek nem külön-külön tárolják a tartományi azonosítókat.'],
        ['Active Directory Domain Services (AD DS)','A tartományi objektumok címtára: felhasználók, csoportok, számítógépek, szervezeti egységek. A tartományvezérlő biztosítja a hitelesítést.'],
        ['Erdő és NetBIOS név','Az erdő egy vagy több tartományt foglalhat össze. Ebben a laborban egy erdő, egy tartomány: gyakorlat.local; a rövid NetBIOS-név GYAKORLAT.'],
        ['DNS szerepe','A tartományhoz csatlakozás DNS-alapú szolgáltatás-felderítést igényel. Nem elég a szerver IP-címét ismerni: a kliens DNS-e a belső tartományvezérlőt kell kérdezze.']
      ],
      steps:[
        ['Server Manager megnyitása','A szerveren nyisd meg a Server Manager alkalmazást és válaszd a Dashboard → Add Roles and Features menüpontot.'],
        ['Telepítési típus','Válaszd a Role-based or feature-based installation opciót, majd a helyi szervert a listában.'],
        ['AD DS szerepkör kiválasztása','Jelöld be az Active Directory Domain Services (AD DS) szerepkört. Fogadd el az Add Features ablakban felkínált kiegészítő eszközöket.'],
        ['Telepítés','A Features és AD DS tájékoztató képernyők után ellenőrizd az összegzést, majd Install. A telepítés végén még nem kész a tartományvezérlő.'],
        ['Tartományvezérlővé előléptetés','A Server Manager figyelmeztető zászlójánál válaszd a Promote this server to a domain controller lehetőséget.'],
        ['Új erdő és tartománynév','Deployment Configuration: Add a new forest. Root domain name: gyakorlat.local. Ne meglévő tartományhoz csatlakozz!'],
        ['Tartományvezérlő beállításai','Forest functional level: Windows Server 2012; Domain functional level: Windows Server 2012. DNS Server és Global Catalog maradjon jelölve. A DSRM-hez adj meg saját, megfelelően erős gyakorló jelszót, és biztonságosan jegyezd fel.','', 'Ne használj a tananyagban látott közös jelszót; a képernyőképeken jelszó soha ne látszódjon.'],
        ['NetBIOS és adatbázis elérési út','Az Additional Options képernyőn NetBIOS: GYAKORLAT. A Paths beállításokat a laborban hagyd alapértelmezetten.'],
        ['Ellenőrzés, telepítés, újraindítás','Review Options → Prerequisites Check → Install. Egyes DNS-delegálási figyelmeztetések új erdőnél megjelenhetnek; a piros előfeltételhibákat viszont oldd meg. A kiszolgáló újraindul.'],
        ['Tartományellenőrzés','Jelentkezz be tartományi rendszergazdaként; Server Manager → Tools alatt ellenőrizd az Active Directory Users and Computers, DNS és Group Policy Management eszközöket.','echo %USERDOMAIN%\nhostname\nnslookup gyakorlat.local','Ezen a ponton készíts képernyőképet a tartományról.']
      ],
      shots:[['19_01','AD DS telepítővarázsló indítása'],['20_01','Role-based installation'],['21_01','AD DS és függőségei'],['24_02','Új erdő létrehozása'],['25_01','Funkcionális szint és DNS'],['26_01','NetBIOS név'],['27_01','Ellenőrzés és telepítés'],['28_02','Sikeres tartománytelepítés']]
    },
    {
      id:'dns',icon:'🧭',title:'03 · DNS és névfeloldás',minutes:60,
      intro:'DNS-kiszolgáló ellenőrzése, továbbítók, előre- és visszafelé keresési zóna, A / CNAME / PTR rekordok.',
      goals:['A DNS szerepének bemutatása a tartományban','Rekordok létrehozása és visszakeresése','Névfeloldási hiba keresése nslookup segítségével'],
      theory:[
        ['DNS','A Domain Name System neveket fordít IP-címekre, illetve fordított irányú feloldást is biztosíthat. Tartományi környezetben a szolgáltatásrekordok különösen fontosak.'],
        ['A, CNAME és PTR','A rekord: név → IPv4. CNAME: egy név másik név álneve. PTR: IPv4-cím → gazdanév egy reverse lookup zone-ban.'],
        ['Forwarder','A DNS-szerver az általa nem ismert, külső neveket továbbíthatja másik DNS-szerverhez, például egy oktatási környezetben engedélyezett külső resolverhez.'],
        ['Több hálózati interfész','A WAN felől kapott IP hibásan bekerülhet a belső tartomány DNS-rekordjai közé. Belső AD-kliens számára csak elérhető belső címre szabad mutatnia a tartományvezérlő névrekordjának.']
      ],
      steps:[
        ['DNS konzol megnyitása','Server Manager → Tools → DNS. A SRV-DC1 szerveren nyisd meg a Properties ablakot.'],
        ['Hallgatózó interfészek','Interfaces: a DNS legalább a LAN1 címen (192.168.15.254) hallgasson. A WAN felé nem kell DNS-szolgáltatást nyújtani.'],
        ['WAN-rekordregisztráció tiltása','WAN adapter → IPv4 → Advanced → DNS: vedd ki a Register this connection’s addresses in DNS jelölést. A belső gyakorlat.local DNS-zónában vizsgáld át az SRV-DC1 rekordokat, és töröld a téves, WAN-címre mutató rekordot, ha létrejött.',null,'Csak egyértelműen hibás, WAN IP-címet tartalmazó rekordot törölj; az AD-hez szükséges belső rekordokat tartsd meg.'],
        ['Továbbítók beállítása','DNS Properties → Forwarders: ha az iskola előírása engedi, adj meg például 1.1.1.1 vagy 8.8.8.8 továbbítót. Ezek szemléltető külső DNS-címek, nem belső tartományi DNS-szerverek.'],
        ['Monitoring teszt','DNS Properties → Monitoring → Test Now. Jegyezd fel, sikerült-e a simple és recursive query (utóbbi internetet / továbbítót igényelhet).'],
        ['Előre keresési zóna áttekintése','Forward Lookup Zones → gyakorlat.local: keresd meg a tartományvezérlő A rekordját (SRV-DC1 → 192.168.15.254), illetve az AD-hez tartozó _msdcs, _sites, _tcp és _udp szerkezeteket.'],
        ['Alias létrehozása','A gyakorlat.local zónában: New Alias (CNAME). Alias name: www; Fully qualified domain name for target host: SRV-DC1.gyakorlat.local. A www.gyakorlat.local nem új gép, hanem alias.'],
        ['Visszafelé keresési zóna','Reverse Lookup Zones → New Zone → Primary Zone, AD-integrált → IPv4 Reverse Lookup Zone → Network ID: 192.168.15. Biztonságos dinamikus frissítés domain környezetben.'],
        ['PTR rekord létrehozása','A reverse zónában készíts SRV-DC1-hez a 192.168.15.254 címre mutató PTR rekordot. A 192.168.15.0/24 zóna a későbbi két /25 alhálózat címterét is lefedi.'],
        ['Névfeloldás vizsgálata','A szerveren és – a tartományba léptetés után – a Windows 7-en próbáld ki az A, CNAME, PTR és külső név feloldását.','nslookup srv-dc1.gyakorlat.local 192.168.15.254\nnslookup www.gyakorlat.local 192.168.15.254\nnslookup 192.168.15.254 192.168.15.254','Ha a DNS-kiszolgáló „Unknown”, az önmagában nem bizonyítja a névfeloldás hibáját; ellenőrizd a PTR rekordot és a válaszcímeket.']
      ],
      shots:[['29_01','DNS Interfaces beállítások'],['30_01','DNS Forwarders beállítása'],['30_04','Monitoring tesztek'],['32_03','DNS-zóna rekordjai'],['33_01','Új CNAME rekord'],['35_01','Reverse Lookup Zones létrehozása'],['36_01','Reverse zóna hálózata'],['36_05','PTR rekord felvétele']]
    },
    {
      id:'join',icon:'💻',title:'04 · Windows 7 tartományba léptetése',minutes:35,
      intro:'A Windows 7 kliens a belső DNS-kiszolgálót használva csatlakozik a gyakorlat.local tartományhoz.',
      goals:['A DNS és a tartománytagság kapcsolatának értése','Windows 7 tartományba léptetése','Tartományi bejelentkezés és ellenőrzés'],
      theory:[
        ['Munkacsoport és tartomány','Munkacsoportban a gépek helyileg kezelik a fiókokat. Tartományban központi hitelesítés és egységes felügyelet lehetséges.'],
        ['Windows 7 kiadás','A Windows 7 Professional, Enterprise és Ultimate támogatja a tartománytagságot. A Home kiadások nem.'],
        ['DNS előfeltétel','A kliens kizárólag az AD-t kiszolgáló DNS-re (192.168.15.254) mutasson, ne nyilvános 8.8.8.8-ra a tartományba léptetésnél.']
      ],
      steps:[
        ['IP és DNS ellenőrzése','Windows 7 → Command Prompt: ipconfig /all. Kliens: 192.168.15.2/24; átjáró és DNS: 192.168.15.254. A kliens adaptere LAN1 belső hálózaton legyen.','ipconfig /all'],
        ['Szerverelérés tesztje','Pingeld a szerver címét; ellenőrizd a gyakorlat.local és SRV-DC1.gyakorlat.local DNS-feloldást.','ping 192.168.15.254\nnslookup srv-dc1.gyakorlat.local 192.168.15.254'],
        ['Tartományhoz csatlakozás','Control Panel → System → Change settings → Computer Name → Change → Member of: Domain → gyakorlat.local.'],
        ['Hitelesítés','Add meg a tartományhoz csatlakoztatásra jogosult fiók adatait, szükség esetén GYAKORLAT\\Administrator; használj csak gyakorló jelszót.'],
        ['Újraindítás és tartományi bejelentkezés','A sikeres csatlakozás után indítsd újra a gépet, majd jelentkezz be a tartomány egy jogosult gyakorló fiókjával.','whoami\necho %USERDOMAIN%','Ha a tartományi felhasználó nem tud bejelentkezni, ellenőrizd a szerver időbeállítását, DNS-t és a kapcsolatot.'],
        ['Számítógépfiók ellenőrzése','A szerveren Active Directory Users and Computers → Computers: keresd meg a WIN7-01 gépfiókot. Készíts képernyőképet.']
      ],
      shots:[['38_01','Tartomány kiválasztása'],['38_02','Jogosultsággal rendelkező fiók'],['38_03','Sikeres csatlakozás'],['38_04','Újraindítás szükséges']]
    },
    {
      id:'nat',icon:'🌐',title:'05 · NAT és RRAS',minutes:60,
      intro:'A Windows Server a belső hálózat és a virtuális WAN között útválasztást és NAT-ot valósít meg.',
      goals:['A NAT működésének bemutatása','RRAS szerepkör telepítése és NAT konfigurálása','A kliens internetkapcsolatának tesztelése'],
      theory:[
        ['NAT (Network Address Translation)','A belső címek kimenő forgalmát az átjáró egy külső oldali címre fordítja. A kliensnek az átjáró az SRV-DC1 LAN1 címe.'],
        ['RRAS','Routing and Remote Access Service: Windows Server útválasztási és távoli elérési szolgáltatása. Ebben a feladatban az IPv4 NAT a lényeg.'],
        ['Kettős NAT a laborban','A szerver a LAN1-forgalmat a saját WAN-címére fordítja, majd a VirtualBox NAT továbbít a külvilágra. Oktatási célra elfogadható, éles környezetben nem feltétlenül jó kialakítás.'],
        ['Biztonság','A teljes Windows tűzfal kikapcsolása nem része a feladatnak. Az elavult operációs rendszerek kizárólag elkülönített tanulói környezetben használhatók.']
      ],
      steps:[
        ['Szerepkör telepítése','Server Manager → Add Roles and Features → Remote Access → Routing (szükséges kiegészítőkkel). Telepítés után a Tools menüben nyisd meg a Routing and Remote Access konzolt.'],
        ['RRAS engedélyezése','Kiszolgáló nevén jobb kattintás → Configure and Enable Routing and Remote Access. Válaszd a NAT konfigurációt.'],
        ['Külső interfész kiválasztása','Public interface connected to the Internet: kizárólag WAN (VirtualBox NAT, tipikusan 10.0.2.15). A LAN1 nem a publikus oldal.'],
        ['Belső interfész ellenőrzése','RRAS → IPv4 → NAT listában WAN: Public / NAT enabled. A LAN1: Private interface. Ha szükséges, add hozzá a LAN1-et privát interfészként.','ipconfig /all','Ne engedélyezd a DHCP-t a VirtualBox NAT oldalon a Windows DHCP szerepkör részeként.'],
        ['Kliens átjáró és DNS','Windows 7 továbbra is LAN1-en, 192.168.15.2/24; default gateway: 192.168.15.254; DNS: 192.168.15.254. Az internethez a szerver továbbít és NAT-ol.'],
        ['NAT ellenőrzése','A kliensről pingelj külső IP-címet, majd DNS-nevet; a külső ICMP visszajelzés szolgáltatónként változhat.','ping 192.168.15.254\nping 1.1.1.1\nnslookup www.microsoft.com 192.168.15.254\ntracert 1.1.1.1','Ha IP alapján van kapcsolat, de névvel nincs, előbb a DNS Forwarders és a kliens DNS-beállításait ellenőrizd.'],
        ['RRAS képernyőkép','Rögzítsd a Routing and Remote Access → IPv4 → NAT ablakot úgy, hogy a WAN és LAN1 szerepe látszódjon.']
      ],
      shots:[['39_01','Remote Access szerepkör'],['40_02','Routing szolgáltatás'],['43_03','RRAS konfigurálása'],['44_02','NAT konfigurációs típus'],['44_03','WAN kiválasztása'],['45_01','RRAS telepítés vége']]
    },
    {
      id:'subnet',icon:'🧩',title:'06 · Két alhálózat kialakítása',minutes:45,
      intro:'A 192.168.15.0/24 tartomány két darab /25 részre osztása, harmadik szerveradapter felvétele.',
      goals:['A /25 maszk és a címtartományok megértése','LAN2 hozzáadása a virtuális szerverhez','A két belső hálózat IPv4 konfigurációja'],
      theory:[
        ['Alhálózati maszk /25','255.255.255.128. Két alhálózat: 192.168.15.0/25 (használható .1–.126) és 192.168.15.128/25 (használható .129–.254).'],
        ['LAN1 (felső tartomány)','Hálózat: 192.168.15.128/25. Szerver IP/átjáró: 192.168.15.254. A kliens ideiglenes címe a váltáshoz: 192.168.15.130/25.'],
        ['LAN2 (alsó tartomány)','Hálózat: 192.168.15.0/25. Szerver IP/átjáró: 192.168.15.126. A két szegmens külön VirtualBox Internal Network legyen.']
      ],
      steps:[
        ['Átállítás előtt pillanatkép','A változtatás megszakíthatja a klienskapcsolatot. Készíts pillanatképet az AD + DNS + NAT működő állapotáról.'],
        ['Először a kliens címét állítsd át','WIN7-01 LAN1: IP = 192.168.15.130; maszk = 255.255.255.128; átjáró = 192.168.15.254; DNS = 192.168.15.254. Így a kliens már a későbbi felső alhálózatban van.',null,'A 192.168.15.2 cím az alsó /25 részbe esne, ezért a régi címmel nem maradhat a LAN1 szegmensen.'],
        ['Szerver LAN1 maszk módosítása','SRV-DC1 LAN1: 192.168.15.254 / 255.255.255.128; átjáró továbbra sincs. Ellenőrizd, hogy a kliens a 192.168.15.254 címet pingeli.'],
        ['Szerver harmadik adaptere','Kapcsold ki a szerver VM-et, VirtualBox → Network → Adapter 3: Internal Network, név: LAN2. Indítás után a Windowsban nevezd át az új kártyát LAN2-re.'],
        ['Szerver LAN2 konfigurálása','LAN2: IP = 192.168.15.126; maszk = 255.255.255.128; átjáró = üres; DNS = 127.0.0.1 vagy a helyi DNS-szerver elérhető címe. A WAN továbbra is DHCP-s.'],
        ['DNS hallgatózás bővítése','DNS Properties → Interfaces: 192.168.15.254 és 192.168.15.126. A WAN-cím nem legyen DNS-hallgatási cím. A LAN2 WAN-tól független marad.'],
        ['Útvonal és interfészek ellenőrzése','Szerver: ipconfig /all és route print. Két külön hálózatot kell látni: 192.168.15.0/25 és 192.168.15.128/25.','ipconfig /all\nroute print\nping 192.168.15.130','A /25 maszk mindkét LAN-adapteren legyen pontosan 255.255.255.128.']
      ],
      shots:[['48_01','Hálózati interfészek elnevezése'],['48_02','Hálózati interfészek beállítása'],['48_03','Két /25 alhálózat címezése'],['49_01','DNS szolgáltatás LAN1-en'],['49_02','DNS szolgáltatás LAN2-n']]
    },
    {
      id:'dhcp',icon:'📡',title:'07 · DHCP: két hatókör és foglalás',minutes:80,
      intro:'DHCP szerepkör, tartományi engedélyezés, két /25 hatókör, kizárások, átjáró/DNS opciók és MAC-alapú címfoglalás.',
      goals:['A DHCP DORA folyamatának megértése','A LAN1 és LAN2 hatókörök helyes konfigurálása','Klienscím-kiosztás és címfoglalás igazolása'],
      theory:[
        ['DHCP','Dynamic Host Configuration Protocol. A kliens automatikusan kaphat IP-címet, maszkot, alapértelmezett átjárót és DNS-címet.'],
        ['Hatókör (scope)','Adott hálózathoz tartozó DHCP címtartomány. Két /25 hálózathoz két külön hatókör szükséges.'],
        ['Kizárás és foglalás','Kizárás: bizonyos címeket nem oszthat ki a DHCP. Foglalás (reservation): egy MAC-címhez meghatározott IPv4-címet rendel.'],
        ['Tartományi jogosítás','AD-környezetben a DHCP kiszolgálót engedélyezni kell (Authorize), mielőtt érvényesen oszthatna címeket.'],
        ['DORA','Discover → Offer → Request → Acknowledge. A kliens felfedezi a kiszolgálót, ajánlatot kap, kéri a címet, majd visszaigazolást kap.']
      ],
      steps:[
        ['DHCP szerepkör telepítése','Server Manager → Add Roles and Features → DHCP Server → Add Features → Install. A telepítés után Complete DHCP configuration.'],
        ['Telepítés utáni beállítás','Post-Install Configuration: a megfelelő tartományi adminisztrátori fiókkal végezd el a jogosításhoz szükséges lépéseket. Server Manager → Tools → DHCP.'],
        ['LAN1 hatókör létrehozása','DHCP konzol → IPv4 → New Scope. Név: LAN1. Kezdőcím: 192.168.15.129; végcím: 192.168.15.254; maszk: 255.255.255.128 (/25).'],
        ['LAN1 kizárás','Exclusion range: 192.168.15.250–192.168.15.254. Így a szerver saját .254 címe nem kapható meg dinamikusan.'],
        ['LAN1 DHCP opciók','003 Router: 192.168.15.254; 006 DNS Servers: 192.168.15.254; 015 DNS Domain Name: gyakorlat.local. Aktiváld a hatókört.'],
        ['LAN2 hatókör létrehozása','Új hatókör: LAN2. Kezdőcím: 192.168.15.1; végcím: 192.168.15.126; maszk: 255.255.255.128 (/25).'],
        ['LAN2 kizárás és opciók','Kizárás: 192.168.15.122–192.168.15.126. 003 Router: 192.168.15.126; 006 DNS Servers: 192.168.15.126; 015 DNS Domain Name: gyakorlat.local. Aktiváld.'],
        ['DHCP jogosítás és kötés','A DHCP konzolon jobb kattintás a kiszolgálón → Authorize (ha még nem engedélyezett), majd Refresh. A kiszolgáló Bindings beállításánál csak LAN1 és LAN2 legyen DHCP-t kiszolgáló interfész, a WAN ne.'],
        ['LAN1 kliens DHCP-teszt','A WIN7-01 LAN1 adapterén válaszd az automatikus IP és DNS-kérést; futtasd az ipconfig /release és /renew parancsokat. Ellenőrizd a kiosztott címet, átjárót, DNS-t és a DHCP-szerver címét.','ipconfig /release\nipconfig /renew\nipconfig /all','A LAN1 kliens címe 192.168.15.129–249 között várható, de a kiosztott konkrét IP dinamikus és nem garantálható.'],
        ['DHCP Lease és Reservation','DHCP → LAN1 Scope → Address Leases. A WIN7-01 címét / MAC-azonosítóját keresd meg; jobb kattintás → Add to Reservation. Alternatívaként Reservations → New Reservation, ha magad akarod megadni a fenntartott címet.','getmac','A foglalás MAC-cím alapján történik.'],
        ['LAN2 teszt egy klienssel – választható','Jegyezd fel a LAN1 mérési adatokat. Kapcsold ki a WIN7-01 virtuális gépet, a hálókártyát tedd át Internal Network → LAN2-re, indítsd, kérj új DHCP-címet. A cím a 192.168.15.1–121 intervallumból érkezzen; gateway/DNS: .126. Teszt után állítsd vissza LAN1-re.','ipconfig /release\nipconfig /renew\nipconfig /all','Egyidejű két kliens helyett egymás után vizsgáljuk a két alhálózatot. Visszaállítás után a tartományi működést is ellenőrizd.'],
        ['Záróellenőrzés','DHCP Address Leases, a két Scope Options (003/006/015), Reservations, DNS A/PTR, RRAS NAT és a kliens ipconfig /all eredménye alapján dokumentáld a rendszer működését.']
      ],
      shots:[['49_03','DHCP szerver telepítése'],['50_02','DHCP utókonfigurálás'],['50_04','DHCP engedélyezése'],['51_01','DHCP konzol indítása'],['52_03','Hatókör elnevezése'],['52_04','IP-tartomány és /25'],['52_05','Kizárási tartomány'],['52_07','DNS opciók'],['53_06','Hatókör aktiválása'],['54_02','Scope Options beállítása'],['55_02','Kiadott címek'],['55_03','Címfoglalás'],['56_03','Új foglalás'],['56_04','MAC és IP megadása']]
    },
    {
      id:'finish',icon:'✅',title:'08 · Hibakeresés és leadás',minutes:25,
      intro:'Az érdemi megoldás igazolása, rendszeres hibák javítása, képernyőképek és a záróteszt PDF-ben történő beküldése.',
      goals:['Az alapvető konfigurációs hibák felismerése','Áttekinthető képernyőképes dokumentáció elkészítése','40 kérdéses tudásmérés lezárása'],
      theory:[
        ['Ha nem megy a tartományba léptetés','Leggyakrabban hibás DNS, nem egyező belső hálózat, elírt tartománynév vagy jelentősen eltérő rendszeridő.'],
        ['Ha nem oszt címet a DHCP','Vizsgáld meg az Authorize státuszt, Scope Activation beállítást, Bindings-et, a megfelelő LAN-t, a kliens automatikus címkérését és a /25 maszkot.'],
        ['Ha nincs internet a kliensen','Ellenőrizd a NAT-ot, a szerver WAN internetét, az átjárót (003), a DNS-t (006) és a DNS továbbítót. A külső ICMP tiltása nem jelenti feltétlenül az internet elérhetetlenségét.'],
        ['Leadási szabály','A képernyőképek saját munkát bizonyítsanak; jelszó, személyes adat és belépési token soha ne szerepeljen rajtuk. A weboldal nem küld fájlokat a tanárnak automatikusan.']
      ],
      steps:[
        ['Konzolos diagnosztika','Futtasd a kliensen az alap ellenőrző parancsokat, és hasonlítsd össze a kapott értékeket a hálózati tervvel.','ipconfig /all\nping 192.168.15.254\nnslookup srv-dc1.gyakorlat.local\nwhoami'],
        ['Szerver oldali ellenőrzés','Mutasd meg a DNS Forward Lookup Zone-t, a két DHCP Scope Options beállítást és az RRAS NAT interfészeit.'],
        ['Képernyőképek elmentése','Windows 7: Képmetsző (Snipping Tool) vagy PrtScn → Paint → mentés PNG formátumban. Az egyes bizonyítékokat a „Leadandó képek” listán szereplő névvel mentsd.'],
        ['Önellenőrzés','Az útmutató lépéseit kipipálva ellenőrizd a hiányzó munkafázisokat. A jelölések a böngészőben maradnak, de ez nem helyettesíti a valódi gépellenőrzést.'],
        ['Záróteszt és PDF','A Teszt menüpontban add meg a nevet és osztályt, válaszolj a 40 kérdésre, értékeld ki, majd „PDF-be mentés / Nyomtatás”. Böngészőben cél: Mentés PDF-ként.'],
        ['Beküldés','A tanár által használt felületen (például Classroom) küldd be a képernyőképeket és a teszt PDF-jét. A weboldal nem rendelkezik automatikus feltöltéssel.']
      ],
      shots:[['32_03','DNS rekord ellenőrzése'],['43_03','RRAS NAT ellenőrzése'],['55_02','DHCP kiadott címek ellenőrzése']]
    }
  ],
  evidence:[
    ['E01','01','VirtualBox szerver adapterek (WAN=NAT, LAN1=Internal Network)','01_virtualbox_szerver_halozat.png',true],
    ['E02','01','Szerver LAN1 IPv4 192.168.15.254/24','02_szerver_lan1_ip.png',true],
    ['E03','01','Windows 7 kliens IP/DNS + ping a szerver felé','03_win7_ip_es_ping.png',true],
    ['E04','02','AD DS szerepkör telepítve és a tartomány létrehozva','04_ad_ds_tartomany.png',true],
    ['E05','02','Server Manager: SRV-DC1 és gyakorlat.local','05_server_manager.png',true],
    ['E06','03','Forward Lookup Zone: SRV-DC1 A rekord','06_dns_a_rekord.png',true],
    ['E07','03','www.gyakorlat.local CNAME alias','07_dns_cname.png',true],
    ['E08','03','Reverse Lookup Zone és PTR / nslookup','08_dns_ptr.png',true],
    ['E09','04','WIN7-01 gépfiók az Active Directoryban','09_win7_domain.png',true],
    ['E10','04','Windows 7 tartományi bejelentkezés / whoami','10_win7_bejelentkezes.png',true],
    ['E11','05','RRAS NAT: WAN Public és LAN1 Private','11_rras_nat.png',true],
    ['E12','05','Windows 7 internet és DNS teszt','12_nat_internet_teszt.png',true],
    ['E13','06','LAN1 /25 és LAN2 /25 szerverinterfészek','13_ket_alhalozat.png',true],
    ['E14','07','DHCP LAN1 hatókör: címek, kizárás és opciók','14_dhcp_lan1.png',true],
    ['E15','07','DHCP LAN2 hatókör: címek, kizárás és opciók','15_dhcp_lan2.png',true],
    ['E16','07','DHCP Authorize / aktív kiszolgáló','16_dhcp_jogositas.png',true],
    ['E17','07','Windows 7 DHCP-s cím és DHCP Server','17_win7_dhcp.png',true],
    ['E18','07','DHCP Address Leases és Reservation','18_dhcp_foglalas.png',true],
    ['E19','07','Választható: kliens áthelyezése LAN2-re, DHCP .1–.121','19_lan2_dhcp_extra.png',false],
    ['E20','08','Választható: teljes hálózati rajz','20_topologia_extra.png',false]
  ],
  questions: [
    ['Mit jelent az AD DS rövidítés?',['Active Directory Domain Services','Advanced Data Disk Service','Automatic Domain DNS Server','Active Driver Distribution System'],0,'Az AD DS a Windows tartományok címtárszolgáltatása.'],
    ['Mi a labor tartományának teljes neve?',['iskola.local','gyakorlat.local','virtualbox.home','lan1.local'],1,'A gyakorlatban a gyakorlat.local tartományt építjük ki.'],
    ['Mi a tartomány rövid NetBIOS neve?',['LAN1','WINDOWS7','GYAKORLAT','SERVER2012'],2,'A NetBIOS-név GYAKORLAT.'],
    ['Hány virtuális hálózati adapter kell a szerveren a NAT-os első szakaszban?',['Egy','Kettő','Három','Négy'],1,'Kezdetben WAN (NAT) és LAN1 (belső) adapter kell.'],
    ['Melyik hálózati módot használja a szerver WAN adaptere?',['Host-only','Bridged','Internal Network','NAT'],3,'A VirtualBox NAT biztosítja a szerver külső kapcsolatát.'],
    ['Melyik módba kerüljön a Windows 7 egyetlen adaptere?',['Internal Network: LAN1','NAT','Bridged','Not attached'],0,'A kliensnek a szerver belső LAN1 hálózatához kell kapcsolódnia.'],
    ['Melyik IP-t kapja kezdetben a szerver LAN1 adaptere?',['192.168.15.1','192.168.15.254','10.0.2.15','192.168.15.126'],1,'A szerver kezdeti LAN1 címe 192.168.15.254/24.'],
    ['Melyik a Windows 7 kezdeti LAN1 DNS-kiszolgálója?',['8.8.8.8','10.0.2.2','192.168.15.254','192.168.15.2'],2,'A kliens az AD-hez tartozó belső DNS-t használja.'],
    ['Miért nem állítunk be külön alapértelmezett átjárót a szerver belső LAN1 adapterén?',['Mert a kliensnek nincs DNS-e','Mert az alapértelmezett út a WAN felé mutasson','Mert a LAN1 nem TCP/IP','Mert tilos két adapter egy gépben'],1,'Az alapértelmezett út a szerver külső oldalán legyen.'],
    ['Melyik Windows 7 kiadás képes tartományhoz csatlakozni?',['Home Basic','Starter','Professional','Home Premium'],2,'Windows 7 Professional, Enterprise és Ultimate képes tartománytagságra.'],
    ['Hol indítható a Windows Server 2012 szerepkör telepítése?',['Device Manager → Drivers','Server Manager → Add Roles and Features','Control Panel → Mouse','Windows Media Player'],1,'A szerepkörök telepítővarázslója a Server Managerből indul.'],
    ['Mi a helyes beállítás új tartomány létrehozásához?',['Add a new forest','Join an existing forest','Create a shared folder','Enable anonymous logon'],0,'Egy új erdő gyökértartományát hozzuk létre.'],
    ['Mi történik az AD DS szerepkör egyszerű telepítése után?',['A kliens automatikusan tartománytag lesz','Már kész a DHCP','A szervert még tartományvezérlővé kell előléptetni','Megszűnik a DNS'],2,'A Promote this server to a domain controller külön lépés.'],
    ['Mire szolgál a DSRM jelszó?',['DNS zóna törlésre','Címtárszolgáltatás helyreállítási módjára','DHCP-lease kiosztásra','VirtualBox NAT indítására'],1,'A Directory Services Restore Mode speciális helyreállítási mód.'],
    ['Melyik DNS rekord rendel IPv4-címet egy gépnévhez?',['PTR','MX','A','TXT'],2,'Az A rekord a név → IPv4 feloldást adja.'],
    ['Melyik rekord hoz létre álnevet?',['CNAME','PTR','SOA','SRV'],0,'A CNAME másik kanonikus névre mutat.'],
    ['Melyik rekord tesz lehetővé fordított IP → név feloldást?',['AAAA','NS','CNAME','PTR'],3,'PTR rekord szükséges a reverse lookup zónában.'],
    ['Milyen címre mutasson a SRV-DC1 belső A rekordja a kezdeti LAN1 hálózaton?',['10.0.2.15','192.168.15.254','127.0.0.1','8.8.8.8'],1,'A belső kliensek által elérhető címre kell mutatnia.'],
    ['Mi a DNS Forwarder célja?',['IP-címek DHCP-kiosztása','Külső DNS-kérdések továbbítása','Jelszavak tárolása','NAT tiltása'],1,'A továbbító az ismeretlen nevek feloldásában segít.'],
    ['Melyik parancs teszteli a DNS-feloldást?',['diskpart','nslookup','format','taskkill'],1,'Az nslookup DNS-kérdezésre használható.'],
    ['Miért veszélyes a WAN-cím automatikus regisztrálása a tartomány DNS-zónájába?',['Lassítja a monitor színét','Hibás, belülről nem megfelelő IP-re irányíthatja a klienseket','Eltávolítja az AD DS-t','Megváltoztatja a MAC-címet'],1,'A tartományvezérlő belső neve ne a VirtualBox WAN NAT-címére oldódjon fel.'],
    ['Mi a tartományba léptetés egyik legfontosabb előfeltétele?',['A kliens 8.8.8.8 DNS-t használjon','A kliens az AD DNS-szervert használja','A Windows tűzfal legyen végleg kikapcsolva','A kliens NAT-os adapteren legyen'],1,'Az AD szolgáltatásait DNS-en keresztül találja meg a kliens.'],
    ['Mi a sikeres tartományba léptetés utáni kötelező művelet?',['Lemez formázása','Újraindítás','DHCP eltávolítása','Új IP-címtartomány létrehozása'],1,'A tartományhoz csatlakozás általában újraindítást igényel.'],
    ['Hol látható a csatlakoztatott WIN7-01 számítógépfiókja?',['Active Directory Users and Computers','Windows Update','Task Scheduler → History','Disk Management'],0,'A számítógépobjektum az AD konzolban található.'],
    ['Mire használjuk az RRAS-t ebben a laborban?',['Címtárreplikációra','Kizárólag nyomtatásra','Útválasztásra és NAT-ra','Jelszóhashelésre'],2,'A Routing and Remote Access NAT és routing szolgáltatást ad.'],
    ['Melyik az RRAS NAT publikus (külső) interfésze?',['LAN2','WAN','LAN1','Loopback'],1,'A NAT internet felőli oldala a WAN.'],
    ['Mit jelent a kettős NAT ebben a virtuális laborban?',['Két DNS-zóna','A szerver NAT-ja és a VirtualBox NAT-ja egymás után működik','Két MAC-cím ugyanazon gépen','Két külön tartomány'],1,'A csomag a szerver, majd a VirtualBox címfordításán halad át.'],
    ['Mi a 255.255.255.128 maszk CIDR jelölése?',['/24','/25','/26','/23'],1,'A /25 maszk 25 darab egyest tartalmaz.'],
    ['Melyik a LAN1 hálózat a két /25 részre osztás után?',['192.168.15.0/25','192.168.15.128/25','10.0.2.0/24','192.168.16.0/25'],1,'A LAN1 a felső 192.168.15.128/25 tartomány.'],
    ['Melyik a LAN2 hálózat a két /25 részre osztás után?',['192.168.15.0/25','192.168.15.128/25','192.168.15.0/24','192.168.14.0/25'],0,'A LAN2 az alsó 192.168.15.0/25 tartomány.'],
    ['Mennyi a LAN2 szerver IP-je?',['192.168.15.254','192.168.15.255','192.168.15.126','192.168.15.128'],2,'LAN2 átjáró: 192.168.15.126.'],
    ['Mi a DHCP négyüzenetes címosztási folyamat helyes sorrendje?',['Request–Offer–Discover–Ack','Discover–Offer–Request–Acknowledge','Offer–Ack–Discover–Request','Acknowledge–Offer–Request–Discover'],1,'A DORA folyamat: Discover, Offer, Request, Acknowledge.'],
    ['Mire szolgál a DHCP scope?',['Tűzfalszabályt hoz létre','Egy hálózat kiosztható IP-címtartományát írja le','Átnevezi a szervert','Minden jelszót töröl'],1,'A hatókör az adott hálózat kiosztási paramétereit tartalmazza.'],
    ['Melyik cím az első a LAN1 DHCP-hatókörben?',['192.168.15.1','192.168.15.128','192.168.15.129','192.168.15.254'],2,'LAN1: 192.168.15.129–254, megfelelő kizárással.'],
    ['Melyik tartományt zárjuk ki LAN1-en a DHCP-kiosztásból?',['192.168.15.129–130','192.168.15.250–254','192.168.15.1–10','10.0.2.2–3'],1,'A LAN1 kizárás .250–.254.'],
    ['Melyik a LAN2 DHCP-kizárási tartománya?',['192.168.15.122–126','192.168.15.250–254','192.168.15.1–121','192.168.15.128–129'],0,'A LAN2 kizárás .122–.126.'],
    ['Melyik DHCP opció adja meg az alapértelmezett átjárót?',['006 DNS Servers','015 DNS Domain Name','003 Router','044 WINS/NBNS'],2,'003 Router az alapértelmezett átjáró.'],
    ['Melyik DHCP opció adja meg a DNS-kiszolgáló címét?',['003 Router','006 DNS Servers','015 DNS Domain Name','067 Bootfile Name'],1,'006 DNS Servers a DNS-kiszolgáló listája.'],
    ['Mi szükséges az AD-környezetben működő DHCP-kiszolgálóhoz?',['A tartományban történő Authorize engedélyezés','A WAN adapteren véletlen címkiosztás','Az összes tűzfal kikapcsolása','Két külön DNS-tartomány'],0,'Tartományi DHCP-szervert engedélyezni kell.'],
    ['Mivel rendel a DHCP-foglalás állandó címet egy klienshez?',['E-mail-cím','MAC-cím','Képernyőfelbontás','Felhasználó keresztneve'],1,'A DHCP Reservation hardverazonosító (MAC) alapján működik.']
  ]
};
