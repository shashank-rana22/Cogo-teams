import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import SavePayRunModal from './SavePayRunModal';
import styles from './styles.module.css';

function Footer({ viewSelectedInvoice, setViewSelectedInvoice }) {
	const [savePayrunModal, setSavePayrunModal] = useState(false);
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.button_container}>
					<div className={styles.text}>
						Total Advance Payments
					</div>
					<div className={styles.amount_container}>
						<div className={styles.currency}>
							INR
						</div>
						<div className={styles.amount}>
							1,00,000,00
						</div>
					</div>
					<div className={styles.sid_count}>
						<div>
							SID -
						</div>
						<div>

							33
						</div>
					</div>
				</div>
				<div className={styles.button_container}>
					{viewSelectedInvoice
						? (
							<div className={styles.view_button}>
								<Button onClick={() => { setSavePayrunModal(true); }}>Save PayRun</Button>
							</div>
						)
						: (
							<div className={styles.button_container}>
								<div><Button themeType="secondary">+ Add to selected</Button></div>
								<div className={styles.view_button}>
									<Button onClick={() => { setViewSelectedInvoice(true); }}>View Selected SID</Button>
								</div>
							</div>
						)}
				</div>
			</div>
			{savePayrunModal && (
				<SavePayRunModal
					savePayrunModal={savePayrunModal}
					setSavePayrunModal={setSavePayrunModal}
				/>
			)}
		</div>
	);
}

export default Footer;
