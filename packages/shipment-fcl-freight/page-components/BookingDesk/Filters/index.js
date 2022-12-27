import React, { useState, useEffect } from 'react';
import { Input, Select } from '@cogoport/components';
// import ScopeSelect from '@cogo/commons/components/ScopeSelect';
import {IcMSearchlight} from '@cogoport/icons-react';
import { tab_filter_mapping } from '../../../utils/bookingDeskUtils/tabs_mapping';
import styles from './styles.module.css'

const serviceOptions = [
	{
		label: 'FCL',
		value: 'fcl_freight',
	},
	{
		label: 'LCL',
		value: 'lcl_freight', 
	},

];

const ShipmentFilters = ({
	hookSetters = () => {},
	activeTab = '',
	setActiveTab = () => {},
	currentShipment = '',
	setCurrentShipment = () => {},
	visibleTabs = [],
}) => {
	const [value, setValue] = useState('');

	useEffect(() => {
		handleRefetch();
	}, [value, activeTab, currentShipment]);

	const handleRefetch = () => {
		const filters = {
			shipment_type: currentShipment,
			...tab_filter_mapping(activeTab),
			q: value || undefined,
			page: 1,
		};

		hookSetters.setFilters(filters);
	};

	const handleShipmentChange = (val) => {
		if (!visibleTabs.includes(activeTab)) {
			setActiveTab(visibleTabs[0]?.name);
		}

		setCurrentShipment(val);
	};
    console.log(value,'valueee');
	return (
		<>
			<div className={styles.container}>
				<div className={styles.selectContainer} >
				<Select
					placeholder="Select Service"
					options={serviceOptions}
					value={currentShipment}
					onChange={handleShipmentChange}
                    className={styles.selectClass}
				/>
				</div>
                <div className={styles.searchBox}>
				<Input
					name="q"
                    size="lg"
					placeholder="Search by SID, BL, Container No, Booking Number"
					value={value}
					onChange={(e) => setValue(e)}
					inputIcon={<IcMSearchlight width={20} height={20}/>}
					className={styles.inputClass}
				/>
                </div>
				<div>
					{/* <ScopeSelect style={{ height: 'auto' }} /> */}
				</div>
			</div>
		</>
	);
};
export default ShipmentFilters;