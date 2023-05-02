import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';

import useGetShipmentServicesQuotation from '../../../../../../hooks/useGetShipmentServicesQuotation';
import useUpdateShipmentBuyQuotations from '../../../../../../hooks/useUpdateShipmentBuyQuotations';
import useUpdateShipmentPendingTask from '../../../../../../hooks/useUpdateShipmentPendingTask';

import checkLineItemsSum from './checkLineItemSum';
import getStep3Controls from './getStep3Controls';

const TRADE_MAPPING = {
	import    : 'Destination',
	export    : 'Origin',
	undefined : '',
};

const useGetStep3Data = ({ servicesList = [], shipment_data, onCancel, task, taskListRefetch = () => {} }) => {
	const service_ids = [];
	let notMainService = false;

	(servicesList || []).forEach((serviceObj) => {
		if (serviceObj.service_type === 'fcl_freight_service'
		) {
			notMainService = true;
			service_ids.push(serviceObj.id);
		} else if (
			serviceObj.service_type === `${shipment_data?.shipment_type}_service`
		) {
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

	const finalControls = service_charges_with_trade.map((service_charge) => getStep3Controls({
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
		const quotations = [];

		Object.keys(values).forEach((key) => {
			const items = values[key];

			const newQuote = {
				id         : key,
				service_id : (service_charges || []).find((charge) => charge?.id === key)
					?.service_id,
				line_items: items.map((line_item) => ({
					code     : line_item.code,
					currency : line_item.currency,
					name     : chargeCodes[line_item?.code],
					price    : Number(line_item.price),
					quantity : Number(line_item.quantity),
					unit     : line_item.unit,
				})),
			};

			quotations.push(newQuote);
		});

		const checkSum = checkLineItemsSum(quotations);

		if (!checkSum.check) {
			Toast.error(checkSum.message.join(','));
		} else {
			try {
				const res = await updateBuyQuotationTrigger({ quotations });

				if (!res?.hasError) {
					await updateTask({ id: task?.id });
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

export default useGetStep3Data;
