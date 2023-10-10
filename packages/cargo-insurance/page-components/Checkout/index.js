import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import FormItem from '../../common/FormItem';
import Header from '../../common/Header';
import { getRegistrationControls } from '../../configurations/insuranceControls';
import useCheckoutSend from '../../hooks/useCheckoutSend';
import useDraft from '../../hooks/useDraft';

import Address from './Address';
import ConfirmSuccessModal from './ConfirmSuccessModal';
import FormFields from './FormFields';
import SideBar from './SideBar';
import styles from './styles.module.css';

function Checkout() {
	const [billingType, setBillingType] = useState('Corporate');
	const [confirmSuccess, setConfirmSuccess] = useState({
		isOpen: false,
	});

	const formHook = useForm({
		defaultValues: {
			riskCoverage: 'ALL_RISK',
		},
	});
	const { handleSubmit } = formHook;

	const { getLoading, draftData = {} } = useDraft({});
	const { loading, submitHandler, formRef } = useCheckoutSend({ setConfirmSuccess, draftData, billingType });

	const controls = getRegistrationControls({ billingType });

	return (
		<div>
			<h2>Cargo Insurance</h2>
			<Header {...draftData} loading={getLoading} src="checkout" />

			<div className={styles.container}>
				<div className={styles.flex_box}>
					<div style={{ width: '65%' }}>
						<Address
							billingType={billingType}
							setBillingType={setBillingType}
							orgId={draftData?.organizationId}
							ref={(r) => { formRef.current.address = r; }}
						/>

						<div className={styles.form_container}>
							<p className={styles.form_title}>Please fill all fields</p>
							<div className={styles.form_elements}>
								<FormItem controls={controls} formhook={formHook} />
							</div>
						</div>
					</div>

					<SideBar {...draftData} />
				</div>

				<FormFields formHook={formHook} billingType={billingType} incoterm={draftData?.incotermResponse} />

				<div className={styles.footer}>
					<Button
						onClick={handleSubmit(() => setConfirmSuccess({ isOpen: true, isConfirm: true }))}
					>
						Confirm Purchase
					</Button>
				</div>
			</div>

			<ConfirmSuccessModal
				confirmSuccess={confirmSuccess}
				setConfirmSuccess={setConfirmSuccess}
				loading={loading}
				handleSubmit={handleSubmit}
				submitHandler={submitHandler}
			/>
		</div>
	);
}

export default Checkout;
