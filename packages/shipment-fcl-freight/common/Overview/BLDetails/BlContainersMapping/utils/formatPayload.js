import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const formatPayload = ({ values, containerDetails }) => {
	const formValues = values.bl_mappings;
	const PAYLOAD = [];

	let totalContainerSelected = 0;
	(formValues || []).forEach((blDetailObj) => {
		totalContainerSelected += blDetailObj.container_number?.length || GLOBAL_CONSTANTS.zeroth_index;
		(blDetailObj.container_number || []).forEach((containerVal) => {
			const reqObj = {
				id   : containerVal?.split(':')[GLOBAL_CONSTANTS.one],
				data : {
					container_number : containerVal?.split(':')[GLOBAL_CONSTANTS.zeroth_index],
					bl_number        : blDetailObj.bl_number,
					bl_id            : blDetailObj.bl_id,
				},
			};
			PAYLOAD.push(reqObj);
		});
	});

	if (totalContainerSelected !== containerDetails?.length) {
		Toast.error('Please Select All Containers !');
	}

	return PAYLOAD;
};

export default formatPayload;
