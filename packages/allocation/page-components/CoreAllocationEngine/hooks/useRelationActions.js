import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

import ACTIONS_STATUS_MAPPING from '../constants/relations-actions-status-mapping';
import getToastMessageMapping from '../constants/relations-toast-message-mapping';

const useRelationActions = ({
	confirmModalState = {},
	setConfirmModalState = () => {},
	checkedRowsId = [],
	onClearSelection = () => {},
	t = () => {},
}) => {
	const apiName =	confirmModalState.type === 'approve_all'
		? 'relation_bulk_approve'
		: 'relation_status';

	const authkey = confirmModalState.type === 'approve_all'
		? 'post_allocation_relation_bulk_approve' : 'post_allocation_relation_status';

	const toastMessageMapping = getToastMessageMapping({ t });

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

			Toast.success(`${toastMessageMapping[confirmModalState.type]}${' '}
			${t('allocation:please_wait_some_time_for_changes_reflected')}`);

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
