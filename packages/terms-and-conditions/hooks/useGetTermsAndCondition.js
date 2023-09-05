import { asyncFieldsLocations, asyncFieldsOperators, useForm, useGetAsyncOptions } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import getFilterControls from '../utlis/get-filter-controls';
import getShowElements from '../utlis/getShowElements';
import getOptions from '../utlis/service-to-trade-type-mappings';

let initialFilters = {
	status: 'active',
};

const useGetTermsAndCondition = ({ organizationId }) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const [pagination, setPagination] = useState(1);
	const [currentStatus, setCurrentStatus] = useState('active');
	const [editTncModalId, setEditTncModalId] = useState(null);
	const [tncLevel, setTncLevel] = useState('basicInfo');
	console.log('tncLevel', tncLevel, editTncModalId);
	// const { filters } = filterProps;
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_terms_and_conditions',
		method : 'get',
		scope,
	});
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

	initialFilters = {
		...initialFilters,
		service: watchService,
		// country  : watchCountry,
		// airline  : watchAirlineId,
		// paying   : watchPayingPartyCountry,
		// shipping : watchShippingLineId,

	};
	console.log(initialFilters, 'filter_hey');
	const shippingLineOptions = useGetAsyncOptions({
		...asyncFieldsOperators(),
		initialCall : true,
		params      : {
			filters: {
				operator_type: 'shipping_line',

			},
		},
	});
	const airLineOptions = useGetAsyncOptions({
		...asyncFieldsOperators(),
		initialCall : true,
		params      : {
			filters: {
				operator_type: 'airline',

			},
		},
	});
	const locationOptions = useGetAsyncOptions({
		...asyncFieldsLocations(),

	});
	const newField = controls.map((field) => {
		const { name } = field;
		let newControl = { ...field };
		if (name === 'shipping_line_id') {
			newControl = { ...newControl, ...shippingLineOptions };
		}
		if (name === 'airline_id') {
			newControl = { ...newControl, ...airLineOptions };
		}
		if (name === 'country_id') {
			newControl = {
				...newControl,
				...locationOptions,
				label:
				(watchTradeType === 'import' && 'Import To')
				|| (watchTradeType === 'export' && 'Export From')
				|| 'Country',
			};
		}
		if (name === 'paying_party_country_ids') {
			newControl = { ...newControl, ...locationOptions };
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

				...initialFilters,

				type: 'logistics_services',
			},
		};
		// console.log('params', params);
		trigger({ params });
	};
	useEffect(() => {
		getListTermsAndConditionsApi();

		initialFilters = {};
	}, [pagination, currentStatus]);

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
		refetchListApi: getListTermsAndConditionsApi,
	};
};

export default useGetTermsAndCondition;
