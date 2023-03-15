import CreateQuestionSet from '../CreateModule/components/CreateQuestionSet';
import CreateTest from '../CreateModule/components/CreateTest';
import Header from '../Header';
import TestsList from '../TestsList';

function HomePage() {
	return (
		<div>
			<Header />
			{/* <Analytics /> */}
			<TestsList />
		</div>
		// <CreateQuestionSet />
		// <CreateTest />
	);
}
export default HomePage;
