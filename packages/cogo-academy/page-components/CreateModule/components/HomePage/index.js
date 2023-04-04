import { useState } from 'react';

import TestsList from '../TestsList';

function HomePage({ testModuleTab }) {
	const [activeTab, setActiveTab] = useState(testModuleTab || 'tests');

	return (
		<div>
			<TestsList activeTab={activeTab} setActiveTab={setActiveTab} />
		</div>
	);
}

export default HomePage;
