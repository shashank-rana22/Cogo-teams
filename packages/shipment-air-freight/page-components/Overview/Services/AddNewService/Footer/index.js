import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext } from 'react';

import useCreateSpotSearch from '../../../../../hooks/useCreateSpotSearch';

import styles from './styles.module.css';

function Footer({
	onClose = () => {},
	service = {},
	formProps = {},
}) {
	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);
	const { handleSubmit = () => {} } = formProps;

	const { onAddService = () => {}, loading } = useCreateSpotSearch({
		primary_service,
		service,
		shipment_data,
	});

	const buttons = [
		{
			label     : 'Cancel',
			onClick   : onClose,
			themeType : 'secondary',
			disabled  : loading,
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
