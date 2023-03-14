import { toast } from '@cogoport/front/components/admin';
import { useSelector } from '@cogo/store';
import { useFormCogo } from '@cogoport/front/hooks';
import formatDate from '@cogo/globalization/utils/formatDate';
import globals from '@cogo/globalization/constants/globals.json';
import { useRequest } from '@cogo/commons/hooks';
import getControls from '../TaskForm/controls';

const getError = ({ index = 0, dateError = '' }) => {
	const errObj = {
		type: 'custom',
		ref: { name: `container.${index}.picked_up_from_yard_at` },
	};
	if (dateError === 'Invalid Date') {
		errObj.message = dateError;
	} else if (dateError === 'maxDate') {
		errObj.message = `Date cannot be greater than ${formatDate({
			date: new Date(),
			formatType: 'date',
			dateFormat: globals.formats.date['dd MMM yyyy'],
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

	const modifiedData = (data || []).map((item) => {
		return {
			id: item?.id,
			data: {
				bl_id: (bl_details || [])?.find(
					(bl_item) => bl_item?.bl_number === item?.bl_number,
				)?.id,
				bl_number: item?.bl_number,
				container_number: item?.container_number,
				picked_up_from_yard_at: item?.picked_up_from_yard_at,
			},
		};
	});

	const formattedData = {
		id: pendingTask.id,
		data: {
			container_detail: {
				update_data: modifiedData,
			},
		},
	};
	if (pendingTask?.service_type) {
		formattedData.data[pendingTask.service_type] = {
			id: (services || []).find(
				(service) => service.service_type === pendingTask.service_type,
			)?.id,
		};
	}

	return formattedData;
};

const useContainerPickup = ({
	apis_data,
	onCancel,
	pendingTask,
	services,
	refetch,
	timeLineRefetch,
	customDateFormat,
}) => {
	const { scope } = useSelector(({ general }) => general);

	const updatePendingTask = useRequest(
		'post',
		false,
		scope,
	)('update_shipment_pending_task');

	const { modifiedControls, showElements } = getControls({ apis_data });

	const {
		fields,
		formState: { errors },
		handleSubmit,
		watch,
		setValues,
		setError,
	} = useFormCogo(modifiedControls);

	const formValues = watch();

	const handleFillData = (data) => {
		const trimmedData = data.replace(/ +(?=\t)/g, '');
		const valArray = (trimmedData.split(' ') || []).filter(Boolean);

		const containerError = [];
		const containerDetails = (formValues?.container || []).map(
			(item, index) => {
				const [num, date] = (valArray[index] || '').split('\t');
				const pickup_date = getDate(date, customDateFormat);
				const invalidDate = pickup_date.toDateString() === 'Invalid Date';

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
							container_number: num,
							picked_up_from_yard_at: undefined,
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

		setValues({ container: containerDetails });
		if (containerError.length > 0) {
			setError('container', containerError);
		}
	};

	const onSubmit = async (data) => {
		const formattedData = formatData(
			data.container,
			apis_data,
			pendingTask,
			services,
		);

		try {
			const res = await updatePendingTask.trigger({
				data: formattedData,
			});

			if (!res.hasError) {
				toast.success('Task updated successfully');
				onCancel();
				refetch();
				timeLineRefetch();
			} else {
				toast.error('Something went wrong');
			}
		} catch (err) {
			toast.error(err?.data?.message || err?.error?.message);
		}
	};

	return {
		formProps: {
			fields,
			errors,
			modifiedControls,
			showElements,
			handleSubmit,
			onSubmit,
		},
		handleFillData,
		loading: updatePendingTask.loading,
	};
};

export default useContainerPickup;
