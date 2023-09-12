// import { Toast } from '@cogoport/components';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
// import { useState, useEffect } from 'react';

// const MAX_API_TRIES = 3;
// const WAIT_TIME = 25 * 1000;
// const MAX_TIME = 60;

// const wait = (time) => new Promise((res) => {
// 	setTimeout(() => {
// 		res();
// 	}, time);
// });

// const useFetchScheduleDetails = ({ pageLimit = 10, id }) => {
// 	const {
// 		user_id,
// 		scope,
// 		isFirstVisit,
// 	} = useSelector(({ profile, general }) => ({
// 		user_id      : profile.user.id || null,
// 		scope        : general.scope,
// 		isFirstVisit : general?.query?.isFirstVisit,
// 	}));

// 	const [filters, setFilters] = useState({});
// 	const [sortBy, setSortBy] = useState(null);

// 	const [filterScheduleData] = useState({});
// 	const [carrierList, setCarrierList] = useState([]);

// 	const [{ data, loading }, trigger] = useRequest({
// 		method : 'get',
// 		scope,
// 		url    : '/get_saas_air_schedule_subscription',
// 	});

// 	useEffect(() => {
// 		trigger({
// 			params: { id },

// 		});
// 	}, [id]);
// 	console.log(data);
// 	return {
// 		loading,
// 		carrierList,
// 		filterScheduleData,
// 		filters,
// 		sortBy,
// 		MAX_TIME,
// 		setFilters,
// 		setSortBy,
// 		setCarrierList,
// 	};
// };

// export default useFetchScheduleDetails;
