import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useCallback, useEffect } from 'react';

import TABS_MAPPING from '../../../constants/tabs';
import COMPONENT_MAPPING from '../../../utils/component-mapping';

function useGetVendor() {
	const router = useRouter();

	const {
		general: { query },
	} = useSelector((state) => state);

	const { vendor_id } = query;

	const [activeStepper, setActiveStepper] = useState('vendor_details');
	const [vendorInformation, setVendorInformation] = useState({});
	const [showSuccessScreen, setShowSuccessScreen] = useState(false);

	const [{ loading: getVendorLoading = false }, trigger] = useRequest({
		url    : 'get_vendor',
		method : 'GET',
	}, { manual: true });

	const getVendor = useCallback(async () => {
		try {
			const res = await trigger({ params: { id: vendor_id } });

			setVendorInformation({
				...res.data,
				contact_details : res.data?.pocs[0],
				payment_details : res.data?.bank_details[0],
				vendor_services : res.data?.services,
			});

			if (res.data.vendor_details.kyc_status === 'pending_verification') {
				const href = '/vendors/[vendor_id]';
				const as = `/vendors/${res.data?.vendor_details?.id}`;

				router.push(href, as);
			}
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	}, [router, trigger, vendor_id]);

	useEffect(() => {
		if (vendor_id) {
			getVendor();
		}
	}, [getVendor, vendor_id]);

	useEffect(() => {
		const componentKeys = TABS_MAPPING.map((mapping) => mapping.key);

		const emptyVendorInformationTab = componentKeys.find((key) => !vendorInformation[key]
		|| isEmpty(vendorInformation[key])) || 'vendor_details';

		setActiveStepper(emptyVendorInformationTab);
	}, [getVendorLoading, vendorInformation]);

	const { component: ActiveComponent } = COMPONENT_MAPPING.find((item) => item.key === activeStepper);

	const onBack = useCallback(() => router.push('/vendors'), [router]);

	return {
		ActiveComponent,
		activeStepper,
		setActiveStepper,
		vendorInformation,
		setVendorInformation,
		getVendor,
		getVendorLoading,
		showSuccessScreen,
		setShowSuccessScreen,
		onBack,
	};
}

export default useGetVendor;
