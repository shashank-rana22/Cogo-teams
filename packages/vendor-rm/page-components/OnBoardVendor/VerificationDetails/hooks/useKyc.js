import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

function useKyc({
	getVendor = () => {},
	setShowSuccessScreen,
}) {
	const { general: { query } } = useSelector((state) => state);

	const { vendor_id } = query;

	const [isDeclarationAccepted, setIsDeclarationAccepted] = useState(false);

	useEffect(() => {
		getVendor();
	}, [getVendor]);

	const [{ loading }, trigger] = useRequest({
		url    : '/submit_vendor_kyc',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async () => {
		await trigger({
			data: {
				vendor_id,
				kyc_status              : 'pending_verification',
				declaration_accepted_at : new Date(),
			},
		});

		Toast.success('KYC Submitted Successfully!');

		setShowSuccessScreen(true);
	};

	return {
		loading,
		onSubmit,
		isDeclarationAccepted,
		setIsDeclarationAccepted,
	};
}

export default useKyc;
