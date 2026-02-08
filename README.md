# sarif-to-xccdf

Convert SARIF (Static Analysis Results Interchange Format) to XCCDF (Extensible Configuration Checklist Description Format)

## Installation

```bash
npm install
```

## Usage

```javascript
import { convert } from 'sarif-to-xccdf'

const sarifData = { /* your SARIF data */ }
const xccdfData = convert(sarifData)
```

## Scripts

- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Lint code with StandardJS
- `npm run lint:fix` - Fix linting issues
- `npm run docs` - Generate JSDoc documentation

## License

MIT
