import React, { useState } from 'react';

import Header from '../Header';
import Timeline from '../TimeLine';
import Tab from '../Tabs'

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
