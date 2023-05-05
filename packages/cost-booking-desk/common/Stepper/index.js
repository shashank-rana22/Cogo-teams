import { useContext } from 'react';

import CONTROL_CONFIG from '../../config/CONTROLS_CONFIG.json';
import TABS from '../../config/TABS_CONFIG';
import CostBookingDeskContext from '../../context/CostBookingDeskContext';
import getIsDateFilterVisible from '../../helpers/getIsDateFilterVisible';

import Child from './Child';
import styles from './styles.module.css';

function Stepper() {
	const {
		shipmentType, setShipmentType, setStepperTab,
		filters, setFilters, setActiveTab,
	} = useContext(CostBookingDeskContext);

	const tabs = CONTROL_CONFIG.shipment_types;

	const onChange = (val) => {
		const shipmentConfig = TABS[val] || {};
		const tempStepperTab = Object.keys(shipmentConfig)?.[0];

		const isDateFilterVisible = getIsDateFilterVisible({ shipmentType: val, stepperTab: tempStepperTab });
		const tabConfig = TABS[val]?.[tempStepperTab]?.[0];
		const tempIsCritical = tabConfig?.isCriticalVisible;

		setFilters({
			...(isDateFilterVisible ? filters : {}),
			page       : 1,
			isCritical : filters?.isCritical && tempIsCritical,
			q          : filters.q || '',
		});

		setActiveTab(tabConfig?.name);
		setStepperTab(tempStepperTab);
		setShipmentType(val);
	};

	return (
		<div className={styles.container}>
			{tabs?.map((tab) => (
				<Child item={tab} value={shipmentType} onChange={onChange} />
			))}
		</div>
	);
}

export default Stepper;
