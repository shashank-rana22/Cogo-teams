import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';

import checkLineItemsSum from '../common/Tasks/TaskExecution/CustomTasks/UploadBookingNote/helpers/checkLineItemSum';
import endToEndCheck from '../common/Tasks/TaskExecution/CustomTasks/UploadBookingNote/helpers/end2EndCheck';
import getStep3Controls from '../common/Tasks/TaskExecution/CustomTasks/UploadBookingNote/helpers/getStep3Controls';

import useGetShipmentServicesQuotation from './useGetShipmentServicesQuotation';
import useUpdateBuyQuotations from './useUpdateBuyQuotations';

const TRADE_MAPPING = {
	import    : 'Destination',
	export    : 'Origin',
	undefined : '',
};

const useUpdateQuotationOnBnAmend = ({
	servicesList = [],
	shipment_data = {},
	task = {},
	setIsQuotation = () => {},
}) => {
	const SERVICE_IDS = [];

	let notMainService = false;
	let trade_type;
	let chargeCodes = {};

	const incoTerm = (servicesList || []).find(
		(serviceObj) => serviceObj.service_type === 'fcl_freight_service',
	)?.inco_term;

	(servicesList || []).forEach((serviceObj) => {
		if ((serviceObj.service_type === 'fcl_freight_service'
			|| serviceObj.service_type === 'fcl_freight_local_service')
			&& task.service_type === 'fcl_freight_service') {
			notMainService = true;
			if (endToEndCheck({ serviceObj, shipment_data, incoTerm })) {
				SERVICE_IDS.push(serviceObj.id);
			}
		}
		if (serviceObj.id === task.service_id) {
			trade_type = serviceObj?.trade_type;
		}
	});

	(servicesList || []).forEach((serviceObj) => {
		if (!notMainService && task.service_type === serviceObj.service_type && trade_type === serviceObj?.trade_type) {
			SERVICE_IDS.push(serviceObj.id);
		}
	});

	const { data:servicesQuotation, loading:serviceQuotationLoading } = useGetShipmentServicesQuotation({
		defaultParams: {
			shipment_id             : shipment_data?.id,
			service_ids             : SERVICE_IDS,
			service_detail_required : true,
		},
	});
	const { apiTrigger:updateBuyQuotationTrigger, loading: quotationLoading } = useUpdateBuyQuotations({});

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

	const handleChange = (values) => {
		if (!chargeCodes?.values?.code) {
			chargeCodes = { ...chargeCodes, [values?.code]: values?.name };
		}
	};

	const finalControls = service_charges_with_trade.map((service_charge) => getStep3Controls({
		service_charge,
		shipment_data,
		handleChange,

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

		Object.keys(values || {}).forEach((key) => {
			const items = values[key] || [];

			const newQuote = {
				id: (service_charges || []).find((charge) => charge?.service_id === key)
					?.id,
				service_id : key,
				line_items : items?.map((line_item) => ({
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
				await updateBuyQuotationTrigger({ quotations: QUOTATIONS, quotation_updated_by: 'so1' });

				setIsQuotation(false);
			} catch (err) {
				toastApiError(err);
			}
		}
	};

	return {
		finalControls,
		onSubmit,
		serviceQuotationLoading,
		loading       : quotationLoading,
		defaultValues : DEFAULT_VALUES,
	};
};

export default useUpdateQuotationOnBnAmend;
