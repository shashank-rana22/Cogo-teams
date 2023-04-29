import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import getCreateRelationsControls from '../configurations/get-create-relation-controls';

const useCreateRelations = ({ setShowCreateRelationModal = () => {}, fetchList = () => {} }) => {
	const controls = getCreateRelationsControls();

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/relation',
		method  : 'POST',
		authkey : 'post_allocation_relation',
	}, { manual: true });

	const formProps = useForm({
		defaultValues: {
			relation_type: 'keep',
		},
	});

	const { handleSubmit, watch } = formProps;

	const organizationId = watch('service_id');

	const mutatedControls = controls.map((control) => {
		let newControl = { ...control };

		if (newControl.name === 'service_user_id' && organizationId) {
			newControl = {
				...newControl,
				params: {
					filters: {
						organization_id: organizationId,
					},
					pagination_data_required: false,
				},
				disabled: false,
			};
		}

		return newControl;
	});

	const onCreate = async (values = {}) => {
		try {
			const payload = {
				...values,
				source       : 'agent',
				service_type : 'organization',
			};

			await trigger({
				data: payload,
			});

			fetchList();

			setShowCreateRelationModal(false);

			Toast.success('Allocation Relation Created Successfully!');
		} catch (err) {
			Toast.error(getApiErrorString(err.response.data));
		}
	};

	return {
		controls: mutatedControls,
		formProps,
		onCreate,
		handleSubmit,
		loading,
	};
};

export default useCreateRelations;
