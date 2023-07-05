import { Select } from '@cogoport/components';
import { useContext } from 'react';

import SHIPMENT_TYPE_OPTIONS from '../../configs/SHIPMENT_TYPES_CONFIGS.json';
import DocumentDeskContext from '../../context/DocumentDeskContext';

import styles from './styles.module.css';

function Header() {
	const documentDeskContextValues = useContext(DocumentDeskContext);

	const {
		setFilters,
		shipmentType,
		setShipmentType,
		setStepperTab,
		setActiveTab,
	} = documentDeskContextValues || {};

	const handleChange = (val) => {
		if (val !== shipmentType) {
			setStepperTab('export');

			setActiveTab(val === 'fcl_freight' ? 'awaiting_service_provider_confirmation' : 'in_progress');

			setFilters({ page: 1 });

			setShipmentType(val);
		}
	};

	return (
		<div className={styles.header}>
			<h1>Document Desk</h1>

			<div className={styles.select_container}>
				<Select
					size="sm"
					value={shipmentType}
					onChange={(val) => handleChange(val)}
					options={SHIPMENT_TYPE_OPTIONS}
					placeholder="Shipment Type"
				/>
			</div>
		</div>
	);
}

export default Header;
