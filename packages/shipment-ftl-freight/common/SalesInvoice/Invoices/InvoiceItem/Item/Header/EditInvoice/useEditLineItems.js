import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import rawControls from './rawControls';

const trade_mapping = {
	import : 'Destination',
	export : 'Origin',
};
const useEditLineItems = ({
	invoice,
	onClose,
	refetch,
	isFclFreight,
	shipment_data,
	info,
}) => {
	const services = invoice.services || [];

	const [selectedCodes, setSelectedCodes] = useState({});
	const [allChargeCodes, setAllChargeCodes] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/update_invoice_line_items',
		method : 'POST',
	}, { manual: true });

	const handleChange = (obj) => {
		if (!selectedCodes[obj?.code]) {
			setSelectedCodes({ ...selectedCodes, [obj?.code]: obj });
		}
	};

	const generateDefaultValues = ({ values }) => {
		const defaultValues = {};

		values.forEach((control) => {
			if (control.type === 'edit_service_charges') {
				defaultValues[control.name] = control.value.map((value) => {
					const fieldValue = {};
					control.controls.forEach((subControl) => {
						fieldValue[subControl.name] = value[subControl.name] || 0;
					});

					return fieldValue;
				});
			}
		});

		return defaultValues;
	};

	const controls = services.map((service, index) => ({
		...rawControls(
			handleChange,
			service,
			info,
			isFclFreight,
			shipment_data,
			index,
			trade_mapping,
		),
		onOptionsChange : (vals) => setAllChargeCodes({ ...allChargeCodes, ...vals }),
		value           : (service?.line_items || []).map((item) => ({
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
			id               : uuid(),
		})),
	}));

	const defaultValues = generateDefaultValues({ values: controls });

	const { handleSubmit, control, setValue, watch, formState: { errors = {} } } = useForm({ defaultValues });

	const formValues = watch();

	const customValues = {};
	const prepareFormValues = () => {
		const allFormValues = { ...formValues };
		(Object.keys(formValues) || []).forEach((key) => {
			if (key && formValues?.[key]) {
				allFormValues[key] = (allFormValues[key] || []).map((value) => ({
					...value,
					tax      : selectedCodes[value.code]?.tax_percent || 'NA',
					sac_code : selectedCodes[value.code]?.sac || 'NA',
					total    : (value?.price_discounted || 0) * (value?.quantity || 0),
				}));
			}
		});

		return allFormValues;
	};

	const newFormValues = prepareFormValues(selectedCodes, formValues);
	const labels = {};
	Object.keys(controls?.[0]).forEach((key) => {
		customValues[key] = {
			formValues : newFormValues[key],
			label      : labels[key],
			id         : key,
		};
	});
	controls.forEach((ctrl) => {
		if (ctrl?.controls) {
			(ctrl?.controls || []).forEach((childCtrl) => {
				if (childCtrl?.name === 'unit') {
					const unitOptions = {};
					(formValues[ctrl?.name] || []).forEach((item, i) => {
						const chargeCodes = {};
						(allChargeCodes[ctrl?.service_name] || []).forEach((chgCode) => {
							chargeCodes[chgCode?.code] = chgCode;
						});
						const updatedChildCtrl = { ...childCtrl, options: unitOptions };
						unitOptions[i] = (
							chargeCodes[item?.code]?.units || ['per_container']
						).map((unit) => ({
							label : startCase(unit),
							value : unit,
						}));
						Object.assign(childCtrl, updatedChildCtrl);
					});
				}
			});
		}
	});
	console.log({ allChargeCodes });

	const onCreate = (values) => {
		try {
			const payload = [];
			Object.keys(values).forEach((key) => {
				const currentService = services.find(
					(serviceItem, index) => `${serviceItem.service_id}:${index}` === key,
				);
				const chargeCodes = {};
				(allChargeCodes[currentService?.service_type] || []).forEach(
					(chgCode) => {
						chargeCodes[chgCode.code] = chgCode;
					},
				);
				const service = {
					service_id   : currentService?.service_id,
					service_type : currentService?.service_type,
					line_items   : (values?.[key] || []).map((line_item) => ({
						code             : line_item?.code,
						alias            : line_item?.alias,
						name             : chargeCodes[line_item?.code]?.name || line_item?.name,
						currency         : line_item?.currency,
						price_discounted : Number(line_item?.price_discounted),
						quantity         : Number(line_item?.quantity),
						unit             : line_item?.unit,
					})),
				};
				payload.push(service);
			});

			console.log({ values, payload });
			// const res = await trigger({
			// 	data: {
			// 		quotations             : payload,
			// 		shipment_id            : shipment_data?.id,
			// 		invoice_combination_id : invoice?.id || undefined,
			// 	},
			// });
			// if (!res.hasError) {
			// 	Toast.success('Line Items updated successfully!');
			// 	if (refetch) {
			// 		refetch();
			// 	}
			// 	if (onClose) {
			// 		onClose();
			// 	}
			// }
		} catch (err) {
			Toast.error(err?.data?.invoices);
		}
	};

	return {
		onCreate,
		handleSubmit,
		controls,
		loading,
		customValues,
		errors,
		control,
		setValue,
		watch,
		newFormValues,
	};
};

export default useEditLineItems;
