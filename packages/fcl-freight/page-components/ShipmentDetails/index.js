import React, { useState } from 'react';

import Header from '../Header';
import Tab from '../Tabs';
import Timeline from '../TimeLine';

function ShipmentDetails() {
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<div>
			<Header />
			<Timeline />
			<Tab />
		</div>
	);
}

export default ShipmentDetails;
