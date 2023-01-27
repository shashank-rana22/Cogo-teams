import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import fields from '../configurations/controls';

const useCreateOperators = ({
	setShow,
	refetch,
	setPage,
	setFinalList,
	setShowLoading,
	page,
}) => {
	const { control, watch, handleSubmit } = useForm();
	const [errors, setErrors] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/create_operators',
		method : 'POST',
	});

	const operator_type = watch('operator_type');

	const showElements = {
		iata_code          : operator_type === 'airline',
		icao_code          : operator_type === 'airline',
		airway_bill_prefix : operator_type === 'airline',
		status             : false,
		is_nvocc           : operator_type === 'shipping_line',
	};

	const handleCreateOperators = async (value) => {
		let is_nvocc;
		if (value.is_nvocc) {
			is_nvocc = value.is_nvocc === 'true';
		}
		const data = {
			...value,
			logo_url : value.logo_url.url,
			is_nvocc,
			status   : 'active',
		};

		try {
			await trigger({ data });
			Toast.success('Operators Added Successfully');
			setFinalList([]);
			setShow(false);
			setShowLoading(true);
			if (page === 1) {
				refetch();
			} else {
				setPage(1);
			}
		} catch (error) {
			Toast.error(error.data);
		}
	};
	const onError = (errs = {}) => {
		setErrors({ ...errs });
	};
	return {
		control,
		fields,
		handleCreateOperators,
		handleSubmit,
		showElements,
		loading,
		onError,
		errors,
	};
};
export default useCreateOperators;
