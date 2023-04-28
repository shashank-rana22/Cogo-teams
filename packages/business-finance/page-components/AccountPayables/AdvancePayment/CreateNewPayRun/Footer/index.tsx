import { Button } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import React, { useState } from 'react';

import SavePayRunModal from './SavePayRunModal';
import styles from './styles.module.css';

function Footer({
	apiData,
	viewSelectedInvoice,
	setViewSelectedInvoice,
	submitSelectedInvoices,
	getViewSelectedInvoices,
	getAdvancedPayment,
	viewSelectedData,
	selectedPayRunId,
	selectedDataLoading,
	loading,
	viewSelectedDataLoading,
}) {
	const {
		list = [],
	} = apiData || {};

	const [savePayrunModal, setSavePayrunModal] = useState(false);
	const { totalValue, currency, invoiceCount } = viewSelectedData || {};

	const isChecked = (list || [])?.filter((item) => item.checked);
	const totalInvoiceAmount = isChecked?.reduce((acc, obj) => +acc + +obj.payableAmount, 0);
	const showAddToSelected = isChecked?.length === 0;
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
							{viewSelectedInvoice === true ? getFormattedPrice(totalValue, currency || 'INR')
								: getFormattedPrice(totalInvoiceAmount, 'INR')}
						</div>
					</div>
					<div className={styles.sid_count}>
						<div>
							SID :
						</div>
						<div>
							{viewSelectedInvoice === true ? invoiceCount : isChecked.length}
						</div>
					</div>
				</div>
				<div className={styles.button_container}>
					{viewSelectedInvoice
						? (
							<div className={styles.view_button}>
								<Button
									disabled={viewSelectedData?.list?.length <= 0}
									onClick={() => { setSavePayrunModal(true); }}
								>
									Save PayRun

								</Button>
							</div>
						)
						: (
							<div className={styles.button_container}>
								<div>
									<Button
										themeType="secondary"
										onClick={submitSelectedInvoices}
										disabled={showAddToSelected || selectedDataLoading || loading}
									>
										+ Add to selected
									</Button>

								</div>
								<div className={styles.view_button}>
									<Button
										disabled={viewSelectedDataLoading}
										onClick={() => {
											setViewSelectedInvoice(true);
											getViewSelectedInvoices();
											if (selectedPayRunId) {
												getAdvancedPayment();
											}
										}}
									>
										View Selected SID

									</Button>
								</div>
							</div>
						)}
				</div>
			</div>
			{savePayrunModal && (
				<SavePayRunModal
					savePayrunModal={savePayrunModal}
					setSavePayrunModal={setSavePayrunModal}
					setViewSelectedInvoice={setViewSelectedInvoice}
				/>
			)}
		</div>
	);
}

export default Footer;
