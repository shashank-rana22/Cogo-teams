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
