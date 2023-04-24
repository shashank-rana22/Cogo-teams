import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';

import useGetShipmentServicesQuotation from '../../../../../../hooks/useGetShipmentServicesQuotation';
import useUpdateShipmentBuyQuotations from '../../../../../../hooks/useUpdateShipmentBuyQuotations';

import checkLineItemsSum from './checkLineItemSum';
import getStep3Controls from './getStep3Controls';

const TRADE_MAPPING = {
	import    : 'Destination',
	export    : 'Origin',
	undefined : '',
};

const useGetStep3Data = ({ servicesList = [], shipment_data }) => {
	const service_ids = servicesList.map((service) => service?.id);

	const { data:servicesQuotation, loading:serviceQuotationLoading } = useGetShipmentServicesQuotation({
		defaultParams: {
			shipment_id             : shipment_data?.id,
			service_ids,
			service_detail_required : true,
		},
	});
	const { apiTrigger:updateBuyQuotationTrigger } = useUpdateShipmentBuyQuotations({});

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

	const finalControls = service_charges_with_trade.map((service_charge) => getStep3Controls({
		service_charge,
		shipment_data,
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
				await updateBuyQuotationTrigger({ quotations });

			// if(!res?.hasError){
			// 	const resUpdateTask =
			// }
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
