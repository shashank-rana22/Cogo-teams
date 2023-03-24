import { Toast } from '@cogoport/components';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetKamExpertiseVersionDetials = ({
	selectedVersion,
	setMode,
	setShowModal,
	mode,
	setResponseId,
	setSelectedVersion,
	refetch,
	expertiseRefetch,
	cardRefetch,
	responseId,
	onPublish = '',
	setOnPublish,
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
				setResponseId(res);
				setSelectedVersion('');
				Toast.success('Version selected successfully');
			}
		} catch (e) {
			console.log('erroe', e);
		}
	};

	useEffect(() => {
		if (responseId || onPublish) {
			refetch();
			expertiseRefetch();
			cardRefetch();
			setResponseId('');
			setOnPublish('');
		}
	}, [cardRefetch, expertiseRefetch, refetch, responseId, onPublish, setOnPublish, setResponseId]);

	return {
		CreateModalLoading: loading,
		getVersion,
	};
};

export default useGetKamExpertiseVersionDetials;
