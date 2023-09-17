import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

const useFetchScheduleDetails = ({
	pageLimit = 10, id, currentPage,
}) => {
	const {
		isFirstVisit,
		user_id,
	} = useSelector(({ general, profile }) => ({
		isFirstVisit : general?.query?.isFirstVisit,
		user_id      : profile?.user.id,
	}));

	const [filters, setFilters] = useState({});
	const [sortBy, setSortBy] = useState(null);
	const [scheduleDetails, setScheduleDetails] = useState({});
	const [carrierList, setCarrierList] = useState([]);
	const [activeFilter, setActiveFilter] = useState(false);
	const [mapPoints, setMapPoints] = useState([]);

	const [{ loading }, trigger] = useRequest({
		url    : '/get_saas_air_schedule_subscription',
		method : 'get',
	}, { manual: true });

	const fetchScheduleDetails = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						...filters,
					},
					page                 : currentPage,
					page_limit           : pageLimit,
					performed_by_user_id : user_id,
					id,
					...(sortBy && { sort_type: 'asc', sort_by: sortBy }),
				},
			});
			const { data } = res;
			const carrierData = data?.schedules?.airlines || [];
			const arrList = carrierData.map((val, index) => ({
				id        : index,
				name      : val.short_name,
				status    : false,
				airLineId : val.id,
				logo_url  : val?.logo_url,

			}));
			setCarrierList(arrList);
			setScheduleDetails(data);
			setMapPoints([
				{
					departure_lat  : data.origin_airport?.latitude,
					departure_long : data.origin_airport?.longitude,
					arrival_lat    : data.destination_airport?.latitude,
					arrival_long   : data.destination_airport?.longitude,
				},
			]);
		} catch (err) {
			console.error(err);
		}
	}, [currentPage, filters, id, pageLimit, user_id, sortBy, trigger]);

	const fetchFilterScheduleDetails = useCallback(async () => {
		const { transit_time = '', ...rest } = filters || {};
		try {
			setActiveFilter(true);
			const res = await trigger({
				params: {
					filters: {
						...rest,
						transit_time: transit_time === '0' ? undefined : transit_time,
					},
					page                 : currentPage,
					page_limit           : pageLimit,
					performed_by_user_id : user_id,
					id,
				},
			});

			const { data } = res;
			setScheduleDetails(data);
			setMapPoints([
				{
					departure_lat  : data.origin_airport?.latitude,
					departure_long : data.origin_airport?.longitude,
					arrival_lat    : data.destination_airport?.latitude,
					arrival_long   : data.destination_airport?.longitude,
				},
			]);
			setActiveFilter(false);
		} catch (err) {
			console.error(err);
		}
	}, [currentPage, filters, id, pageLimit, user_id, trigger]);

	useEffect(() => {
		if (!isFirstVisit) {
			fetchScheduleDetails();
		} else {
			fetchScheduleDetails(isFirstVisit);
		}
	}, [sortBy, fetchScheduleDetails, isFirstVisit]);
	useEffect(() => {
		if (!isEmpty(filters)) {
			fetchFilterScheduleDetails();
		}
	}, [filters, currentPage, fetchFilterScheduleDetails]);

	return {
		activeFilter,
		scheduleDetails,
		carrierList,
		filters,
		sortBy,
		setFilters,
		setActiveFilter,
		setSortBy,
		setCarrierList,
		loading,
		mapPoints,
		setMapPoints,
	};
};

export default useFetchScheduleDetails;
