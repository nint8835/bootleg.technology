---
title: Nodes
description: Details of the nodes that make up my Kubernetes cluster.
---

My Kubernetes cluster consists of the following nodes, all running as VMs on my [Proxmox cluster](../hardware/compute.md).

Control plane nodes are dedicated to running just the core Kubernetes services (`kube-apiserver`, `kube-controller-manager`, `kube-scheduler`, and `etcd`) as well as a few misc. DaemonSets. All actual workloads are only scheduled on the worker nodes, to ensure the control plane remains stable.

| Name                  | Role          |          CPU |     Memory |      Disk | Host        |
| --------------------- | ------------- | -----------: | ---------: | --------: | ----------- |
| `k8s-control-plane-1` | Control plane |      2 cores |        4GB |      80GB | `aphrodite` |
| `k8s-control-plane-2` | Control plane |      2 cores |        4GB |      80GB | `apollo`    |
| `k8s-control-plane-3` | Control plane |      2 cores |        4GB |      80GB | `zeus`      |
| `k8s-worker-1`        | Worker        |      2 cores |        8GB |      80GB | `aphrodite` |
| `k8s-worker-2`        | Worker        |      2 cores |        8GB |      80GB | `apollo`    |
| `k8s-worker-3`        | Worker        |      2 cores |        8GB |      80GB | `zeus`      |
| `k8s-worker-4`        | Worker        |      2 cores |        8GB |      80GB | `helios`    |
| `k8s-worker-5`        | Worker        |      2 cores |        8GB |      80GB | `eos`       |
| **Total**             |               | **16 cores** |   **52GB** | **640GB** |             |
