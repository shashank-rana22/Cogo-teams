import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

import controls from '../configurations/get-container-controls';

const useBlContainerMappings = ({
	data = {},
	setMappingModal = () => {},
	refetch = () => {},
	containerDetails = [],
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_container_details',
		method : 'POST',
	});

	const options = containerDetails.map((obj) => ({
		label : obj.container_number,
		value : `${obj.container_number}:${obj.id}`,
	}));

	const mutatedFields = [];

	(data || []).forEach((bl) => {
		const obj = {
			bl_number : bl?.bl_number,
			bl_id     : bl?.id,
			options,
		};
		mutatedFields.push(obj);
	});

	const defaultValues = {
		bl_mappings: mutatedFields.map((field) => ({
			bl_number : field.bl_number,
			bl_id     : field.bl_id,
		})),
	};

	const { control, handleSubmit, formState: { errors }, register } = useForm({ defaultValues });

	const onSubmit = async (value) => {
		const formValues = value.bl_mappings;
		const update_data = [];
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
				update_data.push(reqObj);
			});
		});
		if (totalContainerSelected !== containerDetails?.length) {
			Toast.error('Please Select All Containers !');
		}

		const res = await trigger({ data: { update_data } });

		if (res.status === 200) {
			Toast.success('Container Details Updated Successfully');
			setMappingModal(false);
			refetch();
		}
	};

	return {
		handleSubmit,
		loading,
		controls,
		control,
		errors,
		register,
		mutatedFields,
		onSubmit,
	};
};

export default useBlContainerMappings;
