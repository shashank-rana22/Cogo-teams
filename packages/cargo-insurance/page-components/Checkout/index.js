import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
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
	const { t } = useTranslation(['cargoInsurance']);

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

	const controls = getRegistrationControls({ billingType, t });

	return (
		<div>
			<h2>{t('cargoInsurance:title')}</h2>
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
							<p className={styles.form_title}>{t('cargoInsurance:form_field_title_1')}</p>
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
						{t('cargoInsurance:confirm_purchase')}
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
