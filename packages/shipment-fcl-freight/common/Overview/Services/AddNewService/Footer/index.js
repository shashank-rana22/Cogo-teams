import { Button } from '@cogoport/components';
import React from 'react';

import useCreateUpsell from '../../../../../hooks/useCreateUpsell';

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

	const { onAddService, loading } = useCreateUpsell({
		primary_service,
		service,
		shipmentData,
	});

	return (
		<div className={styles.container}>
			<Button
				themeType="secondary"
				onClick={onClose}
				disabled={loading}
				id="shipment_form_header_cancel"
			>
				Cancel
			</Button>

			<Button
				type="submit"
				className="primary md"
				disabled={loading}
				onClick={() => (onAddService(formValues))}
				style={{ marginLeft: 16 }}
				id="shipment_form_header_submit"
			>
				{loading ? 'Adding Service...' : 'Submit'}
			</Button>
		</div>
	);
}

export default Footer;
