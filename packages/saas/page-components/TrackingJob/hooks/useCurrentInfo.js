import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useMemo } from 'react';

import { mergeAirMilestone, mergeOceanMilestone, mergeSurfaceMilestone } from '../utlis/mergeMilestone';

const useGetCurrentInfo = ({ data = {}, trackingType }) => {
	const combineMileStoneList = useMemo(() => {
		let combineList = [];
		if (trackingType === 'ocean') {
			const { tracking_data:trackingInfo = [] } = data?.data?.[GLOBAL_CONSTANTS.zeroth_index] || {};

			combineList = mergeOceanMilestone(trackingInfo);
		} else if (trackingType === 'air') {
			const { data : airList = [] } = data || {};
			combineList = mergeAirMilestone(airList);
		} else {
			const { list:surfaceList = [] } = data || {};
			combineList = mergeSurfaceMilestone(surfaceList);
		}

		return combineList;
	}, [data, trackingType]);

	return {
		combineMileStoneList,
	};
};

export default useGetCurrentInfo;
