import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import rawControls from './rawControls';

const TRADE_MAPPING = {
	import : 'Destination',
	export : 'Origin',
};

const useEditLineItems = ({
	invoice = {},
	onClose = () => {},
	refetch = () => {},
	isAdminSuperAdmin = false,
	shipment_data = {},
	primary_service = {},
	info,
}) => {
	const services = invoice.services || [];

	const [selectedCodes, setSelectedCodes] = useState({});
	let allChargeCodes = {};

	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_sell_quotations',
		method : 'POST',
	}, { manual: true });

	const handleChange = (obj) => {
		if (!selectedCodes[obj?.code]) {
			setSelectedCodes({ ...selectedCodes, [obj?.code]: obj });
		}
	};

	const generateDefaultValues = ({ values }) => {
		const DEFAULT_VALUES = {};
		values.forEach((control) => {
			if (control.type === 'edit_service_charges') {
				DEFAULT_VALUES[control.name] = control.value.map((value) => {
					const FIELD_VALUE = { not_new_line_item: value.not_new_line_item };

					control.controls.forEach((subControl) => {
						FIELD_VALUE[subControl.name] = value[subControl.name];
					});

					return FIELD_VALUE;
				});
			}
		});

		return DEFAULT_VALUES;
	};

	const handleOptionsChange = (vals) => {
		allChargeCodes = { ...allChargeCodes, ...vals };
	};

	const controls = services.map((service, index) => ({
		...rawControls({
			handleChange,
			charge: service,
			info,
			isAdminSuperAdmin,
			shipment_data,
			primary_service,
			index,
			TRADE_MAPPING,
		}),
		onOptionsChange : handleOptionsChange,
		value           : (service?.line_items || []).map((item) => {
			const {
				alias,
				code,
				hsn_code = 'NA',
				currency,
				price_discounted = 0,
				quantity = 0,
				exchange_rate = 1,
				tax_percent = 0,
				unit,
				tax_total_price_discounted = 0,
				name,
			} = item || {};

			return {
				code,
				alias,
				sac_code          : hsn_code,
				currency,
				price_discounted,
				quantity,
				exchange_rate,
				tax_percent,
				unit,
				total             : tax_total_price_discounted,
				name,
				not_new_line_item : true,
			};
		}),
	}));

	const defaultValues = generateDefaultValues({ values: controls });

	const {
		handleSubmit, control, setValue, setError,
		watch, formState: { errors = {} },
	} = useForm({ defaultValues });

	const formValues = watch();

	const prepareFormValues = () => {
		const allFormValues = { ...formValues };
		(Object.keys(formValues) || []).forEach((key) => {
			if (key && formValues?.[key]) {
				allFormValues[key] = (allFormValues[key] || []).map((value) => {
					const { price_discounted = 0, quantity = 0, code, ...rest } = value || {};
					return {
						...rest,
						tax      : selectedCodes[code]?.tax_percent || 'NA',
						sac_code : selectedCodes[code]?.sac || 'NA',
						total    : price_discounted * quantity,
					};
				});
			}
		});

		return allFormValues;
	};

	const CUSTOM_VALUES = {};
	const LABELS = {};

	const newFormValues = prepareFormValues(selectedCodes, formValues);
	Object.keys(controls?.[GLOBAL_CONSTANTS.zeroth_index]).forEach((key) => {
		CUSTOM_VALUES[key] = {
			formValues : newFormValues[key],
			label      : LABELS[key],
			id         : key,
		};
	});

	const validateForPriceChanges = (values) => {
		let isLineItemsValid = true;

		Object.keys(values).forEach((key) => {
			const { line_items: lineItems, service_type: serviceType } = (services || []).find(
				(ele) => {
					const [serviceId] = (key || '').split(':');
					return serviceId && ele.service_id === serviceId;
				},
			) || {};

			const formValsToChecked = (values[key] || []).filter(
				(formLineItem) => formLineItem?.not_new_line_item,
			);

			formValsToChecked.forEach((val, idx) => {
				const originalValue = lineItems?.[idx];

				if (
					val.price_discounted < originalValue.price_discounted
					&& shipment_data?.shipment_type === 'fcl_freight' && serviceType !== 'fcl_freight_local_service'
				) {
					const priceDiscountedRefKey = `${key}.${idx}.price_discounted`;

					setError(priceDiscountedRefKey, {
						type    : 'custom',
						ref     : { name: priceDiscountedRefKey },
						message : `Price cannot be less than ${originalValue.price_discounted}`,
					});

					isLineItemsValid = false;
				}
			});
		});

		return isLineItemsValid;
	};

	const onCreate = async (values) => {
		const isValid = validateForPriceChanges(values);

		if (!isValid) {
			return;
		}

		try {
			const PAYLOAD = [];
			Object.keys(values).forEach((key) => {
				const currentService = services.find(
					(serviceItem, index) => `${serviceItem.service_id}:${index}` === key,
				);
				const CHARGECODES = {};
				(allChargeCodes[currentService?.service_type] || []).forEach(
					(chgCode) => {
						CHARGECODES[chgCode.code] = chgCode;
					},
				);
				const service = {
					service_id   : currentService?.service_id,
					service_type : currentService?.service_type,
					line_items   : (values?.[key] || []).map((line_item) => ({
						code             : line_item?.code,
						alias            : line_item?.alias,
						name             : CHARGECODES[line_item?.code]?.name || line_item?.name,
						currency         : line_item?.currency,
						price_discounted : Number(line_item?.price_discounted),
						quantity         : Number(line_item?.quantity),
						unit             : line_item?.unit,
					})),
				};
				PAYLOAD.push(service);
			});

			await trigger({
				data: {
					quotations             : PAYLOAD,
					shipment_id            : shipment_data?.id,
					invoice_combination_id : invoice?.id || undefined,
				},
			});
			Toast.success('Line Items updated successfully!');
			refetch();
			onClose();
		} catch (err) {
			Toast.error(err?.data?.invoices || 'Something went wrong');
		}
	};

	return {
		onCreate,
		handleSubmit,
		controls,
		loading,
		CUSTOM_VALUES,
		errors,
		control,
		setValue,
		watch,
		newFormValues,
	};
};

export default useEditLineItems;
