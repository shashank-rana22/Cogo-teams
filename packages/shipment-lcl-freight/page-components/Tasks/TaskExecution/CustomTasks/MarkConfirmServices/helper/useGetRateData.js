import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';

import useGetShipmentServicesQuotation from '../../../../../../hooks/useGetShipmentServicesQuotation';
import useUpdateShipmentBuyQuotations from '../../../../../../hooks/useUpdateShipmentBuyQuotations';
import useUpdateShipmentPendingTask from '../../../../../../hooks/useUpdateShipmentPendingTask';
import useUpdateShipmentService from '../../../../../../hooks/useUpdateShipmentService';

import checkLineItemsSum from './checkLineItemSum';
import getRateControls from './getRateControls';

const TRADE_MAPPING = {
	import    : 'Destination',
	export    : 'Origin',
	undefined : '',
};

const getServicePayload = ({ servicesList, formValues, task }) => {
	const payload = [];
	['lcl_freight_service', 'lcl_freight_local_service'].forEach((key) => {
		const service = servicesList.find((j) => j.service_type === key);

		payload.push({
			data                : { service_provider_id: formValues?.[`${key}_service_provider_id`] },
			ids                 : [service?.id],
			service_type        : key,
			performed_by_org_id : task?.organization_id,
			shipment_id         : task?.shipment_id,
		});
	});

	return payload;
};

const useGetRateData = ({
	servicesList = [], shipment_data = {},
	onCancel = () => {}, task = {}, taskListRefetch = () => {},
}) => {
	const service_ids = [];
	let notMainService = false;

	(servicesList || []).forEach((serviceObj) => {
		if (['lcl_freight_service', 'lcl_freight_local_service'].includes(serviceObj.service_type)) {
			notMainService = true;
			service_ids.push(serviceObj.id);
		}
	});

	(servicesList || []).forEach((serviceObj) => {
		if (!notMainService) {
			service_ids.push(serviceObj.id);
		}
	});

	const { data:servicesQuotation, loading:serviceQuotationLoading } = useGetShipmentServicesQuotation({
		defaultParams: {
			shipment_id             : shipment_data?.id,
			service_ids,
			service_detail_required : true,
		},
	});
	const { apiTrigger:updateBuyQuotationTrigger } = useUpdateShipmentBuyQuotations({});

	const { apiTrigger:updateTask } = useUpdateShipmentPendingTask({
		refetch: () => {
			onCancel();
			taskListRefetch();
		},
	});

	const { apiTrigger:updateService } = useUpdateShipmentService({ });
	const service_charges = servicesQuotation?.service_charges || [];

	const service_charges_with_trade = (service_charges || []).map((charge) => {
		let chargeDetails = charge;

		(servicesList || []).forEach((serviceObj) => {
			if (charge?.service_id === serviceObj?.id) {
				chargeDetails = {
					...charge,
					trade_type: TRADE_MAPPING[serviceObj?.trade_type],
				};
			}
		});
		return chargeDetails;
	});

	let chargeCodes = {};

	const handleChange = (vals) => {
		if (!chargeCodes?.vals?.code) {
			chargeCodes = { ...chargeCodes, [vals?.code]: vals?.name };
		}
	};

	const finalControls = service_charges_with_trade.map((service_charge) => getRateControls({
		service_charge,
		shipment_data,
		handleChange,
	}));

	const defaultValues = {};

	service_charges.forEach((service_charge) => {
		defaultValues[service_charge?.id] = service_charge?.line_items?.map((line_item) => ({
			code     : line_item?.code,
			currency : line_item?.currency,
			price    : line_item?.price,
			quantity : line_item?.quantity,
			unit     : line_item?.unit,
			total    : line_item?.total,
		}));
	});

	const onSubmit = async (values) => {
		const {
			lcl_freight_service_service_provider_id, lcl_freight_local_service_service_provider_id,
			...restValues
		} = values || {};
		const quotations = [];

		Object.keys(restValues || {}).forEach((key) => {
			const items = values[key];

			const newQuote = {
				id         : key,
				service_id : (service_charges || []).find((charge) => charge?.id === key)
					?.service_id,
				line_items: items.map((line_item) => ({
					code     : line_item.code,
					currency : line_item.currency,
					name     : chargeCodes?.[line_item?.code] || '',
					price    : Number(line_item.price),
					quantity : Number(line_item.quantity),
					unit     : line_item.unit,
				})),
			};

			quotations.push(newQuote);
		});

		const checkSum = checkLineItemsSum(quotations);

		const servicePayload = getServicePayload({
			task,
			servicesList,
			formValues: { lcl_freight_service_service_provider_id, lcl_freight_local_service_service_provider_id },
		});

		if (!checkSum.check) {
			Toast.error(checkSum.message.join(','));
		} else {
			try {
				const res = await updateBuyQuotationTrigger({ quotations });

				if (res?.status === 200) {
					const lclRes = await updateService(servicePayload?.[0]);

					if (lclRes?.status === 200) {
						const localRes = await updateService(servicePayload?.[0]);

						if (localRes?.status === 200) {
							await updateTask({ id: task?.id });
						}
					}
				}
			} catch (err) {
				toastApiError(err);
			}
		}
	};

	return {
		service_charges_with_trade,
		updateBuyQuotationTrigger,
		finalControls,
		onSubmit,
		serviceQuotationLoading,
		defaultValues,
	};
};

export default useGetRateData;
