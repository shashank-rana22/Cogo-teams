import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useState, useEffect, useContext } from 'react';

import useUpdateShipmentService from '../../../hooks/useUpdateShipmentService';
import getCancelControls from '../utils/get-cancel-controls';
import getServiceCancelPayload from '../utils/getServiceCancelPayload';

const SUPPLIER_STAKEHOLDERS = [
	'booking_desk',
	'document_desk',
	'document_desk_manager',
	'supply_agent',
	'booking_desk_manager',
	'lastmile_ops',
	'lastmile_ops_manager',
	'so1_so2_ops',
];

export default function useGetServiceCancelControls({
	trade_type = '',
	closeModal = () => {},
	service_type = '',
}) {
	const [selectedReason, setSelectedReason] = useState(null);

	const { servicesList, refetchServices, shipment_data, activeStakeholder } = useContext(ShipmentDetailContext);
	const refetchFuncs = () => {
		closeModal();
		refetchServices();
	};

	const controls = getCancelControls({ selectedReason, isSeller: SUPPLIER_STAKEHOLDERS.includes(activeStakeholder) });

	const { control, watch, formState: { errors }, handleSubmit, setValue } = useForm();

	const cancellation_reason = watch('cancellation_reason');

	useEffect(() => {
		if (cancellation_reason !== selectedReason) {
			setSelectedReason(cancellation_reason);
			setValue('cancellation_subreason', '');
			setValue('cancellation_reason_comment', '');
		}
	}, [cancellation_reason, selectedReason, setValue]);

	const {
		apiTrigger: updateShipmentService, loading,
	} = useUpdateShipmentService({ refetch: refetchFuncs, successMessage: 'Service Cancelled' });

	const onSubmit = async (formData) => {
		if (formData) {
			updateShipmentService(getServiceCancelPayload({
				controls, servicesList, service_type, trade_type, formData, shipment_data,
			}));
		}
	};

	return { control, handleSubmit, onSubmit, controls, errors, loading };
}
