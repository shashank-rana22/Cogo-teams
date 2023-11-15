import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useContext } from 'react';

import BillingAddress from './BillingAddress';
import CustomerContacts from './CustomerContacts';
import MarkComplete from './MarkComplete';

const COMPONENT_MAPPING = {
	0 : CustomerContacts,
	1 : BillingAddress,
	2 : MarkComplete,
};

function ConfirmWithShipper({
	task = {},
	onCancel = () => {},
	refetch = () => {},
}) {
	const { shipment_data = {}, refetchServices = () => {}, primary_service = {} } = useContext(ShipmentDetailContext);

	const [step, setStep] = useState(task?.tags?.[GLOBAL_CONSTANTS.zeroth_index]);
	const [consigneeId, setConsigneeId] = useState(shipment_data?.consignee_shipper_id);

	const componentProps = {
		0: {
			setStep, task, onCancel, shipment_data, setConsigneeId,
		},
		1: {
			task, refetch, onCancel, refetchServices, shipment_data, consigneeId, primary_service,
		},
		2: {
			task, refetch, onCancel, setStep,
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
