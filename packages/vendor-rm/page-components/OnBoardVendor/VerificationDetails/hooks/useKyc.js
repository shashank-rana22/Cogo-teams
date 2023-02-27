import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

function useKyc({
	getVendor = () => {},
}) {
	const { general: { query } } = useSelector((state) => state);

	const { vendor_id } = query;

	const [showSuccessScreen, setShowSuccessScreen] = useState(false);

	const [isDeclarationAccepted, setIsDeclarationAccepted] = useState(false);

	useEffect(() => {
		getVendor();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [{ loading }, trigger] = useRequest({
		url    : '/submit_vendor_kyc',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async () => {
		await trigger({ data: { vendor_id, kyc_status: 'pending_verification', declaration_accepted_at: new Date() } });

		setShowSuccessScreen(true);
	};

	return {
		loading,
		onSubmit,
		isDeclarationAccepted,
		setIsDeclarationAccepted,
		showSuccessScreen,
	};
}

export default useKyc;
