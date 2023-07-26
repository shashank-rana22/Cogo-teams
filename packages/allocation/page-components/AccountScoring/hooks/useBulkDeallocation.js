import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';

const DEFAULT_CHECKED_ACCOUNT = 1;

const useBulkDeallocation = ({
	modalDetailsArray,
	setShowDeallocateModal,
	setCheckedRowsId = () => {},
	setModalDetailsArray = () => {},
	refetch = () => {},
}) => {
	const isSingleSelected = modalDetailsArray.length === DEFAULT_CHECKED_ACCOUNT;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/engagement_scoring_account_bulk_deallocation',
		method  : 'POST',
		authkey : 'post_allocation_engagement_scoring_account_bulk_deallocation',
	}, { manual: true });

	const onDeallocate = async () => {
		try {
			const payload = { service_user_ids: modalDetailsArray?.map((item) => item.service_user_id) || undefined };

			await trigger({ data: payload });

			setShowDeallocateModal(false);
			setCheckedRowsId([]);
			setModalDetailsArray([]);
			refetch();

			Toast.success(isSingleSelected
				? `${modalDetailsArray[GLOBAL_CONSTANTS.zeroth_index].business_name} was successfully de-allocated`
				: `${modalDetailsArray.length} Users were successfully de-allocated `);
		} catch (error) {
			Toast.error(error.message);
		}
	};

	return {
		onDeallocate,
		loading,
	};
};

export default useBulkDeallocation;
