import CoreLayout from './CoreLayout';

function App({ Component, pageProps }) {
	return (
		<CoreLayout>
			<Component {...pageProps} />
		</CoreLayout>
	);
}

export default App;
