import { Toast } from '@cogoport/components';
import { useAllocationRequest } from '@cogoport/request';

const useGetKamExpertiseVersionDetials = ({
	selectedVersion,
	setMode,
	setShowModal,
	mode,
	setResponseId,
	setSelectedVersion,
}) => {
	const [{ loading = false }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_version_configurations',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_version_configurations',
	}, { manual: true });

	const getVersion = async () => {
		try {
			const payload = {
				action_type    : mode,
				version_number : selectedVersion || undefined,
			};
			const res = await trigger({ params: payload });

			if (!res.hasError) {
				setMode('initial-mode');
				setShowModal(false);
				setResponseId(res?.id);
				setSelectedVersion('');
				Toast.success('Version selected successfully');
			}
		} catch (e) {
			Toast.error(e?.response?.data?.error || 'Unable to Save, Please try again!!');
		}
	};

	return {
		CreateModalLoading: loading,
		getVersion,
	};
};

export default useGetKamExpertiseVersionDetials;
