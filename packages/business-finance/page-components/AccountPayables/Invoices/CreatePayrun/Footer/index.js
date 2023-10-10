import { Button, Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCError } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import SavePayRunModal from './SavePayRunModal';
import styles from './styles.module.css';

const INITIAL_VALUE = 0;
const geo = getGeoConstants();

function RenderContent() {
	return (
		<div className={styles.popover_modal}>
			Please ensure to move the checked invoices
			to the selected bucket or else you’ll lose the edited fields.
		</div>
	);
}

function Footer({
	apiData = () => {},
	viewSelectedInvoices = false,
	setViewSelectedInvoices = () => {},
	submitSelectedInvoices = () => {},
	loading = false,
	selectedCurrency = geo.country.currency.code,
	isAuditAllowed = true,
}) {
	const { list = [] } = apiData || {};

	const [savePayrunModal, setSavePayrunModal] = useState(false);
	const [type, setType] = useState('');
	const { totalValue = '', invoiceCount = '', list: viewSelectedList = [] } = apiData || {};
	const checkedList = (list || [])?.filter((item) => item.checked);
	const hasError = !isEmpty((checkedList || [])?.filter((item) => item?.hasError));
	const totalInvoiceAmount = (checkedList || [])?.reduce(
		(acc, obj) => +acc + +obj.payableAmount || INITIAL_VALUE,
		INITIAL_VALUE,
	);
	const buttonDisabled = isEmpty(checkedList) || loading || hasError;

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.button_container}>
					<div className={styles.text}>
						Total Payments
					</div>

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
									onClick={() => {
										setSavePayrunModal(true);
										setType('save');
									}}
								>
									Save PayRun
								</Button>

								{isAuditAllowed && (
									<Button
										style={{ margin: '0px 18px' }}
										onClick={() => {
											setSavePayrunModal(true);
											setType('audit');
										}}
										disabled={!list?.length}
									>
										Audit
									</Button>
								)}
							</div>
						)
						: (
							<div className={styles.button_container}>
								{!isEmpty(checkedList) && (
									<div className={styles.alert}>
										<Tooltip
											animation="scale"
											placement="top"
											content={<RenderContent />}
											maxWidth="none"
										>
											<div>
												<IcCError className={styles.alert_icon} height={24} width={24} />
											</div>
										</Tooltip>
									</div>
								)}

								<Button
									themeType="secondary"
									onClick={submitSelectedInvoices}
									disabled={buttonDisabled}
								>
									+ Add to selected
								</Button>

								<Button
									className={styles.view_button}
									disabled={loading}
									onClick={() => setViewSelectedInvoices(true)}
								>
									View Selected SID
								</Button>
							</div>
						)}
				</div>
			</div>
			{savePayrunModal ? (
				<SavePayRunModal
					savePayrunModal={savePayrunModal}
					setSavePayrunModal={setSavePayrunModal}
					type={type}
				/>
			) : null}
		</div>
	);
}

export default Footer;
