import CreateNewTest from '../CreateModule/components/CreateNewTest/components/TestDetails';
import CreateQuestionSet from '../CreateModule/components/CreateQuestionSet';
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
