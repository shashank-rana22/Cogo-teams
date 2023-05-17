import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateShipmentCreditNote from '../../../../hooks/useUpdateShipmentCreditNote';

import creditNoteControls from './controls';
import formatCreditNoteData from './format-credit-note-data';

const useCreateCreditNote = ({
	services,
	invoice = {},
	servicesIDs = [],
	isEdit = false,
	invoiceData = {},
	setOpen = () => {},
	refetch,
}) => {
	const [selectedCodes, setSelectedCodes] = useState({});
	const [allChargeCodes, setAllChargeCodes] = useState({});

	const { apiTrigger, loading } = useUpdateShipmentCreditNote({});

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
			await apiTrigger(submit_data);
			setOpen(false);
			refetch();
		}
	};

	return {
		controls,
		defaultValues,
		onCreate,
		loading,
	};
};

export default useCreateCreditNote;
