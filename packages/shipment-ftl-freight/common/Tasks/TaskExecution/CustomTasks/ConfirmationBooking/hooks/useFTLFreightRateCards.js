import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { useFormCogo } from '@cogoport/front/hooks';
import { isEmpty } from '@cogoport/front/utils';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import { controls } from '../Controls/updateServiceProviderControls';

const useFTLFreightRateCards = ({ shipment_data, services }) => {
	const scope = useSelector(({ general }) => general?.scope);

	const [allTruckDetails, setAllTruckDetails] = useState({});
	const [finalGetHookData, setFinalGetHookData] = useState({});

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
							shipment_id  : shipment_data?.id,
							is_reverted  : true,
							service_data : { truck_type },
						},
						preferred_currency: GLOBAL_CONSTANTS.currency_code.INR,
					},
				});
			} else {
				await trigger({
					params: {
						importer_exporter_id,
						truck_type,
						trucks_count : 1,
						trip_type    : shipment_data?.all_services?.[0]?.trip_type,
						commodity    : services?.[0]?.commodity || undefined,
						load_selection_type:
							shipment_data?.all_services?.[0]?.load_selection_type,

						weight:
							shipment_data?.all_services?.[0]?.load_selection_type === 'truck'
								? undefined
								: services?.[0]?.weight,
						origin_location_id               : services?.[0]?.origin_location_id,
						destination_location_id          : services?.[0]?.destination_location_id,
						include_additional_response_data : true,
					},
				});
			}
		} catch (err) {
			console.log('err', err);
		}
	};

	useEffect(() => {
		if (data) {
			const truckType = data?.list[0]?.truck_type;
			if (isEmpty(finalGetHookData[truckType])) {
				setFinalGetHookData((prev) => {
					const tempPrev = prev;
					tempPrev[truckType] = { ...tempPrev[truckType], ...data };
					return tempPrev;
				});
			}
		} else if (dataFlashBook) {
			const truckType = dataFlashBook?.list[0]?.service?.truck_type;
			if (isEmpty(finalGetHookData[truckType])) {
				const { list = [] } = dataFlashBook;
				const flashList = list.map((item) => ({
					id                       : item?.id,
					origin_location_id       : item?.origin_location?.id,
					destination_location_id  : item?.destination_location?.id,
					service_provider_id      : item?.service_provider?.id,
					importer_exporter_id     : item?.importer_exporte?.id,
					line_items               : item?.line_items,
					truck_type               : item?.service?.truck_type,
					trucks_count             : item?.service?.trucks_count,
					transit_time             : 1,
					detention_free_time      : 2,
					service_provider_name    : item?.service_provider?.trade_name,
					user_name                : item?.service_provider?.business_name,
					user_contact             : '-',
					last_updated_at          : null,
					buy_rate_currency        : item?.currency,
					buy_rate                 : item?.total_price,
					advanced_amount          : item?.advance_amount,
					advanced_amount_currency : item?.advance_amount_currency,
					service_id               : item?.service_id,
				}));
				setFinalGetHookData((prev) => {
					const tempPrev = prev;
					tempPrev[truckType] = { list: flashList };
					return tempPrev;
				});
			}
		}
	}, [data, dataFlashBook]);

	const finalControls = controls();
	const { fields, watch, handleSubmit, formState } = useFormCogo(finalControls);
	const { errors } = formState;
	const formValues = watch();
	return {
		serviceProviderData       : finalGetHookData,
		serviceProviderControls   : controls,
		serviceProviderFormValues : formValues,
		serviceProviderFields     : fields,
		getRate,
		handleSubmit,
		errors,
		allTruckDetails,
		setAllTruckDetails,
		setFinalGetHookData,
		loading                   : loading || loadingFlashBook,
	};
};

export default useFTLFreightRateCards;
