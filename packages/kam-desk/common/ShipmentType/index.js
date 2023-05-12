import { useContext } from 'react';

import shipmentControls from '../../config/CONTROLS_CONFIG.json';
import shipmentStepperTabs from '../../config/SHIPMENT_STEPPER_TABS.json';
import shipmentTabMapping from '../../config/SHIPMENT_TAB_MAPPING';
import KamDeskContext from '../../context/KamDeskContext';
import Stepper from '../Stepper';

const findValueInArray = ({ value, arr = [] }) => !!arr?.some((i) => i?.value === value);

function ShipmentType() {
	const {
		shipmentType,
		setShipmentType,
		stepperTab,
		setStepperTab,
		activeTab,
		setActiveTab,
		setFilters,
	} = useContext(KamDeskContext);

	const handleChange = (val) => {
		if (val !== shipmentType) {
			const stepperTabs = shipmentStepperTabs[val];

			let tempActiveTab = 'ongoing';

			let tempStepperTab = '';

			if (stepperTabs?.length) {
				tempStepperTab = findValueInArray({ arr: stepperTabs, value: stepperTab })
					? stepperTab
					: stepperTabs?.[0]?.value || '';

				const tabs = shipmentTabMapping?.[val]?.[tempStepperTab]?.tabs;

				tempActiveTab = findValueInArray({ arr: tabs, value: activeTab })
					? activeTab
					: tabs?.[0]?.value || '';
			}

			setStepperTab(tempStepperTab);

			setActiveTab(tempActiveTab);

			setFilters({ page: 1 });

			setShipmentType(val);
		}
	};

	return (
		<div>
			<Stepper
				onChange={handleChange}
				value={shipmentType}
				options={shipmentControls.shipment_types}
			/>
		</div>
	);
}

export default ShipmentType;
