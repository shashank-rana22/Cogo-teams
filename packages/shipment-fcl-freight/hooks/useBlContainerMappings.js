import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import { controls } from '../configurations/get-container-controls';

const useBlContainerMappings = ({
	data = {},
	shipment_data = {},
	// setMappingModal = () => {},
	// refetch = () => {},
}) => {
	const [{ data: containerDetails },
		containerDetailTrigger] = useRequest({
		url    : '/list_shipment_container_details',
		method : 'GET',
	});

	const [{ loading: containerLoading },
		updateShipmentContainerTrigger] = useRequest({
		url    : '/update_shipment_container_details',
		method : 'POST',
	});

	const showElements = {};

	controls.forEach((controlObj, index) => {
		if (controlObj.type === 'fieldArray') {
			showElements[controlObj.name] = [];
			Array(data?.list?.length)
				.fill(null)
				.forEach(() => {
					const showElementFields = {};
					controlObj.controls.forEach((obj, ind) => {
						showElementFields[obj.name] = obj.show === true;
						if (controls[index].controls[ind].name === 'container_number') {
							controls[index].controls[ind].options = (
								containerDetails?.list || []
							).map((detailObj) => ({
								label : detailObj?.container_number,
								value : `${detailObj?.container_number}:${detailObj?.id}`,
							}));
						}
					});
					showElements[controlObj.name].push(showElementFields);
				});
		}
	});

	const [error, setError] = useState({});

	const onError = (err) => {
		setError(err);
	};

	const { control, handleSubmit, formState: { errors } } = useForm();

	// const selectedContainers = [];
	// (formValues.bl_details || []).forEach((singleVal) => {
	// 	selectedContainers.push(...singleVal.container_number);
	// });

	// useEffect(() => {
	// 	const containerValues = (data?.list || []).map((obj) => ({
	// 		bl_id            : obj.id,
	// 		bl_number        : obj?.bl_number,
	// 		container_number : '',
	// 		id               : '',
	// 	}));

	// 	setValue({ bl_details: containerValues });
	// }, [data, setValue]);

	useEffect(() => {
		(async () => {
			if (shipment_data?.id) {
				await containerDetailTrigger({
					params: { filters: { shipment_id: shipment_data?.id } },
				});
			}
		})();
	}, [containerDetailTrigger, shipment_data?.id]);

	// const updateDetails = async () => {
	// 	const update_data = [];
	// 	let totalContainerSelected = 0;
	// 	(formValues?.bl_details || []).forEach((blDetailObj) => {
	// 		totalContainerSelected += blDetailObj.container_number?.length;
	// 		(blDetailObj.container_number || []).forEach((containerVal) => {
	// 			const reqObj = {
	// 				id   : containerVal?.split(':')[1],
	// 				data : {
	// 					container_number : containerVal?.split(':')[0],
	// 					bl_number        : blDetailObj.bl_number,
	// 					bl_id            : blDetailObj.bl_id,
	// 				},
	// 			};
	// 			update_data.push(reqObj);
	// 		});
	// 	});
	// 	if (totalContainerSelected !== containerDetails?.list?.length) {
	// 		Toast.warn('Please Select All Containers !');
	// 		return;
	// 	}

	// 	const res = await updateShipmentContainerTrigger({ data: { update_data } });

	// 	if (!res?.hasError) {
	// 		Toast.success('Container Details Updated Successfully');
	// 		setMappingModal(false);
	// 		refetch();
	// 	}
	// };

	return {
		// updateDetails,
		onError,
		error,
		handleSubmit,
		containerLoading,
		controls,
		control,
		errors,
		showElements,
	};
};

export default useBlContainerMappings;
