import { Button, Toast } from '@cogoport/components';
import React from 'react';

import useCreateUpsell from '../../../../../hooks/useCreateUpsell';

import styles from './styles.module.css';

function Footer({
	onClose = () => {},
	primary_service = {},
	service = {},
	shipmentData = {},
	formProps = {},
	haveToUpsell = false,
	step = 1,
	setStep = () => {},
	organization_id = '',
	user = {},

}) {
	const { handleSubmit = () => {}, trigger } = formProps;

	const { onAddService = () => {}, loading } = useCreateUpsell({
		primary_service,
		service,
		shipmentData,
		organization_id,
		user,
	});

	const goToSecondStep = async () => {
		const formValid = await trigger();
		if (formValid) {
			setStep(2);
		} else {
			Toast.error('Some form fields are empty or invalid');
		}
	};

	return (
		<div className={styles.container}>
			<Button
				onClick={onClose}
				disabled={loading || haveToUpsell}
				themeType="secondary"
				id="shipment_form_header_cancel"
			>
				Cancel
			</Button>

			{step === 1
				? (
					<Button
						onClick={goToSecondStep}
						disabled={loading}
						className={styles.button_wrapper}
					>
						Next
					</Button>
				) : (
					<Button
						type="submit"
						disabled={loading}
						onClick={handleSubmit(onAddService)}
						className={styles.button_wrapper}
						id="shipment_form_header_submit"
					>
						{loading ? 'Adding Service...' : 'Submit'}
					</Button>
				)}

		</div>
	);
}

export default Footer;
