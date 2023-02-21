import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useKyc({
	getVendor = () => {},
}) {
	const [showSuccessScreen, setShowSuccessScreen] = useState(false);

	useEffect(() => {
		getVendor();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_vendor_kyc',
		method : 'POST',
	}, { manual: true });

	const onSubmit = () => {
		setShowSuccessScreen(true);
	};

	return {
		loading,
		trigger,
		onSubmit,
		showSuccessScreen,
	};
}

export default useKyc;
