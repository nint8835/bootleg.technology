# Upgrading Flux

To upgrade Flux, run the following command and commit the resulting changes:

```bash
flux install \
    --export \
    --components-extra=image-reflector-controller,image-automation-controller \
    > ./cluster/flux-system/gotk-components.yaml
```