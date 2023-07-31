import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

const useGetSchedules = (service) => {
	const { spot_search_id } = useSelector(({ general }) => general.query);

	const [state, setState] = useState({
		loading        : true,
		scheduleObject : {},
	});

	const [{ loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_spot_search_schedules',
	}, { manual: true });

	const getSchedules = () => {
		trigger({
			params: {
				spot_search_id,
			},
		})
			.then((response) => {
				const data = response.data || {};
				const obj = {};

				data.list.forEach((item) => {
					let objKey = '';

					switch (service) {
						case 'fcl_freight':
							objKey = item.shipping_line_id;
							break;
						case 'air_freight':
							objKey = item.airline_id;
							break;
						default:
					}

					obj[objKey] = item;
				});

				setState({
					loading        : false,
					scheduleObject : obj,
				});
			})
			.catch(() => {
				setState({
					...state,
					loading: false,
				});
			});
	};

	useEffect(() => {
		getSchedules();
	}, []);

	const refetch = (isSetLoading = false) => {
		setState((prevState) => ({
			...prevState,
			loading: isSetLoading ? true : prevState.loading,
		}));
		getSchedules();
	};

	console.log('state', state);

	return { ...state, refetch, loading };
};

export default useGetSchedules;
