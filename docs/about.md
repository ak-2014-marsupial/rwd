# ExternalDocViewer Feature

## Overview
The `ExternalDocViewer` is an autonomous module (Feature-level in FSD) designed to fetch, parse, and display Markdown-based documentation from an external source (or local public directory). It is fully isolated and can be easily ported between projects.

## Architecture (FSD)
Located at: `src/features/external-doc-viewer/`

- **model/**: Contains fetching logic (`useDocContent.js`) and technical-to-human title mapping (`docMapper.js`).
- **ui/**: UI components including the main `DocViewerModal` and the `MarkdownView` renderer.
- **config/**: Internal settings for API paths and base URLs.
- **index.js**: Public API for the module.

## Dependencies
- `react-markdown`: For client-side Markdown rendering.
- `shared/ui/Modal`: Uses the project's standard modal component.
- `shared/lib/notification`: Uses the global notification system for error reporting.

## Usage

### Integration Example
```jsx
import { DocViewerModal } from 'features/external-doc-viewer';
// ...
const [isOpen, setIsOpen] = useState(false);

<DocViewerModal 
    ruleKey="Spelling_CVC" 
    isOpen={isOpen} 
    onClose={() => setIsOpen(false)} 
/>
```

### Adding New Rules
1. Place your `.md` file in `public/docs/{Rule_Key}.md`.
2. Update the mapping in `model/docMapper.js` to provide a human-readable title:
   ```javascript
   'New_Rule_Key': 'My New Rule Title'
   ```

## Features
- **Online Check**: Automatically prevents opening the modal and shows a "No connection" notification if the user is offline.
- **Error Handling**: Gracefully handles 404 (Not Found) and fetch errors using the project's notification system.
- **Theming**: Styled using global HSL CSS variables, ensuring full support for Light and Dark modes.
- **Responsive**: The modal body is scrollable for long documents and fits various screen sizes.

## Configuration
The base URL for fetching documents is managed in `config/settings.js`. By default, it looks into the `public/docs/` folder in development mode.
