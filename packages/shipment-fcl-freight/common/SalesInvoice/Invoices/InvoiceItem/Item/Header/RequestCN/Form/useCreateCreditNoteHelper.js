import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import formatCreditNoteData from '../../../../../../CreditNote/helpers/format-credit-note-data';
import creditNoteControls from '../helpers/controls';

const useCreateCreditNoteHelper = ({
	services,
	invoice = {},
	servicesIDs = [],
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
	const generateDefaultValues = ({ values }) => {
		const defaultValues = {};

		values.forEach((control) => {
			if (control.type === 'edit_service_charges') {
				defaultValues[control.name] = control.value.map((value) => {
					const fieldValue = {};

					control.controls.forEach((subControl) => {
						fieldValue[subControl.name] = value[subControl.name] || '';
					});

					return fieldValue;
				});
			}
		});

		return defaultValues;
	};

	const defaultValues = generateDefaultValues({ values: controls });

	const { handleSubmit, control, watch, setValue, ...rest } =	useForm({ defaultValues });
	const formValues = watch();

	const onError = (err) => {
		setError({ ...err });
	};

	const updatedObj = {};

	Object.entries(formValues).forEach(([key, value]) => {
		if (key === 'remarks') {
			updatedObj[key] = value;
		} else if (key === 'uploadDocument') {
			updatedObj[key] = value;
		} else {
			updatedObj[key] = value?.map((item) => ({
				...item,
				total: item.price_discounted * item.quantity,
			}));
		}
	});

	const onCreate = async (data) => {
		const { submit_data } = formatCreditNoteData({
			data,
			servicesIDs,
			invoice,
			invoiceData,
			isEdit,
		});

		if (submit_data?.line_items?.length === 0) {
			Toast.error('Line Items is required');
		}
	};

	return {
		controls,
		handleSubmit,
		onCreate,
		errors,
		setError,
		onError,
		control,
		defaultValues: updatedObj,
		rest,
		setValue,
	};
};

export default useCreateCreditNoteHelper;
