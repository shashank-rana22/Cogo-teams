import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { mergeAirMilestone, mergeOceanMilestone } from '../utils/mergeMilestone';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const useGetCurrentInfo = ({ data = {}, trackingType }) => {
	const { data: trackingInfo = [] } = data || {};

	const [currContainerDetails, setCurrContainerDetails] = useState({});
	const [combineMileStoneList, setCombineMileStoneList] = useState({});

	useEffect(() => {
		const { container_details = [], airway_bill_details = {} } = data || {};

		if (!isEmpty(container_details) || !isEmpty(airway_bill_details)) {
			setCurrContainerDetails(container_details?.[0] || airway_bill_details);
		}
	}, [data, setCurrContainerDetails]);

	useEffect(() => {
		let combineList = [];

		const currentTracking = trackingInfo.filter(
			(item) => item?.container_no === currContainerDetails?.container_no,
		)?.[GLOBAL_CONSTANTS.zeroth_index];

		if (trackingType === 'ocean') {
			const { tracking_data = [] } = currentTracking || {};

			combineList = mergeOceanMilestone(tracking_data);
		} else {
			combineList = mergeAirMilestone(trackingInfo);
		}

		setCombineMileStoneList(combineList);
	}, [currContainerDetails, trackingInfo, trackingType]);

	return {
		combineMileStoneList,
		currContainerDetails,
		setCurrContainerDetails,
	};
};

export default useGetCurrentInfo;
