import { useCallback, useEffect, useState } from 'react';

import { MAX_API_TRIES, FIRST_VISIT_MAPPING } from '../constant/trackingInfo';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const SHIPMENT_DATA_URL = {
	ocean : '/get_saas_container_subscription',
	air   : '/get_saas_air_subscription',
};
const wait = (time) => new Promise((res) => {
	setTimeout(() => {
		res();
	}, time);
});

const useGetShipmentInfo = () => {
	const { query } = useRouter();
	const [apiTries, setApiTries] = useState(0);
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
				await wait(1500);
				setApiTries((prev) => prev + 1);
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
