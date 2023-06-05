import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext } from 'react';

import useCreateSpotSearch from '../../../../../hooks/useCreateUpsell';

import styles from './styles.module.css';

function Footer({
	onClose = () => {},
	service = {},
	formProps = {},

}) {
	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);
	const { handleSubmit = () => {}, formValues } = formProps;

	const { organization_id = '' } = formValues || {};

	const { onAddService = () => {}, loading } = useCreateSpotSearch({
		primary_service,
		service,
		shipment_data,
		organization_id,
	});

	const buttons = [
		{
			label     : 'Cancel',
			onClick   : onClose,
			themeType : 'secondary',
			disabled  : loading,
			className : styles.first_button,
		},
		{
			label    : 'Submit',
			onClick  : handleSubmit(onAddService),
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
