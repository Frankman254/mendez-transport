## QR Generator Window

Reusable React window/panel for generating QR codes with:

- content or link input
- center icon selection
- custom icon upload
- QR size control
- PNG download

### Dependencies

This module expects:

- `react`
- `qrcode.react`
- `lucide-react`

### Files

- `QrGeneratorWindow.jsx`
- `qrGeneratorIconOptions.js`
- `index.js`

### Quick usage

```jsx
import { useState } from 'react';
import { QrGeneratorWindow, defaultQrCenterIcons } from './qr-generator-window';

export default function ExamplePage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open QR Generator
      </button>

      <QrGeneratorWindow
        open={open}
        onClose={() => setOpen(false)}
        title="Generate QR"
        initialValue="https://example.com"
        iconOptions={defaultQrCenterIcons}
      />
    </>
  );
}
```

### Optional props

- `open`
- `onClose`
- `title`
- `description`
- `initialValue`
- `initialSize`
- `iconOptions`
- `defaultIconId`

### `iconOptions` format

```js
[
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    src: 'data:image/svg+xml;base64,...',
  },
];
```

### Notes

- The component is self-contained and not wired into the current app.
- If you want to use project-specific brand icons, replace or extend `defaultQrCenterIcons`.
