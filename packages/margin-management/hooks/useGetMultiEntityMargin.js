import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import SERVICE_NAME_MAPPING from '../helpers/service-name-mapping';

const getPayload = (val) => Object.keys(val).map((item) => ({
	from  : item.split('_')?.[GLOBAL_CONSTANTS.zeroth_index],
	to    : item.split('_')?.[1],
	value : val[item],
}));

const options = Object.keys(SERVICE_NAME_MAPPING).map((key) => ({
	label : SERVICE_NAME_MAPPING[key],
	value : key,
}));

options.unshift({
	label           : 'GLOBAL SETTING',
	value           : 'global',
	backgroundColor : '#393f70',
	color           : '#fff',
});

function useGetMultiEntityMargin() {
	const [activeService, setActiveService] = useState('fcl_freight');

	const [showModal, setShowModal] = useState({});

	const [{ data }] = useRequest(
		{
			url    : '/list_cogo_entities',
			method : 'GET',
			params : { pagination_data_required: false, filters: { status: 'active' } },
		},
		{ manual: false },
	);

	const { control, watch, handleSubmit } = useForm();

	const formValues = watch();

	const onSubmit = async (values) => {
		try {
			const payload = getPayload(values);
			console.log('payload:: ', payload);
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		activeService,
		setActiveService,
		control,
		showModal,
		setShowModal,
		formValues,
		options,
		cogoEntitiesList: data?.list || [],
		handleSubmit,
		onSubmit,
	};
}

export default useGetMultiEntityMargin;
