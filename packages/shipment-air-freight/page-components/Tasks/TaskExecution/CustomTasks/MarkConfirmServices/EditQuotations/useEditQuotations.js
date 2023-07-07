import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import useGetServicesQuotation from '../../../../../../hooks/useGetServicesQuotation';
import useUpdateBuyQuotations from '../../../../../../hooks/useUpdateBuyQuotations';
import useUpdateTask from '../../../../../../hooks/useUpdateTask';
import checkLineItemsSum from '../helper/checkLineItemSum';
import getStep3Controls from '../helper/getEditQuotationControls';

const TRADE_MAPPING = {
	import    : 'Destination',
	export    : 'Origin',
	undefined : '',
};
const BASIC_CHARGE_CODE = ['BAS', 'BASNO'];

const OK_RESPONSE_STATUS = 200;

const useEditQuotations = ({
	servicesList = [], shipment_data = {}, onCancel = () => {}, task = {},
	taskListRefetch = () => {},
	selectedCard = {},
}) => {
	const [allChargeCodes, setAllChargeCodes] = useState({});
	const SERVICE_IDS = [];
	let notMainService = false;

	(servicesList || []).forEach((serviceObj) => {
		if (serviceObj.service_type === 'air_freight_service'
			|| (serviceObj.service_type === 'air_freight_local_service'
			)
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

	const { data:servicesQuotation, loading:serviceQuotationLoading } = useGetServicesQuotation({

		shipment_id             : shipment_data?.id,
		service_ids             : SERVICE_IDS,
		service_detail_required : true,

	});
	const { loading, apiTrigger:updateBuyQuotationTrigger } = useUpdateBuyQuotations({});

	const { loading:updateTaskLoading, apiTrigger:updateTask } = useUpdateTask({
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
	const onOptionChange = (val) => {
		setAllChargeCodes((prev) => ({ ...prev, ...val }));
	};
	const controlObj = service_charges_with_trade.map((service_charge) => ({
		...getStep3Controls({
			service_charge,
			shipment_data,
			handleChange,

		}),
		onOptionsChange: (val) => onOptionChange(val),
	}));

	const DEFAULT_VALUES = {};

	service_charges.forEach((service_charge) => {
		DEFAULT_VALUES[service_charge?.service_id] = service_charge?.line_items?.map((line_item) => ({
			code     : line_item?.code,
			currency : line_item?.currency,
			price    : line_item?.price,
			quantity : line_item?.quantity,
			unit     : line_item?.unit,
			total    : line_item?.total,
		}));
	});

	const onSubmit = async (values) => {
		const QUOTATIONS = [];

		const SELECTED_PRIORITY_LINE_ITEM = selectedCard?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.line_items || [];

		const BASIC_LINE_ITEM = SELECTED_PRIORITY_LINE_ITEM.find(
			(lineItem) => BASIC_CHARGE_CODE.includes(lineItem.code),
		) || {};

		Object.keys(values).forEach((key) => {
			const items = values[key];
			const SERVICE = (service_charges || []).find(
				(charge) => charge?.id === key,
			);
			const newQuote = {
				id         : key,
				service_id : (service_charges || []).find((charge) => charge?.id === key)
					?.service_id,
				service_type: SERVICE?.service_type,
				is_minimum_price_shipment:
				SERVICE?.service_detail?.[GLOBAL_CONSTANTS.zeroth_index]?.is_minimum_price_shipment,
				min_price  : BASIC_LINE_ITEM.min_price,
				line_items : items.map((line_item) => ({
					code     : line_item.code,
					currency : line_item.currency,
					name     : chargeCodes?.[line_item?.code] || '',
					price    : Number(line_item.price),
					quantity : Number(line_item.quantity),
					unit     : line_item.unit,
				})),
			};

			QUOTATIONS.push(newQuote);
		});

		const checkSum = checkLineItemsSum(QUOTATIONS);

		if (!checkSum.check) {
			Toast.error(checkSum.message.join(','));
		} else {
			try {
				const res = await updateBuyQuotationTrigger({ quotations: QUOTATIONS });

				if (res?.status === OK_RESPONSE_STATUS) {
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
		onSubmit,
		finalControls  : controlObj,
		serviceQuotationLoading,
		defaultValues  : DEFAULT_VALUES,
		shipment_data,
		loading        : (serviceQuotationLoading),
		confirmLoading : loading || updateTaskLoading,
		allChargeCodes,
	};
};

export default useEditQuotations;
