/* eslint-disable max-len */
import Document, {
	Head, Html, Main, NextScript,
} from 'next/document';

import GTM from './GtmHandler';

function CogoDocument() {
	// const setInitialTheme = `
	//   function getUserPreference() {
	//     if(window.localStorage.getItem('theme')) {
	//       return window.localStorage.getItem('theme')
	//     }
	//     return window.matchMedia('(prefers-color-scheme: dark)').matches
	//       ? 'dark'
	//       : 'light'
	//   }
	//   document.body.dataset.theme = getUserPreference();
	// `;

	return (
		<Html>
			<Head>
				{process.env.NEXT_PUBLIC_GTM_ID && <GTM gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
					rel="stylesheet"
				/>
				<link rel="shortcut icon" href="/v2/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/v2/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/v2/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/v2/favicon-16x16.png" />
			</Head>
			<body>
				{/* <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} /> */}
				<Main />
				<NextScript />
				{process.env.NEXT_PUBLIC_GTM_ID && (
					<GTM.NoScript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
				)}
			</body>
		</Html>
	);
}

CogoDocument.getInitialProps = async (ctx) => {
	const initialProps = await Document.getInitialProps(ctx);

	return { ...initialProps };
};

export default CogoDocument;
