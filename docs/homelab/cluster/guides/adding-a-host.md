---
title: Adding a Host
description: Guide on adding a new host to the Proxmox cluster.
---

1. Boot the new host from an install USB for the latest version of Proxmox
2. Follow the install process with the defaults except for:
    - Timezone: `America/St_Johns`
    - Password: Root password from 1Password
    - Email: `riley@rileyflynn.me`
    - Hostname: `<NAME>.hosts.bootleg.technology`
3. On install completion, make note of the IP listed
4. In the UniFi console, locate that device and assign a fixed IP and a name
5. In the `ops` repository, add the name and IP to the `proxmox_hosts` list in `terraform/hosts.tf`
6. Perform a `terraform apply`
7. Navigate to `https://<NAME>.hosts.bootleg.technology:8006`. Log in with the details from 1Password.
8. Navigate to the repository list. Add the `No-Subscription` repository and remove the `Enterprise` repository.
9. Refresh the update list and install all pending updates
10. Once complete, reboot the node
11. From an existing node, copy cluster join information. Use it to join the new node to the cluster.