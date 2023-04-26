import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import useListShipmentBookingConfirmationPreferences
	from '../../../../../../hooks/useListShipmentBookingConfirmationPreferences';
import useUpdateShipmentBookingConfirmationPreferences
	from '../../../../../../hooks/useUpdateShipmentBookingConfirmationPreferences';

const useGetStep0Data = ({ shipment_data = {}, task = {}, servicesList = [], setStep = () => {} }) => {
	const { service_id, service_type } = task || {};
	const { id:shipment_id } = shipment_data || {};
	const [selectedServiceProvider, setSelectedServiceProvider] = useState({});

	const updateRefetch = () => {
		const { source = '' } = selectedServiceProvider;

		if (source === 'bn_salvage') {
			setStep(2);
		} else {
			setStep(1);
		}
	};

	const { apiTrigger, loading:updatePreferenceLoading } = useUpdateShipmentBookingConfirmationPreferences({
		refetch: updateRefetch,
	});

	const { data, loading } = useListShipmentBookingConfirmationPreferences({
		shipment_id,
		defaultFilters: {
			service_id,
			service_type,
		},
	});

	const fcl_shipping_line_id = servicesList
		?.find((s) => s?.service_type === 'fcl_freight_service')?.shipping_line?.id;

	const defaultValues = { shipping_line_id_fcl_local: fcl_shipping_line_id || '' };
	const formProps = useForm({ defaultValues });

	const { watch, setValue } = formProps;
	const watchFclShippingLine = watch('shipping_line_id_fcl_main');
	const formValues = watch();

	useEffect(() => {
		setValue('shipping_line_id_fcl_local', watchFclShippingLine);
	}, [watchFclShippingLine, setValue]);

	return {
		formProps,
		listBookingPreferences   : data?.list || [],
		updateBookingPreference  : apiTrigger,
		bookingPreferenceLoading : loading,
		updatePreferenceLoading,
		setSelectedServiceProvider,
		selectedServiceProvider,
		shipment_data,
		formValues,
	};
};

export default useGetStep0Data;
