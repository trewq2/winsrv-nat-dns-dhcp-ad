/* Részletes, önálló tanulói útmutató és lépéshez kapcsolt illusztrációk */
window.LAB_GUIDES = {
  "prep": [
    {
      "actions": [
        "Állítsd le mindkét virtuális gépet, ha futnak.",
        "A VirtualBox Managerben jelöld ki a szervert, nyisd meg a Snapshots (Pillanatképek) nézetet, és készíts egy „Kezdőállapot” pillanatképet.",
        "Ugyanezt ismételd meg a Windows 7 géppel; ellenőrizd, hogy mindkét mentés megjelent."
      ],
      "images": []
    },
    {
      "actions": [
        "VirtualBox Manager → jobb kattintás a szerverre → Settings → Network.",
        "Adapter 1: jelöld be az Enable Network Adapter opciót, az Attached to listán válaszd a NAT-ot.",
        "Indítsd el a szervert; a Windowsban az ipconfig /all kimenetén ellenőrizd, melyik interfész kapta a NAT-címet."
      ],
      "images": [
        "15_01"
      ]
    },
    {
      "actions": [
        "A szerver virtuális gépén a VirtualBox Settings → Network → Adapter 2 részen kapcsold be az adaptert.",
        "Attached to: Internal Network; Name: pontosan LAN1. A név kis- és nagybetűi is egyezzenek a klienssel.",
        "Windowsban Win+R → ncpa.cpl; az új adapteren jobb kattintás → Rename → LAN1."
      ],
      "images": [
        "16_01",
        "17_02"
      ]
    },
    {
      "actions": [
        "A szerveren nyomd le a Win+R billentyűket, írd be: ncpa.cpl.",
        "A LAN1 adapteren jobb kattintás → Properties → Internet Protocol Version 4 (TCP/IPv4) → Properties.",
        "Jelöld be a kézi IP-címet: 192.168.15.254; maszk: 255.255.255.0; átjáró: üres.",
        "Elsődleges DNS: 127.0.0.1; OK → Close; ellenőrizd ipconfig /all paranccsal."
      ],
      "images": [
        "16_02",
        "16_03"
      ]
    },
    {
      "actions": [
        "A Windows 7 virtuális gépet kapcsold ki, majd VirtualBox → Settings → Network.",
        "Csak Adapter 1 legyen bekapcsolva: Attached to: Internal Network; Name: LAN1.",
        "Indítsd el a klienst, Win+R → ncpa.cpl: egyetlen használható hálózati adapter legyen."
      ],
      "images": [
        "18_03"
      ]
    },
    {
      "actions": [
        "Windows 7: Start → Vezérlőpult → Hálózati és megosztási központ → Adapterbeállítások módosítása.",
        "Helyi kapcsolat → Tulajdonságok → TCP/IPv4 → Tulajdonságok.",
        "IP: 192.168.15.2; maszk: 255.255.255.0; átjáró: 192.168.15.254; DNS: 192.168.15.254.",
        "OK → Bezárás, majd ipconfig /all paranccsal ellenőrizd."
      ],
      "images": []
    },
    {
      "actions": [
        "Szerver: Server Manager → Local Server → Computer name → Change; új név: SRV-DC1.",
        "Windows 7: Vezérlőpult → Rendszer → Speciális rendszerbeállítások / Beállítások módosítása → Számítógépnév → Módosítás; név: WIN7-01.",
        "Mindkét számítógépet indítsd újra, majd mindkettőn írd be: hostname."
      ],
      "images": [
        "17_04",
        "18_02"
      ]
    },
    {
      "actions": [
        "A Windows 7 parancssorában: ipconfig /all; keresd meg az IP-t, az átjárót és a DNS-t.",
        "Futtasd a ping 192.168.15.254 parancsot; a válasz a szerver LAN1 címéről érkezzen.",
        "Ha nincs válasz: VirtualBox LAN1 név, IP-maszk és helyi tűzfalszabályok ellenőrzése. Ne tiltsd le a teljes tűzfalat."
      ],
      "images": []
    }
  ],
  "domain": [
    {
      "actions": [
        "Jelentkezz be a szerverbe rendszergazdai fiókkal.",
        "Nyisd meg a Server Manager alkalmazást (a tálcáról vagy Start menüből).",
        "A Dashboard oldalon kattints az Add Roles and Features lehetőségre, majd Next."
      ],
      "images": [
        "19_01"
      ]
    },
    {
      "actions": [
        "Az Installation Type lapon válaszd a Role-based or feature-based installation beállítást.",
        "Server Selection: Select a server from the server pool, majd jelöld ki az SRV-DC1 szervert.",
        "Ellenőrizd a kiválasztott kiszolgáló nevét, aztán Next."
      ],
      "images": [
        "19_02",
        "20_01"
      ]
    },
    {
      "actions": [
        "A Server Roles lapon jelöld be az Active Directory Domain Services szerepkört.",
        "A felugró Add Roles and Features Wizard ablakban kattints az Add Features gombra.",
        "Ellenőrizd, hogy az AD DS kijelölve maradt; lépj tovább."
      ],
      "images": [
        "20_02",
        "21_01"
      ]
    },
    {
      "actions": [
        "A Features lapon hagyd meg a szükséges automatikus összetevőket.",
        "Az AD DS ismertető lapját olvasd el, majd Next → Confirm Installation Selections.",
        "Kattints az Install gombra; várd meg a Success / Installation succeeded üzenetet."
      ],
      "images": [
        "22_02",
        "23_03"
      ]
    },
    {
      "actions": [
        "A Server Manager jobb felső részén keresd meg a sárga figyelmeztető zászlót.",
        "Kattints rá, és válaszd a Promote this server to a domain controller hivatkozást.",
        "Ezzel indul az Active Directory Domain Services Configuration Wizard."
      ],
      "images": [
        "28_02"
      ]
    },
    {
      "actions": [
        "A Deployment Configuration oldalon válaszd az Add a new forest lehetőséget.",
        "A Root domain name mezőbe pontosan gyakorlat.local kerüljön.",
        "Next; ha hibát jelez, ellenőrizd a név elírását."
      ],
      "images": [
        "24_02"
      ]
    },
    {
      "actions": [
        "Domain Controller Options: Forest functional level és Domain functional level: Windows Server 2012.",
        "Maradjon bekapcsolva a DNS Server és a Global Catalog; RODC-t ne jelölj.",
        "Írj be és ismételj meg egy erős gyakorló DSRM-jelszót. A jelszót ne fényképezd le."
      ],
      "images": [
        "25_01"
      ]
    },
    {
      "actions": [
        "A DNS Options lapon megjelenő delegálási figyelmeztetés új erdőnél önmagában nem feltétlenül hiba.",
        "Az Additional Options lapon ellenőrizd: NetBIOS domain name = GYAKORLAT.",
        "A Paths oldalon a Database, Log files és SYSVOL mappákat hagyd alapértelmezett helyen."
      ],
      "images": [
        "26_01"
      ]
    },
    {
      "actions": [
        "Review Options: nézd át a tartománynevet és a funkcionális szintet.",
        "Prerequisites Check: ha piros hibát találsz, azt meg kell oldani; a sárga figyelmeztetést értelmezd.",
        "Kattints az Install-ra, majd a szerver újraindulása után jelentkezz be."
      ],
      "images": [
        "27_01"
      ]
    },
    {
      "actions": [
        "Bejelentkezés után nyisd meg újra a Server Manager alkalmazást.",
        "Tools → Active Directory Users and Computers; a bal oldalon legyen gyakorlat.local.",
        "Tools → DNS; ellenőrizd, hogy a tartományhoz tartozó zóna létrejött.",
        "Parancssorban futtasd a hostname, echo %USERDOMAIN% és nslookup gyakorlat.local utasítást."
      ],
      "images": [
        "28_02"
      ]
    }
  ],
  "dns": [
    {
      "actions": [
        "A szerveren indítsd el a Server Manager alkalmazást.",
        "Tools → DNS; a bal oldali fán keresd az SRV-DC1 kiszolgálót.",
        "Jobb kattintás a kiszolgálón → Properties."
      ],
      "images": [
        "29_02"
      ]
    },
    {
      "actions": [
        "DNS Properties → Interfaces fül.",
        "Válaszd az Only the following IP addresses opciót, és jelöld az aktuális LAN1 címet: 192.168.15.254.",
        "A WAN NAT-cím ne legyen hallgatózási cím; Apply → OK."
      ],
      "images": [
        "29_01"
      ]
    },
    {
      "actions": [
        "Win+R → ncpa.cpl; a WAN adapteren jobb kattintás → Properties → IPv4 → Properties → Advanced → DNS.",
        "Vedd ki a Register this connection’s addresses in DNS jelölést.",
        "A DNS-konzol Forward Lookup Zones → gyakorlat.local részén ellenőrizd az SRV-DC1 A-rekord címét; téves WAN-cím esetén csak azt a hibás rekordot távolítsd el."
      ],
      "images": [
        "31_02",
        "32_03"
      ]
    },
    {
      "actions": [
        "DNS konzolban SRV-DC1 → Properties → Forwarders.",
        "Edit → Add: egy engedélyezett külső DNS, például 1.1.1.1, és szükség esetén tartalék 8.8.8.8.",
        "OK után ellenőrizd, hogy a szerver WAN-oldalon ténylegesen eléri az internetet."
      ],
      "images": [
        "30_01"
      ]
    },
    {
      "actions": [
        "DNS Properties → Monitoring fül.",
        "Kapcsold be az egyszerű lekérdezési tesztet; kattints a Test Now gombra.",
        "Próbáld a rekurzív tesztet is; ha hibás, ellenőrizd a WAN elérését és a Forwarders beállítást."
      ],
      "images": [
        "30_04"
      ]
    },
    {
      "actions": [
        "DNS Manager → Forward Lookup Zones → gyakorlat.local.",
        "A jobb oldali ablakban keresd meg az SRV-DC1 gazdarekordot (Host A) és annak LAN1 címét.",
        "Bontsd ki a szolgáltatáshoz tartozó rekordokat; a tartományi szolgáltatás-felderítéshez _tcp, _udp és kapcsolódó struktúrák szükségesek."
      ],
      "images": [
        "32_03"
      ]
    },
    {
      "actions": [
        "Jobb kattintás a gyakorlat.local zónán → New Alias (CNAME).",
        "Alias name: www.",
        "Target host / Fully qualified domain name: SRV-DC1.gyakorlat.local; szükség esetén a Browse gombbal válaszd ki.",
        "OK, majd keresd meg a létrejött www rekordot."
      ],
      "images": [
        "33_01",
        "33_02",
        "33_05"
      ]
    },
    {
      "actions": [
        "Jobb kattintás a Reverse Lookup Zones elemen → New Zone.",
        "Primary Zone; ha kérdezi, tárold az AD-ben, és a replikációhoz válaszd a laborban megfelelő tartományi beállítást.",
        "IPv4 Reverse Lookup Zone → Network ID: 192.168.15.",
        "Dinamikus frissítés: domain esetén biztonságos frissítés; Finish."
      ],
      "images": [
        "35_01",
        "35_04",
        "36_01",
        "36_02"
      ]
    },
    {
      "actions": [
        "Nyisd meg a létrehozott fordított zónát.",
        "Jobb kattintás → New Pointer (PTR); Host IP number: 192.168.15.254.",
        "Host name: SRV-DC1.gyakorlat.local. Mentsd, majd ellenőrizd, hogy az IP-cím névhez vezet."
      ],
      "images": [
        "36_04",
        "36_05",
        "37_01"
      ]
    },
    {
      "actions": [
        "A szerveren nyiss egy parancssort; futtasd a kártyán látható mindhárom nslookup utasítást.",
        "Ellenőrizd, hogy a szervernév a belső IP-re mutat, a www alias feloldódik, a PTR pedig a szerver nevéhez vezet.",
        "A Windows 7 gépen a DNS-szerver legyen a 192.168.15.254, majd ismételd meg a teszteket."
      ],
      "images": [
        "37_01"
      ]
    }
  ],
  "join": [
    {
      "actions": [
        "Windows 7-en Start → keresőmező: cmd → Enter.",
        "Futtasd: ipconfig /all. Jegyezd fel a kliens IP-címét, az alapértelmezett átjárót és a DNS-t.",
        "Ha a DNS nem a 192.168.15.254, javítsd a hálózati adapter IPv4 beállítását."
      ],
      "images": []
    },
    {
      "actions": [
        "Parancssorban: ping 192.168.15.254.",
        "Utána: nslookup srv-dc1.gyakorlat.local 192.168.15.254.",
        "Ha a névfeloldás hibás, a csatlakozás előtt a DNS-zónát, a szerver IP-címét és a kapcsolatot javítsd."
      ],
      "images": []
    },
    {
      "actions": [
        "Vezérlőpult → Rendszer és biztonság → Rendszer.",
        "Számítógépnév, tartomány és munkacsoport beállításai → Beállítások módosítása → Módosítás.",
        "Tartomány (Domain) opció → írd be: gyakorlat.local → OK."
      ],
      "images": [
        "38_01"
      ]
    },
    {
      "actions": [
        "A csatlakozáshoz hitelesítési ablak nyílik.",
        "A laborban erre jogosult tartományi rendszergazdai fiókot add meg: például GYAKORLAT\\Administrator.",
        "A jelszó beírása után OK; a jelszót ne mentsd képernyőképre."
      ],
      "images": [
        "38_02"
      ]
    },
    {
      "actions": [
        "A „Welcome to the gyakorlat.local domain” üzenet után kattints OK-ra.",
        "Indítsd újra a Windows 7 gépet.",
        "A bejelentkezésnél válaszd a Másik felhasználó opciót, és jelentkezz be tartományi gyakorló fiókkal.",
        "Parancssor: whoami és echo %USERDOMAIN%."
      ],
      "images": [
        "38_03",
        "38_04"
      ]
    },
    {
      "actions": [
        "A szerveren Server Manager → Tools → Active Directory Users and Computers.",
        "A tartomány alatt nyisd meg a Computers tárolót.",
        "Keresd meg a WIN7-01 gépfiókot. Készíts saját képernyőképet úgy, hogy a tartomány és gépnév jól látszódjon."
      ],
      "images": []
    }
  ],
  "nat": [
    {
      "actions": [
        "A szerveren Server Manager → Manage → Add Roles and Features.",
        "A Server Roles lapon jelöld a Remote Access szerepkört; a Role Services részben a Routing szolgáltatást.",
        "Fogadd el a szükséges kiegészítő komponenseket, majd Install.",
        "A telepítés végén Tools → Routing and Remote Access."
      ],
      "images": [
        "39_01",
        "40_02",
        "41_01"
      ]
    },
    {
      "actions": [
        "A Routing and Remote Access konzolban a szerver nevén jobb kattintás.",
        "Válaszd: Configure and Enable Routing and Remote Access.",
        "A varázslóban a Network address translation (NAT) lehetőséget válaszd."
      ],
      "images": [
        "43_03",
        "44_02"
      ]
    },
    {
      "actions": [
        "A külső / public interface listában a WAN adaptert jelöld ki (a VirtualBox NAT felé néző kártya).",
        "Kapcsold be az internetkapcsolathoz tartozó NAT szolgáltatást azon az adapteren.",
        "A LAN1 adaptert nem szabad public szerepűnek kiválasztani."
      ],
      "images": [
        "44_03"
      ]
    },
    {
      "actions": [
        "RRAS → IPv4 → NAT. Ellenőrizd a listában a WAN és a LAN1 szerepét.",
        "WAN: Public interface, NAT enabled. LAN1: Private interface.",
        "Ha LAN1 hiányzik, New Interface → LAN1 → Private interface connected to private network."
      ],
      "images": [
        "45_01"
      ]
    },
    {
      "actions": [
        "A Windows 7 kliens egyetlen hálózati adapterén az átjáró: 192.168.15.254.",
        "A DNS-szerver: 192.168.15.254. Az IP még statikus 192.168.15.2/24.",
        "Előbb a szerverről teszteld az internetet, majd a kliensről."
      ],
      "images": []
    },
    {
      "actions": [
        "Windows 7 parancssorban először ping 192.168.15.254.",
        "Próbáld a ping 1.1.1.1 címet, majd az nslookup www.microsoft.com 192.168.15.254 parancsot.",
        "Végül tracert 1.1.1.1; ha az ICMP blokkolt, ellenőrizd más módszerrel is az elérést."
      ],
      "images": []
    },
    {
      "actions": [
        "A szerveren nyisd meg az RRAS → IPv4 → NAT ágat.",
        "Az ablakban legyen látható a WAN és a LAN1, a public/private kiosztás és a NAT bekapcsolása.",
        "A saját konzolodról készíts PNG-képet a leadási ellenőrzőlistához."
      ],
      "images": [
        "45_01"
      ]
    }
  ],
  "subnet": [
    {
      "actions": [
        "Mielőtt megváltoztatod az IP-címeket, ellenőrizd, hogy az AD, DNS és NAT működik.",
        "Kapcsold ki a gépeket, készíts mindkét VM-ről pillanatképet „AD-DNS-NAT kész” néven.",
        "Ha az átállítás elakad, erre az állapotra tudsz visszatérni."
      ],
      "images": []
    },
    {
      "actions": [
        "Windows 7-en Win+R → ncpa.cpl → Helyi kapcsolat → IPv4 tulajdonságok.",
        "IP-cím: 192.168.15.130, maszk: 255.255.255.128; átjáró: 192.168.15.254; DNS: 192.168.15.254.",
        "A két gép eltérő maszkja miatt a csatlakozás átmenetileg megszakadhat; a következő lépés rögtön a szerver LAN1 maszkjának módosítása."
      ],
      "images": [
        "48_03"
      ]
    },
    {
      "actions": [
        "Szerveren Win+R → ncpa.cpl → LAN1 → IPv4 tulajdonságok.",
        "Az IP marad 192.168.15.254, a maszk viszont 255.255.255.128 lesz.",
        "A szerver LAN1 átjáróját hagyd üresen.",
        "A Windows 7-ről ellenőrizd a ping 192.168.15.254 parancsot."
      ],
      "images": [
        "48_01",
        "48_02"
      ]
    },
    {
      "actions": [
        "Állítsd le a szerver virtuális gépét.",
        "VirtualBox → Settings → Network → Adapter 3: Enabled, Attached to: Internal Network, Name: LAN2.",
        "Indítsd el a szervert, Win+R → ncpa.cpl; az új adaptert nevezd át LAN2-re."
      ],
      "images": []
    },
    {
      "actions": [
        "Szerveren LAN2 adapter → Properties → IPv4 → Properties.",
        "IP: 192.168.15.126; maszk: 255.255.255.128; default gateway: üres.",
        "Elsődleges DNS: a helyi DNS (127.0.0.1), majd OK.",
        "Ellenőrizd, hogy a három adapter közül csak a WAN rendelkezik alapértelmezett átjáróval."
      ],
      "images": [
        "48_03"
      ]
    },
    {
      "actions": [
        "Server Manager → Tools → DNS → SRV-DC1 → Properties → Interfaces.",
        "Jelöld ki mindkét belső címet: 192.168.15.254 (LAN1) és 192.168.15.126 (LAN2).",
        "A WAN NAT-cím ne legyen kiválasztva; majd Apply és OK."
      ],
      "images": [
        "49_01",
        "49_02"
      ]
    },
    {
      "actions": [
        "A szerver parancssorában futtasd az ipconfig /all és route print utasítást.",
        "Ellenőrizd: 192.168.15.128/25 (LAN1) és 192.168.15.0/25 (LAN2).",
        "A kliens az első alhálózatban 192.168.15.130/25; próbáld pingelni a szervert."
      ],
      "images": []
    }
  ],
  "dhcp": [
    {
      "actions": [
        "Server Manager → Add Roles and Features → Role-based installation.",
        "Server Roles: DHCP Server → Add Features → Next → Install.",
        "A telepítés befejezése után a felső zászló menüből indítsd a Complete DHCP configuration feladatot."
      ],
      "images": [
        "49_03",
        "50_02"
      ]
    },
    {
      "actions": [
        "A DHCP Post-Install Configuration ablakban a jogosításhoz a megfelelő tartományi adminisztrátori hitelesítést add meg.",
        "Commit / Finish, majd Server Manager → Tools → DHCP.",
        "Bontsd ki a kiszolgálót és az IPv4 részt."
      ],
      "images": [
        "50_03",
        "50_04",
        "51_01"
      ]
    },
    {
      "actions": [
        "DHCP konzol → IPv4 → jobb kattintás → New Scope.",
        "Scope Name: LAN1; Next → Start IP: 192.168.15.129, End IP: 192.168.15.254.",
        "Subnet mask: 255.255.255.128; a hálózat 192.168.15.128/25."
      ],
      "images": [
        "52_01",
        "52_03",
        "52_04"
      ]
    },
    {
      "actions": [
        "A New Scope Wizard Exclusions and Delay lapján Add gomb.",
        "Start IP: 192.168.15.250; End IP: 192.168.15.254.",
        "Azért zárjuk ki, hogy a szerver .254-es és néhány fenntartott cím ne kerülhessen véletlenül klienshez."
      ],
      "images": [
        "52_05"
      ]
    },
    {
      "actions": [
        "A Configure DHCP Options kérdésnél válaszd a Yes-t.",
        "003 Router: 192.168.15.254; Add.",
        "006 DNS Servers: 192.168.15.254; Add; a 015 DNS Domain Name: gyakorlat.local.",
        "A végén Activate this scope → Yes."
      ],
      "images": [
        "52_06",
        "52_07",
        "53_01",
        "53_06"
      ]
    },
    {
      "actions": [
        "DHCP konzol → IPv4 → New Scope (második alkalom).",
        "Név: LAN2; Start IP: 192.168.15.1; End IP: 192.168.15.126.",
        "Subnet mask: 255.255.255.128; a második hálózat 192.168.15.0/25."
      ],
      "images": [
        "52_03",
        "52_04"
      ]
    },
    {
      "actions": [
        "Exclusions: Start 192.168.15.122, End 192.168.15.126; Add.",
        "003 Router: 192.168.15.126.",
        "006 DNS Servers: 192.168.15.126; 015 DNS Domain Name: gyakorlat.local.",
        "Activate this scope → Yes."
      ],
      "images": [
        "54_02",
        "54_03"
      ]
    },
    {
      "actions": [
        "DHCP konzolban kattints jobb gombbal a szerverre → Authorize; szükség esetén Refresh.",
        "A szerver Properties / Advanced / Bindings menüpontjában ellenőrizd a DHCP-kötést.",
        "LAN1 és LAN2 legyen engedélyezve, WAN ne; a Windows DHCP ne válaszoljon a VirtualBox NAT hálózatán."
      ],
      "images": [
        "50_04"
      ]
    },
    {
      "actions": [
        "Windows 7 → Win+R → ncpa.cpl → Helyi kapcsolat → IPv4.",
        "Jelöld be az Obtain an IP address automatically és Obtain DNS server address automatically lehetőséget.",
        "Parancssorban: ipconfig /release, majd ipconfig /renew és ipconfig /all.",
        "Az új cím 192.168.15.129–249 közötti legyen; alapértelmezett átjáró és DNS: 192.168.15.254."
      ],
      "images": [
        "55_02"
      ]
    },
    {
      "actions": [
        "Windows 7 parancssorában futtasd: getmac vagy ipconfig /all; jegyezd fel a MAC-címet.",
        "Szerver DHCP konzol → LAN1 → Address Leases, keresd meg a WIN7-01-hez tartozó bérletet.",
        "Jobb kattintás → Add to Reservation; ellenőrizd a MAC és a rögzített IP helyességét."
      ],
      "images": [
        "55_03",
        "56_03",
        "56_04"
      ]
    },
    {
      "actions": [
        "Előbb írd fel és fényképezd le a működő LAN1 DHCP-kiosztást.",
        "Állítsd le a Windows 7 VM-et; VirtualBox → Network → Adapter 1 → Internal Network: LAN2.",
        "Indítsd el a klienst, kérj DHCP-címet ipconfig /release majd /renew paranccsal.",
        "Várható cím: 192.168.15.1–121, átjáró/DNS: 192.168.15.126. Teszt végén állítsd vissza LAN1-re."
      ],
      "images": []
    },
    {
      "actions": [
        "A DHCP konzolban mutasd a LAN1 és LAN2 hatóköröket, a 003/006/015 opciókat és a Reservation bejegyzést.",
        "DNS konzolban ellenőrizd az A, CNAME és PTR rekordokat; RRAS-ben a WAN Public NAT-ot.",
        "A Windows 7 parancssorban újra ellenőrizd az ipconfig /all, nslookup és whoami eredményét."
      ],
      "images": [
        "55_02"
      ]
    }
  ],
  "finish": [
    {
      "actions": [
        "Windows 7 parancssor: ipconfig /all → ellenőrizd a DHCP-kiosztást.",
        "Pingeld a belső átjárót; ellenőrizd nslookup paranccsal a tartományvezérlő nevét.",
        "whoami → ellenőrizd, hogy tartományi felhasználóként jelentkeztél be."
      ],
      "images": []
    },
    {
      "actions": [
        "Szerveren Server Manager → Tools → DNS: gyakorlat.local zóna, SRV-DC1 rekord.",
        "DHCP: LAN1 és LAN2 hatókörök és az opciók.",
        "Routing and Remote Access: IPv4 → NAT, WAN Public és belső LAN-ok Private."
      ],
      "images": [
        "32_03",
        "43_03",
        "55_02"
      ]
    },
    {
      "actions": [
        "Windows 7-en Start → Képmetsző (Snipping Tool), vagy PrtScn → Paint.",
        "Válaszd ki a lényeges ablakot, a fájl mentési típusa legyen PNG.",
        "A „Leadandó képernyőképek” felületen a megfelelő fájlnevekkel jelöld, mit készítettél el."
      ],
      "images": []
    },
    {
      "actions": [
        "Menj vissza a kimaradt gyakorlati modulokra, és ellenőrizd a ki nem pipált lépéseket.",
        "Nézd át, hogy a saját rendszered valóban a megadott beállításokat használja.",
        "A pipák nem automatikus ellenőrzések: a tényleges működést is mutasd meg."
      ],
      "images": []
    },
    {
      "actions": [
        "Nyisd meg a 40 kérdéses zárótesztet.",
        "Írd be a nevet és az osztályt, válaszolj a kérdésekre, majd véglegesítsd a tesztet.",
        "Az eredményoldalon kattints az Eredmény mentése PDF-be gombra, nyomtatásnál válaszd a Mentés PDF-ként célt."
      ],
      "images": []
    },
    {
      "actions": [
        "Egy mappába gyűjtsd a saját képernyőképeket (PNG) és a névvel ellátott teszt PDF-et.",
        "Ellenőrizd, hogy a képeken ne szerepeljen jelszó vagy érzékeny személyes adat.",
        "A tanár által megadott felületen küldd be az összes szükséges fájlt."
      ],
      "images": []
    }
  ]
};
