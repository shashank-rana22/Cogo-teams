import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import rawControls from '../helper/sell_quotations_controls';

const useEditLineItems = ({
	invoice,
	onClose = () => {},
	refetch = () => {},
	isFclFreight,
	shipment_data,
	info,
}) => {
	const services = invoice?.services || [];

	const [selectedCodes, setSelectedCodes] = useState({});
	const [allChargeCodes, setAllChargeCodes] = useState({});
	const [errors, setErrors] = useState({});

	const [{ loading : lineItemApiLoading }, updateLineItemsAPITrigger] = useRequest({
		method : 'POST',
		url    : '/update_revenue_desk_shipment_sell_quotations',
	}, { manual: true });

	const [{ loading: sendWhatsappCounterPriceLoading }, sendWhatsappCounterPriceTrigger] = useRequest({
		method : 'POST',
		url    : '/send_whatsapp_counter_price',
	}, { manual: true });

	const handleChange = (obj) => {
		if (!selectedCodes[obj.code]) {
			setSelectedCodes({ ...selectedCodes, [obj.code]: obj });
		}
	};

	const trade_mapping = {
		import : 'Destination',
		export : 'Origin',
	};
	const controls = services.map((service, index) => ({
		...rawControls(
			{
				handleChange,
				service,
				info,
				isFclFreight,
				shipment_data,
				index,
				trade_mapping,
			},
		),
		onOptionsChange : (vals) => setAllChargeCodes({ ...allChargeCodes, ...vals }),
		value           : service.line_items.map((item) => ({
			code             : item?.code,
			alias            : item?.alias,
			sac_code         : item?.hsn_code || 'NA',
			currency         : item?.currency,
			price_discounted : item?.price_discounted || 0,
			quantity         : item?.quantity || 0,
			exchange_rate    : item?.exchange_rate || 1,
			tax_percent      : item?.tax_percent || 0,
			unit             : item?.unit,
			total            : item?.tax_total_price_discounted || 0,
			name             : item?.name,
		})),
	}));

	const {
		watch,
		handleSubmit,
		control,
		formState: { isDirty },
	} = useForm();

	const formValues = watch();

	// const labels = {};
	// const customValues = {};
	// const prepareFormValues = () => {
	// 	const allFormValues = { ...formValues };
	// 	(Object.keys(formValues) || []).forEach((key) => {
	// 		if (key && formValues[key]) {
	// 			allFormValues[key] = (allFormValues[key] || []).map((value) => ({
	// 				...value,
	// 				total: (value.price_discounted || 0) * (value.quantity || 0),
	// 			}));
	// 		}
	// 	});

	// 	return allFormValues;
	// };

	// const newFormValues = prepareFormValues(selectedCodes, formValues);
	// // Object.keys(fields).forEach((key) => {
	// // 	customValues[key] = {
	// // 		formValues : newFormValues[key],
	// // 		label      : labels[key],
	// // 		id         : key,
	// // 	};
	// // });

	controls.forEach((ctrl) => {
		if (ctrl.controls) {
			ctrl.controls.forEach((childCtrl) => {
				const tempChildCtrl = childCtrl;
				if (childCtrl.name === 'unit') {
					const unitOptions = {};
					(formValues[ctrl.name] || []).forEach((item, i) => {
						const chargeCodes = {};
						(allChargeCodes[ctrl.service_name] || []).forEach((chgCode) => {
							chargeCodes[chgCode.code] = chgCode;
						});
						unitOptions[i] = (
							chargeCodes[item.code]?.units || ['per_container']
						).map((unit) => ({
							label : startCase(unit),
							value : unit,
						}));
					});
					tempChildCtrl.options = unitOptions;
				}
			});
		}
	});

	const onCreate = async (values) => {
		try {
			const payload = [];

			Object.keys(values).forEach((key) => {
				const currentService = services.find(
					(serviceItem, index) => `${serviceItem.service_id}:${index}` === key,
				);
				const chargeCodes = {};
				(allChargeCodes[currentService.service_type] || []).forEach(
					(chgCode) => {
						chargeCodes[chgCode.code] = chgCode;
					},
				);

				const service = {
					service_id   : currentService?.service_id,
					service_type : currentService?.service_type,
					line_items   : values[key].map((line_item) => ({
						code             : line_item.code,
						alias            : line_item?.alias,
						name             : chargeCodes[line_item.code]?.name || line_item?.name,
						currency         : line_item.currency,
						price_discounted : Number(line_item.price_discounted),
						quantity         : Number(line_item.quantity),
						unit             : line_item.unit,
					})),
				};
				payload.push(service);
			});

			const res = await updateLineItemsAPITrigger({
				data: {
					quotations             : payload,
					shipment_id            : shipment_data?.id,
					invoice_combination_id : invoice?.id || undefined,
				},
			});

			if (!res.hasError) {
				Toast.success('Line Items updated successfully!');
				await sendWhatsappCounterPriceTrigger({
					params: {
						shipment_id: shipment_data?.id,
					},
				});
				Toast.success('Counter price sent successfully!');
				refetch();
				onClose();
			}
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	const onError = (err) => {
		setErrors({ ...err });
	};

	return {
		onCreate,
		handleSubmit,
		controls,
		loading: lineItemApiLoading,
		sendWhatsappCounterPriceLoading,
		// customValues,
		onError,
		errors,
		isDirty,
		control,
	};
};

export default useEditLineItems;
