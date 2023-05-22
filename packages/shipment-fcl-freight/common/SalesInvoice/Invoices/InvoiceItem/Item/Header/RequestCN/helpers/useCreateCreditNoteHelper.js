import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import useCreateShipmentCreditNote from '../../../../../../../../hooks/useCreateShipmentCreditNote';
import formatCreditNoteData from '../../../../../../CreditNote/helpers/format-credit-note-data';

import creditNoteControls from './controls';

const useCreateCreditNoteHelper = ({
	services,
	invoice = {},
	servicesIDs = [],
	invoiceData = {},
	setOpen = () => {},
	refetchCN = () => {},
}) => {
	const controls = creditNoteControls({
		services,
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

	const { handleSubmit, control, watch, setValue, formState:{ errors = {} }, ...rest } =	useForm({ defaultValues });
	const formValues = watch();

	const updatedObj = {};

	Object.entries(formValues).forEach(([key, value]) => {
		switch (key) {
			case 'remarks':
			case 'uploadDocument':
				updatedObj[key] = value;
				break;
			default:
				updatedObj[key] = value?.map((_item) => ({
					..._item,
					total: _item.price_discounted * _item.quantity,
				}));
				break;
		}
	});

	const { apiTrigger } = useCreateShipmentCreditNote({});

	const onCreate = async (data) => {
		const { submit_data, checkError } = formatCreditNoteData({
			data,
			servicesIDs,
			invoice,
			invoiceData,
		});

		if (submit_data?.line_items?.length === 0) {
			Toast.error('Line Items is required');
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
			refetchCN();
		}
	};

	return {
		controls,
		handleSubmit,
		onCreate,
		errors,
		control,
		defaultValues: updatedObj,
		rest,
		setValue,
	};
};

export default useCreateCreditNoteHelper;
