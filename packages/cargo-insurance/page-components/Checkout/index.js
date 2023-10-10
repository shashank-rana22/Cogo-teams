import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import FormItem from '../../common/FormItem';
import Header from '../../common/Header';
import { getRegistrationControls } from '../../configurations/insuranceControls';
import useDraft from '../../hooks/useDraft';

import Address from './Address';
import FormFields from './FormFields';
import SideBar from './SideBar';
import styles from './styles.module.css';

function Checkout() {
	const [billingType, setBillingType] = useState('Corporate');

	const { getLoading, draftData = {} } = useDraft({});

	const formHook = useForm({
		defaultValues: {
			coverage: 'ALL_RISK',
		},
	});

	const controls = getRegistrationControls({ billingType });

	return (
		<div>
			<h2>Cargo Insurance</h2>
			<Header {...draftData} loading={getLoading} />

			<div className={styles.container}>
				<div className={styles.flex_box}>
					<div style={{ width: '65%' }}>
						<Address billingType={billingType} setBillingType={setBillingType} />

						<div className={styles.form_container}>
							<p className={styles.form_title}>Please fill all fields</p>
							<div className={styles.form_elements}>
								<FormItem controls={controls} formhook={formHook} />
							</div>
						</div>
					</div>

					<SideBar {...draftData} />
				</div>

				<FormFields formHook={formHook} billingType={billingType} />
			</div>

		</div>
	);
}

export default Checkout;
