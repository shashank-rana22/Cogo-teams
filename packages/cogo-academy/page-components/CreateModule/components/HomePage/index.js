import { useState } from 'react';

import Header from '../Header';
import TestsList from '../TestsList';

function HomePage() {
	const [activeTab, setActiveTab] = useState('tests');

	return (
		<div>
			<Header activeTab={activeTab} />
			<TestsList activeTab={activeTab} setActiveTab={setActiveTab} />
		</div>
	);
}

export default HomePage;
