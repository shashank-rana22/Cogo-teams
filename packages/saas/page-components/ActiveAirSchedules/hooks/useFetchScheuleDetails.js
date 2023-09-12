const useFetchScheduleDetails = async () => {
	let containsData;

	if (apiTries >= MAX_API_TRIES) {
		setLoadingForFirstVisit(false);
		return;
	}

	if (isFirstVisit && apiTries === 0) setLoadingForFirstVisit(true);

	try {
		const res = await useRequest({
			scope,
			method : 'get',
			url    : '/get_saas_air_schedule_subscription',
			params : {
				filters: {
					...prepareFilters(filters, scheduleDetails?.filter_data ?? {}),
				},
				page                 : pagination.page,
				page_limit           : pageLimit,
				performed_by_user_id : user_id,
				id,
				...(sortBy && { sort_type: 'asc', sort_by: sortBy }),
			},
		});

		const { data } = res;
		containsData = data.schedules.total > 0;

		setScheduleDetails(data);
		setMapPoints([
			{
				departure_lat  : data.origin_airport?.latitude,
				departure_long : data.origin_airport?.longitude,
				arrival_lat    : data.destination_airport?.latitude,
				arrival_long   : data.destination_airport?.longitude,
			},
		]);

		const carrierData = data?.schedules?.airlines || [];

		const arrList = carrierData.map((val, index) => ({
			id        : index,
			name      : val.short_name,
			status    : false,
			airLineId : val.id,
		}));

		const stops = data?.schedules.list || [];

		const maxStopsLocal = stops.sort((a, b) => (a.number_of_stops > b.number_of_stops ? -1 : 1))[0]?.number_of_stops;

		setCarrierList(arrList);

		setMaxStops(maxStopsLocal);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	} catch (err) {
		toast.error(err);
		setLoading(false);
	}

	if (isFirstVisit && containsData) {
		setApiTries(MAX_API_TRIES);
	} else if (isFirstVisit && !containsData) {
		await wait(WAIT_TIME);
		setApiTries(apiTries + 1);
	}
};
export default useFetchScheduleDetails;
