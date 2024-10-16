---
title: Running Gokrazy Images on macOS with UTM
description: How to use UTM to test your Gokrazy images locally on a Mac.
date: 2024-06-13
draft: true
authors:
  - nint8835
---

- Create new Gokrazy project if you haven't already
    - `gok new`
- Set up an x86_64 kernel, according to the [Gokrazy QEMU instructions](https://gokrazy.org/userguide/qemu/#edit-the-instance-configuration)
  ``` json hl_lines="3 4"
  {
    "Hostname": "utm-example",
    "KernelPackage": "github.com/rtr7/kernel",
    "FirmwarePackage": "github.com/rtr7/kernel",
    // ...
  }
  ```
- Build an image file, according to the [Gokrazy QEMU instructions](https://gokrazy.org/userguide/qemu/#build-the-image)
    - `GOARCH=amd64 gok overwrite --full virtual.img --target_storage_bytes 4294967296`
- In UTM, hit ++cmd+n++
- Since this is an x86_64 image, select Emulate
- For the type of Operating System, select Other
- For Boot Device, select None
- Keep architecture and system as the default. Tweak memory & CPU as desired
- Provide any value for the storage size - we'll be deleting this drive anyway
- Name the VM and tick "Open VM Settings"
- Under drives, right click and delete the existing IDE Drive entry
- Under drives, click new, then import. When prompted, select the img file you created with gok earlier
- You should now be able to launch the VM and have it boot to the status screen (assuming you have `github.com/gokrazy/fbstatus` installed)
- To be able to update the VM, add the VM's IP as the `Hostname` value under the `Update` field
  ```json hl_lines="5"
  {
    // ...
    "Update": {
      "HTTPPassword": "really-really-good-password",
      "Hostname": "192.168.64.2"
    },
    // ...
  }
  ```