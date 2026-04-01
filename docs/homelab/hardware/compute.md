---
title: Compute
description: Details of the compute hardware I use in my homelab.
---

My homelab consists of the following physical systems:

| Hostname    | OS                  | Model                         | CPU                       |    Memory |   Storage |
| ----------- | ------------------- | ----------------------------- | ------------------------- | --------: | --------: |
| `aphrodite` | Proxmox PVE         | Dell Optiplex 3040 Micro      | Intel Core i5-6500T       |      16GB |     480GB |
| `apollo`    | Proxmox PVE         | Dell Optiplex 3040 Micro      | Intel Core i5-6500T       |      16GB |     480GB |
| `ares`      | openSUSE Tumbleweed | Framework Desktop             | AMD Ryzen AI Max+ 395     |     128GB |       2TB |
| `asteria`   | Proxmox PVE         | Lenovo ThinkCentre M715 Tiny  | AMD Ryzen 5 PRO 2400GE    |      32GB |     512GB |
| `astraeus`  | Proxmox PVE         | Lenovo ThinkStation P330 Tiny | Intel Core i7-8700T       |      64GB |     512GB |
| `eos`       | Proxmox PVE         | Lenovo ThinkStation P330 Tiny | Intel Core i7-8700T       |      64GB |     512GB |
| `helios`    | Proxmox PVE         | Lenovo ThinkStation P330 Tiny | Intel Core i7-8700T       |      64GB |     512GB |
| `selene`    | Proxmox PVE         | Lenovo ThinkStation P330 Tiny | Intel Core i7-8700T       |      64GB |     512GB |
| `titan`     | Proxmox PVE         | Lenovo ThinkStation P330 Tiny | Intel Core i7-8700T       |      64GB |     512GB |
| `zeus`      | Proxmox PVE         | Lenovo ThinkCentre M93p Tiny  | Intel Xeon E3-1265L V2    |      16GB |     480GB |
| **Total**   |                     |                               | **62 cores, 116 threads** | **528GB** | **6.5TB** |

All Proxmox systems are joined to a single cluster, which is used to run VMs for the majority of my workloads (most being [Kubernetes nodes](../cluster/nodes.md))