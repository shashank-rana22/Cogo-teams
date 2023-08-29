import { Button, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCError } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const INITIAL_VALUE = 0;

function Footer({
	apiData,
	viewSelectedInvoices,
	setViewSelectedInvoices,
	submitSelectedInvoices,
	loading,
	selectedCurrency,
	setShowHeader,
	setActive = () => {},
	setBLData = () => {},
	listSelectedInvoice,
	selectButton = false,
	createloading = false,
}) {
	const {
		list = [],
	} = apiData || {};

	const { totalValue = '', invoiceCount = '' } = apiData || {};

	const checkedList = (list || []).filter((item) => item.checked);
	const hasError = !isEmpty((checkedList || []).filter((item) => item.hasError));
	const totalInvoiceAmount = checkedList.reduce((acc, obj) => +acc + +obj.payableAmount, INITIAL_VALUE);
	const buttonDisabled = isEmpty(checkedList) || loading || hasError;

	const handleView = () => {
		setViewSelectedInvoices(true);
		setShowHeader(false);
	};

	function RenderContent() {
		return (
			<div className={styles.popover_modal}>
				Please ensure to move the checked invoices
				to the selected bucket or else you’ll lose the edited fields.
			</div>
		);
	}
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
									onClick={() => {
										setActive('invoice_bl_check');
										setBLData(apiData);
										setShowHeader(true);
									}}
									disabled={listSelectedInvoice?.loading || !list.length}
								>
									Proceed
								</Button>
							</div>
						)
						: (
							<div className={styles.button_container}>
								{!isEmpty(checkedList) && (
									<div className={styles.alert}>
										<Tooltip
											animation="scale"
											placement="top"
											content={RenderContent()}
											maxWidth="none"
										>
											<div>
												<IcCError className={styles.alert_icon} height={24} width={24} />
											</div>
										</Tooltip>
									</div>
								)}

								<div>
									<Button
										themeType="secondary"
										onClick={submitSelectedInvoices}
										disabled={buttonDisabled || selectButton || createloading}
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
		</div>
	);
}

export default Footer;
