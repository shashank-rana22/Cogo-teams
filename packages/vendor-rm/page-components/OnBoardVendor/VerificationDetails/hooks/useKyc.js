import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

function useKyc({
	getVendor = () => {},
}) {
	const {
		general: {
			query,
		},
	} = useSelector((state) => state);

	const { vendor_id } = query;

	const [showSuccessScreen, setShowSuccessScreen] = useState(false);

	useEffect(() => {
		getVendor();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_vendor',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async () => {
		await trigger({ data: { id: vendor_id, kyc_status: 'pending' } });

		setShowSuccessScreen(true);
	};

	return {
		loading,
		onSubmit,
		showSuccessScreen,
	};
}

export default useKyc;
