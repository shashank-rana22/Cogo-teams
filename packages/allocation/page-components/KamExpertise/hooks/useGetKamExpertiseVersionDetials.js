import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetKamExpertiseVersionDetials = (props) => {
	const {
		setResponseId,
		refetch,
		expertiseRefetch,
		cardRefetch,
		responseId,
		onPublish = '',
		setOnPublish,
	} = props;

	const [selectedVersion, setSelectedVersion] = useState('');
	const [mode, setMode] = useState('initial-mode');
	const [showModal, setShowModal] = useState(false);

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
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
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
		selectedVersion,
		setSelectedVersion,
		mode,
		setMode,
		showModal,
		setShowModal,
		CreateModalLoading: loading,
		getVersion,
	};
};

export default useGetKamExpertiseVersionDetials;
