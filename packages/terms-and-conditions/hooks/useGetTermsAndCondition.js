import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import getFilterControls from '../utlis/get-filter-controls';
import getShowElements from '../utlis/getShowElements';
import getOptions from '../utlis/service-to-trade-type-mappings';

let initialFilters = {

};

const useGetTermsAndCondition = ({ organizationId }) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const [pagination, setPagination] = useState(1);
	const [currentStatus, setCurrentStatus] = useState('active');
	const [editTncModalId, setEditTncModalId] = useState(null);
	const [tncLevel, setTncLevel] = useState('basicInfo');
	const [filters, setFilters] = useState({});

	const { page = 1, status = 'active' } = filters;
	// const { filters } = filterProps;
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_terms_and_conditions',
		method : 'get',
		scope,
	});
	console.log('filtersfilters', filters);
	const controls = getFilterControls();
	const {
		handleSubmit, getValues, control, formProps, formState: { errors },
		watch,
	} = useForm();

	const watchShippingLineId = watch('shipping_line_id');
	const watchCountry = watch('country');
	const watchAirlineId = watch('airline_id');
	const watchTradeType = watch('trade_type');
	const watchService = watch('service');
	const watchPayingPartyCountry = watch('paying_party_country_ids');

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

	const showElements = getShowElements({ service: watchService, trade_type: watchTradeType, controls });
	const getListTermsAndConditionsApi = () => {
		const params = {
			page    : pagination,
			sort_by : 'updated_at',
			filters : {
				page    : 1,
				sort_by : 'updated_at',
				...filters,
				...initialFilters,
				status  : currentStatus,
				type    : 'logistics_services',
			},
		};
		// console.log('params', params);
		trigger({ params });
	};
	useEffect(() => {
		getListTermsAndConditionsApi();
		// setFilters({});
		initialFilters = {};
	}, [pagination, currentStatus, filters]);

	const { list = [], total_count: totalCount = 0 } = data || {};

	return {
		filterProps: {
			controls,
			control,
			newField,
			watch,
			handleSubmit,
			// ...filterProps,
			getListTermsAndConditionsApi,
		},
		pagination,
		setPagination,
		list,
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
