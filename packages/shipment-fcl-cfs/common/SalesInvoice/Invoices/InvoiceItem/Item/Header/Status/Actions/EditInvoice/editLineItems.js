import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useState, useCallback } from 'react';

import rawControls from './rawControls';

const TRADE_MAPPING = {
	import : 'Destination',
	export : 'Origin',
};

const FALLBACK_ZERO = 0;
const FALLBACK_ONE = 1;

const useEditLineItems = ({
	invoice = {},
	onClose = () => {},
	refetch = () => {},
	isAdminSuperAdmin = false,
	shipment_data = {},
	info,
}) => {
	const services = invoice.services || [];

	const [selectedCodes, setSelectedCodes] = useState({});
	const [allChargeCodes, setAllChargeCodes] = useState({});

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
					const FIELD_VALUE = {};
					control.controls.forEach((subControl) => {
						FIELD_VALUE[subControl.name] = value[subControl.name] || FALLBACK_ZERO;
					});

					return FIELD_VALUE;
				});
			}
		});

		return DEFAULT_VALUES;
	};

	const handleOptionsChange = useCallback(
		(vals) => {
			setAllChargeCodes((prevChargeCodes) => ({ ...prevChargeCodes, ...vals }));
		},
		[setAllChargeCodes],
	);

	const controls = services.map((service, index) => ({
		...rawControls(
			handleChange,
			service,
			info,
			isAdminSuperAdmin,
			shipment_data,
			index,
			TRADE_MAPPING,
		),
		onOptionsChange : handleOptionsChange,
		value           : (service?.line_items || []).map((item) => ({
			code             : item?.code,
			alias            : item?.alias,
			sac_code         : item?.hsn_code || 'NA',
			currency         : item?.currency,
			price_discounted : item?.price_discounted || '0',
			quantity         : item?.quantity || FALLBACK_ZERO,
			exchange_rate    : item?.exchange_rate || FALLBACK_ONE,
			tax_percent      : item?.tax_percent || FALLBACK_ZERO,
			unit             : item?.unit,
			total            : item?.tax_total_price_discounted || FALLBACK_ZERO,
			name             : item?.name,
			id               : item?.product_code,
		})),
	}));

	const defaultValues = generateDefaultValues({ values: controls });

	const { handleSubmit, control, setValue, watch, formState: { errors = {} } } = useForm({ defaultValues });

	const formValues = watch();

	const CUSTOM_VALUES = {};
	const prepareFormValues = () => {
		const allFormValues = { ...formValues };
		(Object.keys(formValues) || []).forEach((key) => {
			if (key && formValues?.[key]) {
				allFormValues[key] = (allFormValues[key] || []).map((value) => ({
					...value,
					tax      : selectedCodes[value.code]?.tax_percent || 'NA',
					sac_code : selectedCodes[value.code]?.sac || 'NA',
					total    : (value?.price_discounted || FALLBACK_ZERO) * (value?.quantity || FALLBACK_ZERO),
				}));
			}
		});

		return allFormValues;
	};

	const newFormValues = prepareFormValues(selectedCodes, formValues);
	const LABELS = {};
	Object.keys(controls?.[GLOBAL_CONSTANTS.zeroth_index]).forEach((key) => {
		CUSTOM_VALUES[key] = {
			formValues : newFormValues[key],
			label      : LABELS[key],
			id         : key,
		};
	});

	const onCreate = async (values) => {
		try {
			const PAYLOAD = [];
			Object.keys(values).forEach((key) => {
				const currentService = services.find(
					(serviceItem, index) => `${serviceItem.service_id}:${index}` === key,
				);
				const CHARGE_CODES = {};
				(allChargeCodes[currentService?.service_type] || []).forEach(
					(chgCode) => {
						CHARGE_CODES[chgCode.code] = chgCode;
					},
				);
				const service = {
					service_id   : currentService?.service_id,
					service_type : currentService?.service_type,
					line_items   : (values?.[key] || []).map((line_item) => ({
						code             : line_item?.code,
						alias            : line_item?.alias,
						name             : CHARGE_CODES[line_item?.code]?.name || line_item?.name,
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
			Toast.error(err?.data?.invoices);
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
