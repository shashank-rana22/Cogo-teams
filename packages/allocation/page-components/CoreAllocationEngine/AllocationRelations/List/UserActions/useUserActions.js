import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

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

const useUserActions = ({
	confirmModalState = {},
	setConfirmModalState = () => {},
	checkedRowsId = [],
	fetchList = () => {},
}) => {
	const apiName =		confirmModalState.type === 'approve_all'
		? 'bulk_approve_allocation_relations'
		: 'update_allocation_relation';

	const UpdateAllocationRelationsAPI = useRequest({
		url    : `/${apiName}`,
		method : 'post',
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

			Toast.success(`${TOAST_MESSAGE_MAPPING[confirmModalState.type]} successfully!`);

			fetchList();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		handleUpdateRelation,
		loadingUpdateRelations: loading,
	};
};

export default useUserActions;
