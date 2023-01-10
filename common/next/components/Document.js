import Document, {
	Head, Html, Main, NextScript,
} from 'next/document';

function CogoDocument() {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
				/>
				<link rel="shortcut icon" href="/v2/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/v2/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/v2/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/v2/favicon-16x16.png" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

CogoDocument.getInitialProps = async (ctx) => {
	const initialProps = await Document.getInitialProps(ctx);

	return { ...initialProps };
};

export default CogoDocument;
