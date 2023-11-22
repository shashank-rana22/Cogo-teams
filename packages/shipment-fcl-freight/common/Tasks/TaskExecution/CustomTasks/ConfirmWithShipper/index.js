import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useContext } from 'react';

import BillingAddress from './BillingAddress';
import CargoReadiness from './CargoReadiness';
import CustomerContacts from './CustomerContacts';
import MarkComplete from './MarkComplete';

const COMPONENT_MAPPING = {
	0 : CargoReadiness,
	1 : CustomerContacts,
	2 : BillingAddress,
	3 : MarkComplete,
};

function ConfirmWithShipper({
	task = {},
	onCancel = () => {},
	refetch = () => {},
}) {
	const {
		shipment_data = {}, refetchServices = () => {}, primary_service = {}, servicesList,
	} = useContext(ShipmentDetailContext);

	const [step, setStep] = useState(task?.tags?.[GLOBAL_CONSTANTS.zeroth_index]);
	const [consigneeId, setConsigneeId] = useState(shipment_data?.consignee_shipper_id);

	const componentProps = {
		0: {
			setStep, task, onCancel, shipment_data,
		},
		1: {
			setStep, task, onCancel, shipment_data, setConsigneeId,
		},
		2: {
			task, refetch, onCancel, refetchServices, shipment_data, consigneeId, primary_service,
		},
		3: {
			task, refetch, onCancel, setStep, servicesList, primary_service,
		},
	};

	const Component = COMPONENT_MAPPING[step];
	const props = componentProps[step] || {};

	if (!Component) return null;

	return (
		<Component {...props} />
	);
}

export default ConfirmWithShipper;
