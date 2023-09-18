import { IcMArrowRotateLeft } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function InvoiceDetailsComp({
	setShowDetailsCard = () => {},
	objectNumber = '',
	invoiceNumber = '',
	billNumber = '',
	jobNumber = '',
	sid = '',
}) {
	return (
		<div className={styles.content_caret}>
			<div
				className={styles.icon_container}
				onClick={() => {
					setShowDetailsCard(false);
				}}
				role="presentation"
			>
				<IcMArrowRotateLeft />
			</div>

			<div className={styles.header_details}>
				INVOICE DETAILS -
				<span style={{ textDecorationLine: 'underline' }}>
					{objectNumber || invoiceNumber || billNumber}
				</span>
				{' '}
				- SID :-
				<span>
					{jobNumber || sid}
				</span>
			</div>
		</div>
	);
}

export default InvoiceDetailsComp;
