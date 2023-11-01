import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { useContext, useState } from 'react';

import FormItem from '../common/FormItems';
import { getRegistrationControls } from '../configurations/insuranceControls';
import useDraft from '../hooks/useDraft';

import Address from './Address';
import FormFields from './FormFields';
import SideBar from './SideBar';
import styles from './styles.module.css';

function CargoInsurance() {
	const { shipment_data, primary_service, servicesList } = useContext(
		ShipmentDetailContext,
	);
	const [billingType, setBillingType] = useState('Corporate');

	const policyDetails = (servicesList || []).find(
		(item) => item?.service_type === 'cargo_insurance_service',
	);

	const formHook = useForm({
		defaultValues: {
			riskCoverage: 'ALL_RISK',
		},
	});
	const { handleSubmit, getValues } = formHook;

	const { getLoading, draftData } = useDraft({ policyDetails });
	const controls = getRegistrationControls({ billingType });

	return (
		<div className={styles.container}>
			<div className={styles.flex_box}>
				<div style={{ width: '65%' }}>
					<Address
						billingType={billingType}
						setBillingType={setBillingType}
						orgId={draftData?.organizationId}
						// preSelectedAddress={metadata?.selectedAddress}
						// ref={(r) => { formRef.current.address = r; }}
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

			<FormFields formHook={formHook} billingType={billingType} {...draftData} />

			<div className={styles.footer}>
				<Button
					themeType="accent"
					// loading={saveDraftLoading}
					className={styles.save_draft_btn}
					// onClick={saveAsDraft}
				>
					Save as Draft
				</Button>

				<Button>
					Confirm
				</Button>
			</div>

		</div>
	);
}

export default CargoInsurance;
