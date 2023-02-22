import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useCallback, useEffect } from 'react';

import COMPONENT_MAPPING from '../../../utils/component-mapping';

function useGetVendor() {
	const [activeStepper, setActiveStepper] = useState('vendor_details');

	const [vendorInformation, setVendorInformation] = useState({});

	const router = useRouter();

	const {
		general: { query },
	} = useSelector((state) => state);

	const { vendor_id } = query;

	const [{ loading: getVendorLoading = false }, trigger] = useRequest({
		url    : 'get_vendor',
		method : 'GET',
	}, { manual: true });

	const getVendor = useCallback(async () => {
		const res = await trigger({ params: { id: vendor_id } });

		setVendorInformation({
			...res.data,
			contact_details : res.data.pocs[0],
			payment_details : res.data.bank_details[0],
			vendor_services : {
				office_details: res.data.services,
			},
		});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trigger, vendor_id]);

	useEffect(() => {
		if (vendor_id) {
			getVendor();
		}
	}, [vendor_id, getVendor]);

	const { component: ActiveComponent } = COMPONENT_MAPPING.find((item) => item.key === activeStepper);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onBack = useCallback(() => router.push('/vendors-list'), []);

	return {
		ActiveComponent,
		activeStepper,
		setActiveStepper,
		vendorInformation,
		setVendorInformation,
		getVendor,
		getVendorLoading,
		onBack,
	};
}

export default useGetVendor;
