// import React, { useState } from 'react';

// import CreateQuestionSet from '../CreateModule/components/CreateQuestionSet';
import CreateTest from '../CreateNewTest';
// import Header from '../Header';
// import TestsList from '../TestsList';

function HomePage() {
	// const [activeTab, setActiveTab] = useState('tests');

	return (
		<>
			{/* <Header activeTab={activeTab} /> */}
			{/* <TestsList activeTab={activeTab} setActiveTab={setActiveTab} /> */}
			<CreateTest />
			{/* <CreateQuestionSet /> */}
			{/* <Analytics /> */}
		</>
	);
}
export default HomePage;
