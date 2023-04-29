import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import fields from '../configurations/controls';

const useCreateOperators = ({
	setEdit,
	refetch,
	item,
	setPage,
	setFinalList,
	page,
}) => {
	const { control, watch, setValue, handleSubmit } = useForm();
	const [errors, setErrors] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/update_operator',
		method : 'POST',
	});

	const operatorType = watch('operator_type');

	const showElements = {
		iata_code          : operatorType === 'airline',
		icao_code          : operatorType === 'airline',
		airway_bill_prefix : operatorType === 'airline',
		is_nvocc           : operatorType === 'shipping_line',
	};

	const handleEditOperators = async (value) => {
		const data = {
			id       : item.id,
			...value,
			logo_url : value?.logo_url?.finalUrl || undefined,
		};

		try {
			await trigger({ data });
			Toast.success('Operator Updated Successfully');
			setFinalList([]);
			setEdit(false);
			if (page === 1) {
				refetch();
			} else {
				setPage(1);
			}
		} catch (error) {
			Toast.error(error?.data);
		}
	};
	const onError = (errs = {}) => {
		setErrors({ ...errs });
	};
	return {
		handleEditOperators,
		fields,
		control,
		setValue,
		handleSubmit,
		showElements,
		loading,
		onError,
		errors,
	};
};
export default useCreateOperators;
