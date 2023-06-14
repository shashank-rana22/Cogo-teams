import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import rawControls from '../helper/sell_quotations_controls';

const getDefaultValues = (oldfields) => {
	const defaultValues = {};
	const newfields = oldfields.map((field) => {
		const { value, ...rest } = field;
		if (field.type === 'fieldArray') {
			defaultValues[field.name] = value || [];
		} else {
			defaultValues[field.name] = value || '';
		}
		return rest;
	});
	return { defaultValues, fields: newfields };
};

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
			price_discounted : item?.price_discounted || '0',
			quantity         : item?.quantity || 0,
			exchange_rate    : item?.exchange_rate || 1,
			tax_percent      : item?.tax_percent || 0,
			unit             : item?.unit,
			total            : item?.tax_total_price_discounted || '0',
			name             : item?.name,
		})),
	}));

	const { defaultValues, fields } = getDefaultValues(controls);
	const {
		watch,
		handleSubmit,
		control,
		formState: { isDirty },
	} = useForm({ defaultValues });

	const formValues = watch();

	const newFields = fields.map((ctrl) => {
		const newCtrl = { ...ctrl };
		if (ctrl.type === 'fieldArray') {
			newCtrl.controls = ctrl.controls.map((childCtrl) => {
				const tempChildCtrl = childCtrl;
				if (childCtrl.name === 'price_discounted') {
					const disabled = {};
					(formValues[ctrl.name] || []).forEach((val, idx) => {
						disabled[idx] = val.code !== 'BAS';
					});
					tempChildCtrl.customProps = { disabled };
				}
				return tempChildCtrl;
			});
		}
		return newCtrl;
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
		controls : newFields,
		loading  : lineItemApiLoading,
		sendWhatsappCounterPriceLoading,
		onError,
		errors,
		isDirty,
		control,
	};
};

export default useEditLineItems;
