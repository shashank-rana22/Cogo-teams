import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import { tab_filter_mapping } from '../../../utils/bookingDeskUtils/tabs_mapping';

import styles from './styles.module.css';

function ShipmentFilters({
	hookSetters = () => {},
	activeTab = '',

}) {
	const [value, setValue] = useState('');

	const handleRefetch = () => {
		const filters = {
			shipment_type : 'fcl_freight',
			...tab_filter_mapping(activeTab),
			q             : value || undefined,
			page          : 1,
		};

		hookSetters.setFilters(filters);
	};
	useEffect(() => {
		handleRefetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, activeTab]);

	return (
		<div className={styles.container}>

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
