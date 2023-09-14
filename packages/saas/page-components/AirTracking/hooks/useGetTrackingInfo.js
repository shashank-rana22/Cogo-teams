import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import { MAX_API_TRIES, FIRST_VISIT_MAPPING } from '../constant/trackingInfo';

const SHIPMENT_DATA_URL = {
	ocean : '/get_saas_container_subscription',
	air   : '/get_saas_air_subscription',
};
const wait = (time) => new Promise((res) => {
	setTimeout(() => {
		res();
	}, time);
});

const WAIT_TIME = 1500;
const INCREMENT = 1;
const ZERO = 0;

const useGetShipmentInfo = () => {
	const { query } = useRouter();
	const [apiTries, setApiTries] = useState(ZERO);
	const { trackingType = '', trackingId = '', isFirstVisit: firstVisitBool = 'false' } = query;

	const isFirstVisit = FIRST_VISIT_MAPPING[firstVisitBool];

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : SHIPMENT_DATA_URL[trackingType],
		params : {
			id: trackingId,
		},
	}, { manual: isFirstVisit });

	const fetchTrackerDetails = useCallback(async () => {
		if (apiTries === MAX_API_TRIES) return;
		try {
			const resp = await trigger({});
			const trackerData = resp?.data ?? {};

			const isDataFound = trackerData?.tracking_status === 'Found';

			if (isDataFound) setApiTries(MAX_API_TRIES);
			else {
				await wait(WAIT_TIME);
				setApiTries((prev) => prev + INCREMENT);
			}
		} catch (err) {
			console.error(err);
		}
	}, [apiTries, trigger]);

	useEffect(() => {
		if (isFirstVisit) {
			fetchTrackerDetails();
		}
	}, [apiTries, fetchTrackerDetails, isFirstVisit]);

	return {
		data,
		trackingType,
		loading: !isFirstVisit ? loading : apiTries !== MAX_API_TRIES,
	};
};

export default useGetShipmentInfo;
