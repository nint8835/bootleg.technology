---
title: Adding a Node
description: Guide on adding a new node to the Talos Kubernetes cluster.
---
!!! todo
    Look into terraforming this, rather than making it a manual process.

1. In Proxmox, click "Create VM"
2. For general settings, configure the following:
    - Node: pick the host to put this node on
    - VM ID: leave default
    - Name: `k8s-control-plane-<node number>` or `k8s-worker-<node number>`, depending on the node role
    - Resource Pool: `Kubernetes`
3. For OS, configure the following:
    - Use CD/DVD disc image file (iso)
    - Storage: `mnemosyne-isos`
    - ISO image: `talos-linux-1.8.0-metal-amd64.iso`
    - Type: `Linux`
    - Version: `6.x - 2.6 Kernel`
4. For System, leave all settings as default.
5. For Disks, configure the following:
    - Bus/Device: `SCSI0`
    - Storage: `local-lvm`
    - Disk size (GiB): `80`
    - Cache: `Default (No cache)`
6. For CPU, configure the following:
    - Sockets: `1`
    - Cores: `2`
    - Type: `x86-64-v2-AES`
7. For Memory, configure the memory amount to be `4096`
8. For Network, leave all settings default except for VLAN Tag, which should be `8`
9. On the confirmation page, check "Start after created", and click Finish
10. On the newly-created VM, open the console. Wait for the VM to finish booting and the stage to be "Maintenance". Take note of the listed IP address on the Talos dashboard.
11. Open the UniFi console and navigate to the client list. Locate the newly-added client with the IP from Talos.
12. Click the client, and go to Settings. Configure the following:
    - Name: Name of the VM you set in Proxmox
    - Fixed IP: on
    - IP Address: the next IP address in the relevant CIDR block for the node type
13. Click Apply Changes
14. Return to Proxmox and reset the VM, to cause Talos to pick up the new IP address assigned from UniFi.
15. Open `terraform/cluster.tf` in the Ops repo, and add the new node to the relevant local.
    - For example, for the first worker node:
    ```terraform hl_lines="8"
    locals {
        control_plane_nodes = {
            k8s-control-plane-1 = "10.8.1.1"
            k8s-control-plane-2 = "10.8.1.2"
            k8s-control-plane-3 = "10.8.1.3"
        }
        worker_nodes = {
            k8s-worker-1 = "10.8.2.1"
        }
    }
    ```
16. Once the VM is started up and in "Maintenance" state again, run `terraform apply`. This will kick off OS installation and will take roughly 5 minutes to complete.

At this point, the node should now show up in `kubectl get nodes`, and be ready for use.

If necessary, after upgrading use `talosctl upgrade` to upgrade the new nodes to a matching minor version with the rest of the nodes.
