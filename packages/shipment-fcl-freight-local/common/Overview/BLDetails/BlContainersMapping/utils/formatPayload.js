import { Toast } from '@cogoport/components';

const formatPayload = ({ values, containerDetails }) => {
	const formValues = values.bl_mappings;
	const payload = [];
	let totalContainerSelected = 0;
	(formValues || []).forEach((blDetailObj) => {
		totalContainerSelected += blDetailObj.container_number?.length || 0;
		(blDetailObj.container_number || []).forEach((containerVal) => {
			const reqObj = {
				id   : containerVal?.split(':')[1],
				data : {
					container_number : containerVal?.split(':')[0],
					bl_number        : blDetailObj.bl_number,
					bl_id            : blDetailObj.bl_id,
				},
			};
			payload.push(reqObj);
		});
	});

	if (totalContainerSelected !== containerDetails?.length) {
		Toast.error('Please Select All Containers !');
	}

	return payload;
};

export default formatPayload;
