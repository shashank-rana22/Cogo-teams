import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import getFilterControls from '../utlis/get-filter-controls';
import getOptions from '../utlis/service-to-trade-type-mappings';

const useGetTermsAndCondition = () => {
	const {
		general: { scope },
	} = useSelector((state) => state);
	const [currentStatus, setCurrentStatus] = useState('active');
	const [editTncModalId, setEditTncModalId] = useState(null);
	const [tncLevel, setTncLevel] = useState('basicInfo');
	const [filters, setFilters] = useState({});

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_terms_and_conditions',
		method : 'get',
		scope,
	});

	const controls = getFilterControls();
	const {
		handleSubmit, control,
		watch,
	} = useForm();

	const watchTradeType = watch('trade_type');
	const watchService = watch('service');

	const newField = controls.map((field) => {
		const { name } = field;
		let newControl = { ...field };

		if (name === 'country_id') {
			newControl = {
				...newControl,

				label:
				(watchTradeType === 'import' && 'Import To')
				|| (watchTradeType === 'export' && 'Export From')
				|| 'Country',
			};
		}

		if (name === 'trade_type') {
			newControl = {
				...newControl,
				options: getOptions[watchService],
			};
		}
		return { ...newControl };
	});

	const getListTermsAndConditionsApi = () => {
		const params = {
			sort_by : 'updated_at',
			filters : {
				sort_by : 'updated_at',
				...filters,
				status  : currentStatus,
				type    : 'logistics_services',
			},
		};

		trigger({ params });
	};
	useEffect(() => {
		getListTermsAndConditionsApi();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentStatus, filters]);

	const { list = [], total_count: totalCount = 0 } = data || {};

	return {
		filterProps: {
			controls,
			control,
			newField,
			watch,
			handleSubmit,
			getListTermsAndConditionsApi,
		},
		list,
		data,
		totalCount,
		currentStatus,
		setCurrentStatus,
		editTncModalId,
		setEditTncModalId,
		tncLevel,
		setTncLevel,
		loading,
		filters,
		setFilters,
		refetchListApi: getListTermsAndConditionsApi,
	};
};

export default useGetTermsAndCondition;
