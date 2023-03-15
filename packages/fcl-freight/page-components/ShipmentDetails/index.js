import React, { useState } from 'react';

import Header from './Header';
import Tab from './Tabs';
import Timeline from './TimeLine';

function ShipmentDetails() {
	return (
		<div>
			<Header />
			<Timeline />
			<Tab />
		</div>
	);
}

export default ShipmentDetails;
