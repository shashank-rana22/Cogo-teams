import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
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

	const { data:servicesQuotation } = useGetShipmentServicesQuotation({
		defaultParams: {
			shipment_id             : shipment_data?.id,
			service_ids,
			service_detail_required : true,
		},
	});
	const { apiTrigger:updateBuyQuotationTrigger } = useUpdateShipmentBuyQuotations({});

	const service_charges = servicesQuotation?.service_charges || [];

	const service_charges_ids = [];

	const service_charges_with_trade = (service_charges || []).map((charge) => {
		let chargeDetails = charge;
		service_charges_ids.push(charge?.id);
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
	service_charges_ids.forEach((id) => {
		defaultValues[id] = [
			{
				code     : '',
				currency : '',
				price    : '',
				quantity : '',
				unit     : '',
				total    : '',
			},
		];
	});

	const formProps = useForm({ defaultValues });
	const { watch } = formProps;
	const formValues = watch();

	const customValues = {};

	const prepareFormValues = () => {
		const allFormValues = { ...formValues };
		(Object.keys(formValues) || []).forEach((key) => {
			if (key && formValues[key]) {
				allFormValues[key] = (allFormValues[key] || []).map((value) => ({
					...value,
					total    : (value.price || 0) * (value.quantity || 0),
					currency : 'INR',
				}));
			}
		});

		return allFormValues;
	};

	const newFormValues = prepareFormValues();

	Object.keys(formValues).forEach((key) => {
		customValues[key] = {
			formValues : newFormValues[key],
			id         : key,
		};
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
		formProps,
		customValues,
		onSubmit,
	};
};

export default useGetStep3Data;
