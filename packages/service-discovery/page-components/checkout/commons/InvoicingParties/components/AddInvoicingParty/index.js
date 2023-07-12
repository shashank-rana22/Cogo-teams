import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function AddInvoicingParty() {
	return (
		<div className={styles.container}>
			Split this invoice, and get a chance to win upto 15% cashback.

			<Button type="button" size="lg" themeType="accent">+ Add Invoicing Party</Button>
		</div>
	);
}

export default AddInvoicingParty;
