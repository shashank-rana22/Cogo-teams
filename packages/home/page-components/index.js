function Home() {
	console.log('Inside Home', process.env.NEXT_PUBLIC_REST_BASE_API_URL);
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}

export default Home;
