/* eslint-disable no-param-reassign */
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import creditNoteControls from '../../helpers/controls';
import formatCreditNoteData from '../../helpers/format-credit-note-data';

const useCreateCreditNote = ({
	setShow = () => {},
	services,
	invoice = {},
	servicesIDs = [],
	refetchCN = () => {},
	isEdit = false,
	invoiceData = {},
}) => {
	const [errors, setError] = useState({});
	const [selectedCodes, setSelectedCodes] = useState({});
	const [allChargeCodes, setAllChargeCodes] = useState({});

	const handleChange = (obj) => {
		if (!selectedCodes[obj.code]) {
			setSelectedCodes({ ...selectedCodes, [obj.code]: obj });
		}
	};

	const controls = creditNoteControls({
		services,
		handleChange,
		setAllChargeCodes,
		allChargeCodes,
		isEdit,
	});
	const { handleSubmit, watch, setValue, control, ...rest } = useForm();
	const formValues = watch();

	const onError = (err) => {
		setError({ ...err });
	};
	const creditNoteApi = !isEdit
		? '/create_shipment_credit_note'
		: '/update_shipment_credit_note';

	// const useCreditNoteAPI = useRequest('post', false)(creditNoteApi);

	const labels = {};
	const customValues = {};
	const prepareFormValues = () => {
		const allFormValues = { ...formValues };
		(Object.keys(formValues) || []).forEach((key) => {
			if (key && formValues[key]) {
				allFormValues[key] = (
					(key !== 'remarks' && allFormValues[key])
					|| []
				).map((value) => ({
					...value,
					total: (value.price_discounted || 0) * (value.quantity || 0),
				}));
			}
		});

		return allFormValues;
	};

	const newFormValues = prepareFormValues(selectedCodes, formValues);

	Object.keys(controls).forEach((key) => {
		customValues[key] = {
			formValues : newFormValues[key],
			label      : labels[key],
			id         : key,
		};
	});

	controls.forEach((ctrl) => {
		if (ctrl.controls) {
			ctrl.controls.forEach((childCtrl) => {
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
					childCtrl.options = unitOptions;
				}
			});
		}
	});

	const onCreate = async (data) => {
		const { submit_data, checkError } = formatCreditNoteData({
			data,
			servicesIDs,
			invoice,
			invoiceData,
			isEdit,
		});

		if (submit_data?.line_items?.length === 0) {
			Toast.error('Line Items is required');
			return;
		}

		let isError = false;
		Object.keys(checkError).forEach((key) => {
			checkError[key].forEach((t) => {
				if (!isEmpty(t)) {
					isError = true;
				}
			});
		});

		if (isError === false) {
			setError({});
		} else {
			setError({ ...checkError });
		}

		// try {
		// 	const res = await useCreditNoteAPI.trigger({
		// 		data: submit_data,
		// 	});

		// 	if (!res.hasError) {
		// 		Toast.success(
		// 			!isEdit
		// 				? 'Credit Note Requested Successfully'
		// 				: 'Credit Note Updated Successfully',
		// 		);
		// 		setShow(false);
		// 		refetchCN();
		// 	}
		// } catch (err) {
		// 	Toast.error(err?.data?.invoice_number);
		// }
	};

	return {
		controls,
		handleSubmit,
		onCreate,
		errors,
		setError,
		onError,
		control,
		customValues,
		rest,
		setValue,
	};
};

export default useCreateCreditNote;
