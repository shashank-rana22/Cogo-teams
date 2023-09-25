import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useEffect, useState } from 'react';

import { mergeAirMilestone, mergeOceanMilestone, mergeSurfaceMilestone } from '../utlis/mergeMilestone';

const useGetCurrentInfo = ({ data = {}, trackingType }) => {
	const { tracking_data:trackingInfo = [] } = data?.data?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	const { list:surfaceList = [] } = data || {};
	const { data : airList = [] } = data || {};
	const [combineMileStoneList, setCombineMileStoneList] = useState([]);

	useEffect(() => {
		let combineList = [];

		if (trackingType === 'ocean') {
			combineList = mergeOceanMilestone(trackingInfo);
		} else if (trackingType === 'air') {
			combineList = mergeAirMilestone(airList);
		} else {
			combineList = mergeSurfaceMilestone(surfaceList);
		}
		setCombineMileStoneList(combineList);
	}, [trackingType, data]);

	return {
		combineMileStoneList,

	};
};

export default useGetCurrentInfo;
