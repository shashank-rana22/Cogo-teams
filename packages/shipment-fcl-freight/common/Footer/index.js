import { Button } from '@cogoport/components';
import React from 'react';

import useCreateSpotSearch from '../../hooks/useCreateSpotSearch';

import styles from './styles.module.css';

function Footer({
	onClose = () => {},
	primary_service = {},
	service = {},
	shipmentData = {},
	formProps = {},
	services = [],

}) {
	const { handleSubmit, watch } = formProps;

	console.log(primary_service, 'primary_Servicce');

	const formValues = watch();

	const { onAddService, isLoading = false } = useCreateSpotSearch({
		primary_service,
		service,
		shipmentData,
		services,
	});

	return (
		<div className={styles.container}>
			<Button
				className="secondary md"
				onClick={onClose}
				disabled={isLoading}
				id="shipment_form_header_cancel"
			>
				Cancel
			</Button>

			<Button
				type="submit"
				className="primary md"
				disabled={isLoading}
				onClick={() => (onAddService(formValues))}
				style={{ marginLeft: 16 }}
				id="shipment_form_header_submit"
			>
				{isLoading ? 'Adding Service...' : 'Submit'}
			</Button>
		</div>
	);
}

export default Footer;
