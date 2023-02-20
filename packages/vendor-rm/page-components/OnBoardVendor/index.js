import { Button, Stepper } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useCallback, useEffect } from 'react';

import TABS_MAPPING from '../../constants/tabs';
import COMPONENT_MAPPING from '../../utils/component-mapping';

import styles from './styles.module.css';

function OnBoardVendor() {
	const router = useRouter();

	const { general: { query } } = useSelector((state) => state);

	const { vendor_id } = query;

	const [{ loading: getVendorLoading = false }, trigger] = useRequest({
		url    : 'get_vendor',
		method : 'GET',
	}, { manual: true });

	const [activeStepper, setActiveStepper] = useState('vendor_services');

	const [vendorInformation, setVendorInformation] = useState({});

	const getVendor = useCallback(async () => {
		const res = await trigger({ params: { id: vendor_id } });

		setVendorInformation({
			...res.data,
			contact_details : res.data.pocs[0],
			payment_details : res.data.bank_details[0],
		});
	}, [vendor_id, trigger]);

	useEffect(() => {
		if (vendor_id) {
			getVendor();
		}
	}, [vendor_id, getVendor]);

	console.log('vendorInformation:: ', vendorInformation);

	const { component: ActiveComponent } = COMPONENT_MAPPING.find((item) => item.key === activeStepper);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onBack = useCallback(() => router.push('/vendors-list'), []);

	return (
		<div>
			<div className={styles.back_container}>
				<Button size="sm" themeType="secondary" onClick={onBack}>
					<IcMArrowBack fill="#221F20" style={{ marginRight: 4 }} />
				</Button>
				<div className={styles.back_text}>Back to Vendor Relationship Management</div>
			</div>
			<div className={styles.header}>Add New Vendor</div>
			<div className={styles.tab_container}>
				<Stepper
					active={activeStepper}
					setActive={setActiveStepper}
					items={TABS_MAPPING}
					shadowed
					arrowed
					style={{ background: '#FFFFFF', padding: '2px', margin: '-15px' }}
				/>
			</div>
			<div className={styles.form_container}>
				<ActiveComponent
					getVendor={getVendor}
					getVendorLoading={getVendorLoading}
					activeStepper={activeStepper}
					setActiveStepper={setActiveStepper}
					vendorInformation={vendorInformation}
					setVendorInformation={setVendorInformation}
				/>
			</div>
		</div>
	);
}

export default OnBoardVendor;
