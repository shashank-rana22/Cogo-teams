import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';

import useGetShipmentServicesQuotation from '../../../../../../hooks/useGetShipmentServicesQuotation';
import useUpdateBuyQuotations from '../../../../../../hooks/useUpdateBuyQuotations';
import useUpdateShipmentPendingTask from '../../../../../../hooks/useUpdateShipmentPendingTask';

import checkLineItemsSum from './checkLineItemSum';
import getStep3Controls from './getStep3Controls';

const TRADE_MAPPING = {
	import    : 'Destination',
	export    : 'Origin',
	undefined : '',
};

const HTTP_SUCCESS_CODE = 200;

const useGetStep3Data = ({
	servicesList = [],
	shipment_data = {},
	onCancel = () => {},
	task = {},
	taskListRefetch = () => {},
	primary_service = {},
}) => {
	const { trade_type } = primary_service || {};

	let notMainService = false;
	const SERVICE_IDS = [];

	(servicesList || []).forEach((serviceObj) => {
		if (serviceObj.service_type === 'fcl_freight_service'
			|| (serviceObj.service_type === 'fcl_freight_local_service'
			&& trade_type === 'import' && serviceObj.trade_type === 'export')
		) {
			notMainService = true;
			SERVICE_IDS.push(serviceObj.id);
		}
	});

	(servicesList || []).forEach((serviceObj) => {
		if (!notMainService) {
			SERVICE_IDS.push(serviceObj.id);
		}
	});

	const { data:servicesQuotation, loading:serviceQuotationLoading } = useGetShipmentServicesQuotation({
		defaultParams: {
			shipment_id             : shipment_data?.id,
			SERVICE_IDS,
			service_detail_required : true,
		},
	});
	const { apiTrigger:updateBuyQuotationTrigger } = useUpdateBuyQuotations({});

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

	const DEFAULT_VALUES = {};

	service_charges.forEach((service_charge) => {
		DEFAULT_VALUES[service_charge?.id] = service_charge?.line_items?.map((line_item) => ({
			code     : line_item?.code,
			currency : line_item?.currency,
			price    : line_item?.price,
			quantity : line_item?.quantity,
			unit     : line_item?.unit,
			total    : line_item?.total,
		}));
	});

	const onSubmit = async (values) => {
		let quotation = {};
		Object.keys(values).forEach((key) => {
			const items = values[key];

			quotation = {
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
		});

		const checkSum = checkLineItemsSum(quotation);

		if (!checkSum.check) {
			Toast.error(checkSum.message.join(','));
		} else {
			try {
				const res = await updateBuyQuotationTrigger({ ...quotation });

				if (res?.status === HTTP_SUCCESS_CODE) {
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
		DEFAULT_VALUES,
	};
};

export default useGetStep3Data;
