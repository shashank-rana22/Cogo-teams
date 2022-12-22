import App from 'next/app';

export { default as dynamic } from 'next/document';
export { Html, Main, NextScript } from 'next/document';
export { default as Head } from 'next/head';
export { default as Link } from './components/Link';
export { default as Router } from 'next/router';
export { default as useRouter } from './hooks/useRouter';
export { default as RoutesProvider } from './components/RoutesProvider';
export { default as Document } from './components/Document';

export default App;
