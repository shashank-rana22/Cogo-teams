import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import { CheckoutContext } from '../../../../../../context';

import styles from './styles.module.css';
import useInvoicingParties from './useInvoicingParties';

function InvoicingParties() {
	const {
		orgData = {},
		primary_service,
		rate,
		conversions,
		detail = {},
		invoice = {},
	} = useContext(CheckoutContext);

	const { data: organization } = orgData;

	const { invoicingParties } = useInvoicingParties({ detail, invoice });

	console.log('invoicingParties', invoicingParties);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Invoicing Preferences</div>

		</div>
	);
}

export default InvoicingParties;
