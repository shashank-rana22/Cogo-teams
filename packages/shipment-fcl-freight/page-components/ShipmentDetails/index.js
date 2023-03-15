import React, { useState } from 'react';

import Header from './Header';
import Tab from './Tabs';
import Timeline from './TimeLine';
import { ShipmentChat } from '@cogoport/shipment-chat';

function ShipmentDetails() {
	return (
		<div>
			<ShipmentChat />
			<Header />
			<Timeline />
			<Tab />
		</div>
	);
}

export default ShipmentDetails;
