import { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { useFormCogo } from '@cogoport/front/hooks';
import { toast } from '@cogoport/front/components/admin';
import { controls } from '../Controls/updateServiceProviderControls';

const useTrailerFreightRateCards = ({ shipment_data, services }) => {
	const scope = useSelector(({ general }) => general?.scope);

	const [allTrailerDetails, setAllTrailerDetails] = useState({});

	const { trigger, data } = useRequest(
		'get',
		false,
		scope,
	)('/get_haulage_freight_rate_cards');

	const getRate = async (trailer_type) => {
		const { importer_exporter_id } = shipment_data;
		try {
			await trigger({
				params: {
					importer_exporter_id,
					trailer_type,
					trailer_count: 1,
					trip_type: shipment_data?.all_services[0]?.trip_type,
					container_type: shipment_data?.all_services?.[0]?.container_type,
					container_size: shipment_data?.all_services?.[0]?.container_size,
					containers_count: shipment_data?.all_services?.[0]?.containers_count,
					commodity: services[0]?.commodity || undefined,
					origin_location_id: services[0].origin_location_id,
					destination_location_id: services[0].destination_location_id,
					transport_mode: shipment_data?.all_services?.[0]?.transport_mode,
					include_additional_response_data: true,
				},
			});
		} catch (err) {
			toast.error('Failed to get data');
		}
	};

	const { fields, watch, handleSubmit, formState } = useFormCogo(controls);
	const { errors } = formState;
	const formValues = watch();
	return {
		serviceProviderData: data,
		serviceProviderControls: controls,
		serviceProviderFormValues: formValues,
		serviceProviderFields: fields,
		getRate,
		handleSubmit,
		errors,
		allTrailerDetails,
		setAllTrailerDetails,
	};
};

export default useTrailerFreightRateCards;
