import App from 'next/app';

export { default as dynamic } from 'next/dynamic';
export { Html, Main, NextScript } from 'next/document';
export { default as Head } from 'next/head';
export { default as Link } from './components/Link';
export { default as Router } from 'next/router';
export { default as Image } from 'next/image';
export { default as useRouter } from './hooks/useRouter';
export { default as Document } from './components/Document';

export default App;
