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

	const [{ loading: getVendorLoading = false }, trigger] = useRequest({
		url    : 'get_vendor',
		method : 'GET',
	}, { manual: true });

	const getVendor = async () => {
		try {
			const res = await trigger({ params: { id: vendor_id } });

			setVendorInformation({
				...res.data,
				contact_details : res.data.pocs[0],
				payment_details : res.data.bank_details[0],
				vendor_services : res.data.services,
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	useEffect(() => {
		if (vendor_id) {
			getVendor();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const componentKeys = (TABS_MAPPING || []).map((mapping) => mapping.key);

		const emptyVendorInformationTab = componentKeys.find((key) => !vendorInformation[key]
		|| isEmpty(vendorInformation[key])) || 'vendor_details';

		setActiveStepper(emptyVendorInformationTab);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getVendorLoading]);

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
