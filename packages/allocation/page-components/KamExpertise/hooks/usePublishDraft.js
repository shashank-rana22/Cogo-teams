import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAllocationRequest } from '@cogoport/request';

const usePublishDraft = (props) => {
	const {
		setShowPublishModal,
		refetch,
		expertiseRefetch,
		cardRefetch,
		list,
		t = () => {},
	} = props;

	const draftData = list.filter((item) => item?.status === 'draft')?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { version_id = '' } = draftData;

	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : '/kam_expertise_publishability',
		authkey : 'post_allocation_kam_expertise_publishability',
	}, { manual: true });

	const onCreate = async () => {
		try {
			const payload = {
				status: 'live',
				version_id,
			};

			await trigger({
				data: payload,
			});

			setShowPublishModal(false);

			refetch();

			expertiseRefetch();

			cardRefetch();

			Toast.success(t('allocation:version_published_successfully_toast'));
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		onCreate,
		loading,
	};
};

export default usePublishDraft;
