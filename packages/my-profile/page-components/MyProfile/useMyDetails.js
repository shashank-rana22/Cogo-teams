import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useMyDetails = (partner_user_id) => {
	const [showMobileVerificationModal, setShowMobileVerificationModal] =		useState(false);

	const [changePasswordModal, setChangepasswordModal] = useState(false);

	const [{ loading = false, data }, trigger] = useRequest({
		url    : '/get_partner_user',
		method : 'GET',
	}, { manual: true });

	const profileDetailsApi = () => {
		trigger({
			params: { id: partner_user_id },
		});
	};

	useEffect(() => {
		profileDetailsApi();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		detailsData : data?.data,
		refetch     : profileDetailsApi,
		loading,
		showMobileVerificationModal,
		setShowMobileVerificationModal,
		changePasswordModal,
		setChangepasswordModal,
	};
};

export default useMyDetails;
