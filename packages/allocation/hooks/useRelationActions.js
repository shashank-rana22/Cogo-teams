import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const TOAST_MESSAGE_MAPPING = {
	approve     : 'Request Approved',
	reject      : 'Request Rejected',
	delete      : 'Deleted',
	approve_all : 'Requests Approved',
};

const statusMapping = {
	approve : 'active',
	reject  : 'inactive',
	delete  : 'inactive',
};

const useRelationActions = ({
	confirmModalState = {},
	setConfirmModalState = () => {},
	checkedRowsId = [],
	// onResettingBulkMode,
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
					status : statusMapping[confirmModalState.type],
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

			// onResettingBulkMode();
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
