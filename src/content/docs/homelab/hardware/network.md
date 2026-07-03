---
title: Network
description: Details of the network hardware I use in my homelab.
---

The following devices are powering the network for my homelab:

| Device                                         | Usage                                                                                                                         |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Bell Home Hub 3000 (Sagemcom F@st 5566)        | ISP-provided modem & router. Currently used to convert the incoming fibre line into ethernet for use with downstream devices. |
| UniFi Dream Machine Pro                        | Router & UniFi controller.                                                                                                    |
| UniFi nanoHD                                   | Wireless access point.                                                                                                        |
| UniFi Standard 24-port PoE Switch (USW-24-POE) | Switch for all ethernet devices.                                                                                              |

```d2
direction: down

bell: "Bell Aliant (ISP)"
homehub: "Bell Home Hub 3000 (Sagemcom F@st 5566)"
udmpro: "UniFi Dream Machine Pro"
nanohd: "UniFi nanoHD"
usw24: "UniFi Standard 24-port PoE Switch (USW-24-POE)"
ethernet_clients: "Ethernet Clients"
wifi_clients: "WiFi Clients"

bell -> homehub: Fibre
homehub -> udmpro: Ethernet
udmpro -> usw24: SFP+ Direct Connect
usw24 -> nanohd: Ethernet
usw24 -> ethernet_clients: Ethernet
nanohd -> wifi_clients: WiFi
```
