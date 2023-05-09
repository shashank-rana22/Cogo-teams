import { useState } from 'react';

import tabs from '../config/tabs.json';

import List from './List';
import Tabs from './Tabs';

export default function BNSalvage() {
	const [activeTab, setActiveTab] = useState(tabs[0].name);

	return (
		<div>
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
			<List />
		</div>
	);
}
