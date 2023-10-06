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
	const [billingType, setBillingType] = useState('Individual');

	const { getLoading, draftData = {} } = useDraft({});
	console.log(getLoading, 'getLoading');
	const formHook = useForm();

	const controls = getRegistrationControls({ billingType });

	return (
		<div>
			<h2>Cargo Insurance</h2>
			<Header draftData={draftData} />

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

					<SideBar />
				</div>

				<FormFields formHook={formHook} />
			</div>

		</div>
	);
}

export default Checkout;
