import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useContext, useState, useEffect } from 'react';

import cancelControls from '../../../configurations/cancel-service-controls.json';
import getCancelExtraControls from '../utils/get-cancel-controls';
import getCancelReasons from '../utils/get-cancel-reasons';

export default function useGetServiceCancelControls({
	isSeller = false, viewAs = '',
} = {}) {
	const [selectedReason, setSelectedReason] = useState(null);
	const { shipment_data = {} } = useContext(ShipmentDetailContext);
	// const isSupplyAgent =
	// isConditionMatches([...CC.SUPPLY_AGENT_VIEW, ...CC.GLOBAL_VIEW], 'or') &&
	// viewAs === 'service_provider' &&
	// scope === 'partner';
	const isSupplyAgent = false;

	const type = isSeller ? 'service_supplier' : 'service_shipper';

	const cancelReasons = getCancelReasons(type);

	const serviceProviderCancelled = isSupplyAgent && shipment_data.state === 'cancelled';

	let allControls = cancelControls.default;
	if (serviceProviderCancelled) {
		allControls = cancelControls.supply_agent;
	} else if (isSupplyAgent) {
		allControls = [...cancelControls.default, ...cancelControls.supply_agent];
	}

	allControls = [
		...allControls,
		...getCancelExtraControls({ selectedReason, cancelReasons, serviceProviderCancelled }),
	];

	allControls.some((control, index) => {
		if (control.name === 'cancellation_reason') {
			allControls[index].options = cancelReasons;
			return true;
		} return false;
	});

	const { control, watch, formState: { errors }, handleSubmit, setValue } = useForm();

	const cancellation_reason = watch('cancellation_reason');

	useEffect(() => {
		if (cancellation_reason !== selectedReason) {
			setSelectedReason(cancellation_reason);
			setValue('cancellation_subreason', '');
			setValue('cancellation_reason_comment', '');
		}
	}, [cancellation_reason, selectedReason, setValue]);

	return {
		control, handleSubmit, watch, controls: allControls, errors,
	};
}
