import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import SavePayRunModal from './SavePayRunModal';
import styles from './styles.module.css';

function Footer({
	apiData = {},
	viewSelectedInvoice = false,
	setViewSelectedInvoice = () => {},
	submitSelectedInvoices = () => {},
	getViewSelectedInvoices = () => {},
	getAdvancedPayment = () => {},
	viewSelectedData = {},
	selectedPayRunId = '',
	selectedDataLoading = false,
	loading = false,
	viewSelectedDataLoading = false,
	selectedCurrency = '',
}) {
	const {
		list = [],
	} = apiData || {};

	const [savePayrunModal, setSavePayrunModal] = useState(false);
	const { totalValue = '', invoiceCount = '' } = viewSelectedData || {};
	const { list:viewSelectedList = [] } = viewSelectedData || {};
	const listLength = viewSelectedList.length;
	const isChecked = (list || []).filter((item) => item.checked);
	const totalInvoiceAmount = isChecked.reduce((acc, obj) => +acc + +obj.payableAmount, 0);
	const showAddToSelected = isEmpty(isChecked);
	const buttonDisabled = showAddToSelected || selectedDataLoading || loading;
	const handleView = () => {
		setViewSelectedInvoice(true);
		getViewSelectedInvoices();
		if (selectedPayRunId) {
			getAdvancedPayment();
		}
	};
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.button_container}>
					<div className={styles.text}>
						Total Advance Payments
					</div>
					<div className={styles.amount_container}>
						<div className={styles.amount}>
							{ formatAmount({
								amount   : viewSelectedInvoice ? totalValue : totalInvoiceAmount,
								currency : selectedCurrency,
								options  : {
									currencyDisplay : 'code',
									style           : 'currency',
								},
							})}
						</div>
					</div>
					<div className={styles.sid_count}>
						<div>
							SID :
						</div>
						<div>
							{viewSelectedInvoice ? invoiceCount : isChecked.length}
						</div>
					</div>
				</div>
				<div className={styles.button_container}>
					{viewSelectedInvoice
						? (
							<div className={styles.view_button}>
								<Button
									disabled={listLength <= 0}
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
										disabled={buttonDisabled}
									>
										+ Add to selected
									</Button>

								</div>
								<div className={styles.view_button}>
									<Button
										disabled={viewSelectedDataLoading}
										onClick={handleView}
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
