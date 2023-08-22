import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import SavePayRunModal from './SavePayRunModal';
import styles from './styles.module.css';

const INITIAL_VALUE = 0;

function Footer({
	apiData,
	viewSelectedInvoices,
	setViewSelectedInvoices,
	submitSelectedInvoices,
	loading,
	selectedCurrency,
}) {
	const {
		list = [],
	} = apiData || {};

	const [savePayrunModal, setSavePayrunModal] = useState(false);
	const { totalValue = '', invoiceCount = '' } = apiData || {};
	const { list: viewSelectedList = [] } = apiData || {};
	const checkedList = (list || []).filter((item) => item.checked);
	const hasError = !isEmpty((checkedList || []).filter((item) => item.hasError));
	const totalInvoiceAmount = checkedList.reduce((acc, obj) => +acc + +obj.payableAmount, INITIAL_VALUE);
	const buttonDisabled = isEmpty(checkedList) || loading || hasError;
	const handleView = () => {
		setViewSelectedInvoices(true);
	};
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.button_container}>
					<div className={styles.text}>
						Total Payments
					</div>
					<div className={styles.amount_container}>
						<div className={styles.amount}>
							{formatAmount({
								amount   : viewSelectedInvoices ? totalValue : totalInvoiceAmount,
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
							{viewSelectedInvoices ? invoiceCount : checkedList?.length}
						</div>
					</div>
				</div>
				<div className={styles.button_container}>
					{viewSelectedInvoices
						? (
							<div className={styles.view_button}>
								<Button
									disabled={isEmpty(viewSelectedList)}
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
										disabled={loading}
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
					setViewSelectedInvoice={setViewSelectedInvoices}
				/>
			)}
		</div>
	);
}

export default Footer;
