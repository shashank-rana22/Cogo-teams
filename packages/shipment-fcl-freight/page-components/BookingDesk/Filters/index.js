import { Input, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import { tab_filter_mapping } from '../../../utils/bookingDeskUtils/tabs_mapping';

import styles from './styles.module.css';

const serviceOptions = [
	{
		label : 'FCL',
		value : 'fcl_freight',
	},
	{
		label : 'LCL',
		value : 'lcl_freight',
	},

];

function ShipmentFilters({
	hookSetters = () => {},
	activeTab = '',
	setActiveTab = () => {},
	currentShipment = '',
	setCurrentShipment = () => {},
	visibleTabs = [],
}) {
	const [value, setValue] = useState('');

	const handleRefetch = () => {
		const filters = {
			shipment_type : currentShipment,
			...tab_filter_mapping(activeTab),
			q             : value || undefined,
			page          : 1,
		};

		hookSetters.setFilters(filters);
	};
	useEffect(() => {
		handleRefetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, activeTab, currentShipment]);

	const handleShipmentChange = (val) => {
		if (!visibleTabs.includes(activeTab)) {
			setActiveTab(visibleTabs[0]?.name);
		}

		setCurrentShipment(val);
	};
	return (
		<div className={styles.container}>
			<div className={styles.select_container}>
				<Select
					placeholder="Select Service"
					options={serviceOptions}
					value={currentShipment}
					onChange={handleShipmentChange}
					className={styles.select_class}
				/>
			</div>
			<div className={styles.search_box}>
				<Input
					name="q"
					size="lg"
					placeholder="Search by SID, BL, Container No, Booking Number"
					value={value}
					onChange={(e) => setValue(e)}
					prefix={<IcMSearchlight width={20} height={20} />}
					className={styles.input_class}
				/>
			</div>
			<div>
				{/* <ScopeSelect style={{ height: 'auto' }} /> */}
			</div>
		</div>
	);
}
export default ShipmentFilters;
