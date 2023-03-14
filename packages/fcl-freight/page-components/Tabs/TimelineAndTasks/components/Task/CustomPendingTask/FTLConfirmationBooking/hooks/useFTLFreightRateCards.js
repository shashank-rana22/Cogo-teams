import { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { useFormCogo } from '@cogoport/front/hooks';
import { controls } from '../Controls/updateServiceProviderControls';

const useFTLFreightRateCards = ({ shipment_data, services }) => {
	const scope = useSelector(({ general }) => general?.scope);

	const [allTruckDetails, setAllTruckDetails] = useState({});

	const { trigger, data, loading } = useRequest(
		'get',
		false,
		scope,
	)('/get_ftl_freight_rate_cards');

	// for sell without buy
	const {
		trigger: triggerFlashBook,
		data: dataFlashBook,
		loading: loadingFlashBook,
	} = useRequest('get', false, scope)('list_shipment_flash_booking_rates');

	const getRate = async (truck_type) => {
		const { importer_exporter_id } = shipment_data;
		try {
			if (shipment_data?.source === 'direct') {
				await triggerFlashBook({
					params: {
						filters: {
							shipment_id: shipment_data?.id,
							is_reverted: true,
							preferred_currency: 'INR',
						},
					},
				});
			} else {
				await trigger({
					params: {
						importer_exporter_id,
						truck_type,
						trucks_count: 1,
						trip_type: shipment_data?.all_services[0]?.trip_type,
						commodity: services[0]?.commodity || undefined,
						origin_location_id: services[0].origin_location_id,
						destination_location_id: services[0].destination_location_id,
						include_additional_response_data: true,
					},
				});
			}
		} catch (err) {
			console.log('err', err);
		}
	};
	let flashList;
	if (dataFlashBook) {
		const { list = [] } = dataFlashBook;
		flashList = list.map((item) => {
			return {
				id: item?.id,
				origin_location_id: item?.origin_location?.id,
				destination_location_id: item?.destination_location?.id,
				service_provider_id: item?.service_provider?.id,
				importer_exporter_id: item?.importer_exporte?.id,
				line_items: item?.line_items,
				truck_type: item?.service?.truck_type,
				trucks_count: item?.service?.trucks_count,
				transit_time: 1,
				detention_free_time: 2,
				service_provider_name: item?.service_provider?.trade_name,
				user_name: item?.service_provider?.business_name,
				user_contact: '-',
				last_updated_at: null,
				buy_rate_currency: item?.currency,
				buy_rate: item?.total_price,
			};
		});
	}

	const { fields, watch, handleSubmit, formState } = useFormCogo(controls);
	const { errors } = formState;
	const formValues = watch();
	return {
		serviceProviderData: data || { list: flashList },
		serviceProviderControls: controls,
		serviceProviderFormValues: formValues,
		serviceProviderFields: fields,
		getRate,
		handleSubmit,
		errors,
		allTruckDetails,
		setAllTruckDetails,
		loading: loading || loadingFlashBook,
	};
};

export default useFTLFreightRateCards;
