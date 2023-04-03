import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useSetVersionFilter = (props) => {
	const {
		refetch,
		expertiseRefetch,
		cardRefetch,
	} = props;

	const [selectedVersion, setSelectedVersion] = useState({});
	const [mode, setMode] = useState('initial-mode');
	const [showModal, setShowModal] = useState(false);
	const [versionName, setVersionName] = useState('');

	const [{ loading = false }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_version_configurations',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_version_configurations',
	}, { manual: true });

	const onCreate = async () => {
		try {
			const payload = {
				version_id : selectedVersion?.version_id || undefined,
				name       : versionName,
			};

			await trigger({ params: payload });

			setMode('initial-mode');

			setShowModal(false);

			refetch();

			expertiseRefetch();

			cardRefetch();

			setSelectedVersion({});

			Toast.success('Version selected successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		selectedVersion,
		setSelectedVersion,
		mode,
		setMode,
		showModal,
		setShowModal,
		createModalLoading: loading,
		onCreate,
		versionName,
		setVersionName,
	};
};

export default useSetVersionFilter;
