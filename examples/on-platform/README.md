# On Platform

This example follows the standard on-platform folder structure and showcases:

- Custom Label Resolving (to `CustomLabels.labels-meta.xml`)
- Static Resource Resolving (to `./force-app/main/default/staticresources/${RESOURCE_NAME}`)
- Apex Mocking (to local mocks)

> [!note]
> This uses the [Single JavaScript file per Apex Class](https://lwc.garden/packages/apex/#single-javascript-file-per-apex-class) method for apex mocking. You may choose to use the [Single JavaScript file per Apex Method](https://lwc.garden/packages/apex/#single-javascript-file-per-apex-method) pattern instead.
