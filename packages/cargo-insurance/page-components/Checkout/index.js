import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
import { useState, useRef } from 'react';

import FormItem from '../../common/FormItem';
import Header from '../../common/Header';
import { getRegistrationControls } from '../../configurations/insuranceControls';
import useCheckout from '../../hooks/useCheckout';
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

	const formRef = useRef({});

	const formHook = useForm({
		defaultValues: {
			riskCoverage: 'ALL_RISK',
		},
	});
	const { handleSubmit, getValues } = formHook;

	const {
		getLoading, draftData = {}, loading:saveDraftLoading,
		saveAsDraft,
	} = useDraft({ getValues, formRef, billingType });

	useCheckout({ draftData, formHook, setBillingType });

	const { loading, submitHandler } = useCheckoutSend({ setConfirmSuccess, draftData, billingType, formRef });

	const { metadata = {} } = draftData || {};

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
							preSelectedAddress={metadata?.selectedAddress}
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

				<FormFields formHook={formHook} billingType={billingType} {...draftData} />

				<div className={styles.footer}>
					<Button
						themeType="accent"
						loading={saveDraftLoading}
						className={styles.save_draft_btn}
						onClick={saveAsDraft}
					>
						{t('cargoInsurance:save_as_draft')}
					</Button>

					<Button
						disabled={saveDraftLoading}
						onClick={handleSubmit(() => setConfirmSuccess({ isOpen: true, isConfirm: true }))}
					>
						{t('cargoInsurance:confirm_and_send')}
					</Button>
				</div>
			</div>

			<ConfirmSuccessModal
				confirmSuccess={confirmSuccess}
				setConfirmSuccess={setConfirmSuccess}
				loading={loading}
				pocDetails={draftData?.pocDetails}
				handleSubmit={handleSubmit}
				submitHandler={submitHandler}
			/>
		</div>
	);
}

export default Checkout;
