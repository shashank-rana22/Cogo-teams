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
	const { handleSubmit = () => {}, formValues } = formProps;

	const { organization_id = '' } = formValues || {};

	const { onAddService = () => {}, loading } = useCreateSpotSearch({
		primary_service,
		service,
		shipment_data,
		organization_id,
	});

	return (
		<div className={styles.container}>
			<Button
				disabled={loading}
				onClick={onClose}
				themeType="secondary"
			>
				Cancel
			</Button>

			<Button
				disabled={loading}
				onClick={handleSubmit(onAddService)}
			>
				Submit
			</Button>
		</div>
	);
}

export default Footer;
