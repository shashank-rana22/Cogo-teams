import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useContext, useRef, useState } from 'react';

import FormItem from '../common/FormItems';
import { getRegistrationControls } from '../configurations/insuranceControls';
import useDraft from '../hooks/useDraft';
import useInsurance from '../hooks/useInsurance';
import useInsuranceSend from '../hooks/useInsuranceSend';

import Address from './Address';
import ConfirmSuccessModal from './ConfirmSuccessModal';
import FormFields from './FormFields';
import SideBar from './SideBar';
import styles from './styles.module.css';

function CargoInsurance() {
	const { servicesList } = useContext(
		ShipmentDetailContext,
	);

	const [billingType, setBillingType] = useState('Corporate');

	const formRef = useRef({});

	const formHook = useForm({
		defaultValues: {
			riskCoverage: 'ALL_RISK',
		},
	});

	const { handleSubmit } = formHook;

	const policyDetails = (servicesList || []).find(
		(item) => item?.service_type === 'cargo_insurance_service',
	);

	const { getLoading, saveDraftLoading, draftData, saveAsDraft } = useDraft({
		policyDetails,
		formHook,
		billingType,
		formRef,
	});

	const { onClickConfirmSend, confirmSuccess, setConfirmSuccess } = useInsurance({
		setBillingType,
		draftData,
		formHook,
		formRef,
	});

	const { loading, submitHandler } = useInsuranceSend({
		setConfirmSuccess,
		billingType,
		draftData,
		formRef,
	});

	const controls = getRegistrationControls({ billingType });

	return (
		<div className={styles.container}>
			<div className={styles.flex_box}>
				<div style={{ width: '65%' }}>
					<Address
						draftData={draftData}
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

				<SideBar {...draftData} formHook={formHook} />
			</div>

			<FormFields formHook={formHook} billingType={billingType} {...draftData} />

			<div className={styles.footer}>
				<Button
					themeType="accent"
					loading={saveDraftLoading}
					disabled={getLoading}
					className={styles.save_draft_btn}
					onClick={saveAsDraft}
				>
					Save as Draft
				</Button>

				<Button
					disabled={saveDraftLoading || getLoading}
					onClick={handleSubmit(onClickConfirmSend)}
				>
					Confirm
				</Button>
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

export default CargoInsurance;
