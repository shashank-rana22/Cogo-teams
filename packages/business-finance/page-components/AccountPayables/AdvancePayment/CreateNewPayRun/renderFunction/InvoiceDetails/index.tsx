import { IcMArrowRotateLeft, IcMOverview } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function InvoiceDetails() {
	const [showDetailsCard, setShowDetailsCard] = useState(false);
	const handleShow = () => {
		setShowDetailsCard(true);
		// document.body.style.overflow = 'hidden';
	};

	return (
		<div>
			<div style={{ color: '#F68B21', cursor: 'pointer' }} onClick={handleShow} role="presentation">
				<IcMOverview width={30} height={30} />
			</div>
			{showDetailsCard && (
				<div>
					<div className={styles.invoice_details_container} />
					<div className={styles.invoice_container} style={{ width: '35vw' }}>
						<div className={styles.container}>
							<div className={styles.content_caret}>
								<div
									className={styles.icon_container}
									onClick={() => {
										setShowDetailsCard(false);
										document.body.style.overflow = 'auto';
									}}
									role="presentation"
								>
									<IcMArrowRotateLeft />
								</div>
								<div className={styles.header_details}>
									More Details
								</div>

							</div>
							<div className={styles.body_details}>
								<div className={styles.body_details_card01}>
									hhjjhkihjlijnjhvuj
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default InvoiceDetails;
