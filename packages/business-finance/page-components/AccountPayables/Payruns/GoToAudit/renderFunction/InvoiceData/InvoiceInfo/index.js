import { IcMArrowRotateLeft } from '@cogoport/icons-react';

import styles from './styles.module.css';

function InvoiceInfo({ billNumber = 0, sid = 0, setShowDetailsCard = () => {} }) {
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
					{billNumber}
				</span>
				{' '}
				- SID :-
				<span>
					{sid}
				</span>
			</div>
		</div>
	);
}

export default InvoiceInfo;
