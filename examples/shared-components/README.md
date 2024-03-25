# Shared Components

These components are shared across the examples here.

This folder is symlinked to each individual folder. Each example should configure the `./shared-components` folder as a component path source.

```
{
  "modules": [
    {
      "dir": "./.garden/components",
      "namespace": "garden"
    },
    {
      "dir": "./shared-components",
      "namespace": "example"
    }
  ]
}

```

> NOTE: LWC doesn't like `.` in LWC folder sources. Symlinking is done to a non-`.` prefixed folder.
