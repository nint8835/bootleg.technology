---
title: Storage
description: Details of the storage hardware I use in my homelab.
---

For my homelab, the majority of storage for workloads is provided by my NAS - a Synology DS920+, with the following disks:

- 4x 4TB Seagate Ironwolf (ST4000VN008-2DR166)
    - Running in Synology Hybrid Raid in 1 drive fault tolerance mode (equivalent to RAID 5)
    - 12TB usable capacity
- 2x 1TB Samsung 970 Evo Plus
    - Running in RAID 1
    - 1TB usable capacity
    - Used as a SSD cache for the main volume
