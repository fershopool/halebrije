import { renderToString } from 'react-dom/server';
import { App } from './App';
export { pages } from './data/pages';
export { location, addressDetails } from './data/locations';
export { brand } from './config/brand';
export function render(path: string) {
  return renderToString(<App path={path} />);
}
