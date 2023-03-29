import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Footer({
	onClose = () => {},
	isLoading = false,
	showSubmit = true,
}) {
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

			{showSubmit ? (
				<Button
					type="submit"
					className="primary md"
					disabled={isLoading}
					style={{ marginLeft: 16 }}
					id="shipment_form_header_submit"
				>
					{isLoading ? 'Adding Service...' : 'Submit'}
				</Button>
			) : null}
		</div>
	);
}

export default Footer;
