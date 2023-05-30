import { Button, Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext } from 'react';

import useCreateSpotSearch from '../../../../../hooks/useCreateUpsell';

import styles from './styles.module.css';

function Footer({
	onClose = () => {},
	service = {},
	formProps = {},
	step = 1,
	setStep = () => {},
}) {
	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);
	const { handleSubmit = () => {}, formValues, trigger } = formProps;

	const { organization_id = '', user_id = {} } = formValues || {};

	const { onAddService = () => {}, loading } = useCreateSpotSearch({
		primary_service,
		service,
		shipment_data,
		organization_id,
		user: user_id,
	});

	const goToSecondStep = async () => {
		const formValid = await trigger();
		if (formValid) {
			setStep(2);
		} else {
			Toast.error('Some form fields are empty or invalid');
		}
	};

	const buttons = [
		{
			label     : step === 1 ? 'Cancel' : 'Back',
			onClick   : step === 1 ? onClose : () => setStep(1),
			themeType : 'secondary',
			disabled  : loading,
		},
		{
			label    : step === 1 ? 'Next' : 'Submit',
			onClick  : step === 1 ? goToSecondStep : handleSubmit(onAddService),
			disabled : loading,
		},
	];

	return (
		<div className={styles.container}>
			{buttons.map(({ label, ...rest }) => <Button key={label} {...rest}>{label}</Button>)}
		</div>
	);
}

export default Footer;
