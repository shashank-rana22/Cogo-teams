import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import globals from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

import getControls from '../common/Tasks/TaskExecution/CustomTasks/UpdateContainerDetails/TaskForm/controls';

const getError = ({ index = 0, dateError = '' }) => {
	const errObj = {
		type : 'custom',
		ref  : { name: `container.${index}.picked_up_from_yard_at` },
	};

	if (dateError === 'Invalid Date') {
		errObj.message = dateError;
	} else if (dateError === 'maxDate') {
		errObj.message = `Date cannot be greater than ${formatDate({
			date       : new Date(),
			formatType : 'date',
			dateFormat : globals.formats.date['dd MMM yyyy'],
		})}`;
	}

	return errObj;
};

const getDate = (inputDate, customDateFormat) => {
	let returnDate;

	if (inputDate && customDateFormat) {
		let [date, month, ...rest] = (inputDate || '').split('/');

		if (!month) {
			[date, month, ...rest] = (inputDate || '').split('-');
		}

		returnDate = new Date([month, date, ...rest].join('/'));
	} else {
		returnDate = new Date(inputDate);
	}

	return returnDate;
};

const formatData = (data, apis_data, pendingTask, services) => {
	const bl_details = apis_data.list_shipment_bl_details;

	const modifiedData = (data || [])?.map((item) => ({
		id   : item?.id,
		data : {
			bl_id: (bl_details || [])?.find(
				(bl_item) => bl_item?.bl_number === item?.bl_number,
			)?.id,
			bl_number              : item?.bl_number,
			container_number       : item?.container_number,
			picked_up_from_yard_at : item?.picked_up_from_yard_at,
		},
	}));

	const formattedData = {
		id   : pendingTask?.id,
		data : {
			container_detail: {
				update_data: modifiedData,
			},
		},
	};

	if (pendingTask?.service_type) {
		formattedData.data[pendingTask?.service_type] = {
			id: (services || []).find(
				(service) => service?.service_type === pendingTask?.service_type,
			)?.id,
		};
	}

	return formattedData;
};

const useContainerDetails = ({
	apis_data = {},
	onCancel = () => {},
	pendingTask = {},
	services = [],
	taskListRefetch = () => {},
	customDateFormat,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const { modifiedControls, showElements } = getControls({ apis_data });

	const defaultValues = {
		container: [],
	};

	apis_data?.list_shipment_container_details?.forEach((container) => {
		defaultValues.container.push({
			id                     : container?.id,
			bl_id                  : '',
			bl_number              : '',
			container_number       : '',
			picked_up_from_yard_at : '',
		});
	});

	const { control, watch, setValue, formState:{ errors = {} }, handleSubmit, setError } = useForm({
		defaultValues,
	});

	const formValues = watch();

	const handleFillData = (data) => {
		const trimmedData = data?.replace(/ +(?=\t)/g, '');

		const valArray = (trimmedData?.split(' ') || [])?.filter(Boolean);

		const containerError = [];

		const containerDetails = (formValues?.container || []).map(
			(item, index) => {
				const [num, date] = (valArray[index] || '').split('\t');

				const pickup_date = getDate(date, customDateFormat);

				const invalidDate = pickup_date?.toDateString() === 'Invalid Date';

				if (num) {
					if (date && (invalidDate || pickup_date > new Date())) {
						containerError[index] = {
							picked_up_from_yard_at: getError({
								index,
								dateError: invalidDate ? 'Invalid Date' : 'maxDate',
							}),
						};

						return {
							...item,
							container_number       : num,
							picked_up_from_yard_at : undefined,
						};
					}
					return {
						...item,
						container_number: num,
						...(date && { picked_up_from_yard_at: pickup_date }),
					};
				}
				return item;
			},
		);

		setValue('container', containerDetails);

		if (containerError.length > 0) {
			setError('container', containerError);
		}
	};

	const onSubmit = async (data) => {
		const formattedData = formatData(
			data?.container,
			apis_data,
			pendingTask,
			services,
		);

		try {
			const res = await trigger({
				data: formattedData,
			});

			if (!res.hasError) {
				Toast.success('Task updated successfully');

				onCancel();

				taskListRefetch();
			} else {
				Toast.error('Something went wrong');
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		formProps: {
			control,
			errors,
			modifiedControls,
			showElements,
			handleSubmit,
			onSubmit,
		},
		handleFillData,
		loading,
	};
};

export default useContainerDetails;
