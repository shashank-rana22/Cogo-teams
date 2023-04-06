import { Button } from '@cogoport/components';
import React from 'react';

import useCreateUpsell from '../../hooks/useCreateUpsell';

import styles from './styles.module.css';

function Footer({
	onClose = () => {},
	primary_service = {},
	service = {},
	shipmentData = {},
	formProps = {},

}) {
	const { watch } = formProps;

	const formValues = watch();

	const { onAddService, isLoading = false } = useCreateUpsell({
		primary_service,
		service,
		shipmentData,
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
