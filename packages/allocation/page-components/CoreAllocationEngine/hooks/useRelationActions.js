import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import ACTIONS_STATUS_MAPPING from '../constants/relations-actions-status-mapping';
import TOAST_MESSAGE_MAPPING from '../constants/relations-toast-message-mapping';

const useRelationActions = ({
	confirmModalState = {},
	setConfirmModalState = () => {},
	checkedRowsId = [],
	onClearSelection = () => {},
}) => {
	const apiName =	confirmModalState.type === 'approve_all'
		? 'relation_bulk_approve'
		: 'relation_status';

	const authkey = confirmModalState.type === 'approve_all'
		? 'post_allocation_relation_bulk_approve' : 'post_allocation_relation_status';

	const UpdateAllocationRelationsAPI = useAllocationRequest({
		url    : `/${apiName}`,
		method : 'post',
		authkey,
	}, { manual: true });

	const [{ loading }, trigger] = UpdateAllocationRelationsAPI;

	const handleUpdateRelation = async () => {
		try {
			const payload = {
				...(confirmModalState.type === 'approve_all' && {
					allocation_relation_ids: checkedRowsId,
				}),
				...(confirmModalState.type !== 'approve_all' && {
					id     : confirmModalState.relationData.id,
					status : ACTIONS_STATUS_MAPPING[confirmModalState.type],
				}),
			};
			await trigger({ data: payload });

			setConfirmModalState(() => ({
				type                  : '',
				showConfirmationModal : false,
				relationData          : {},
			}));

			Toast.success(`${TOAST_MESSAGE_MAPPING[confirmModalState.type]} successfully! Please wait 
			for the changes to be reflected`);

			onClearSelection();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		handleUpdateRelation,
		loadingUpdateRelations: loading,
	};
};

export default useRelationActions;
