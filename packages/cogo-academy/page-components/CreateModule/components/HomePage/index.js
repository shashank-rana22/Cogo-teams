import { useState } from 'react';

import TestsList from '../TestsList';

function HomePage() {
	const [activeTab, setActiveTab] = useState('tests');

	return (
		<div>
			<TestsList activeTab={activeTab} setActiveTab={setActiveTab} />
		</div>
	);
}

export default HomePage;
