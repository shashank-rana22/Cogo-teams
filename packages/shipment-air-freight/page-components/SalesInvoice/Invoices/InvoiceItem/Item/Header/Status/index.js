import { Button, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import useSendInvoiceToFinance from '../../../../../../../hooks/useSendInvoiceToFinance';
import styles from '../styles.module.css';

import Actions from './Actions';

function Status({
	invoice = {},
	invoiceData = {},
	invoicesList = [],
	refetchAferApiCall = () => {},
	isIRNGenerated = false,
	bfInvoice = {},
	restrictedRevokedStatus = [],
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { sendInvoiceToFinance = () => {} } = useSendInvoiceToFinance({ refetch: refetchAferApiCall });

	let invoiceStatus = invoicesList?.filter(
		(item) => item?.invoiceNumber === invoice?.live_invoice_number
			|| item?.proformaNumber === invoice?.live_invoice_number,
	)?.[GLOBAL_CONSTANTS.zeroth_index]?.status;

	if (invoiceStatus === 'POSTED') {
		invoiceStatus = 'IRN GENERATED';
	}

	return (
		<div className={styles.invoice_container}>
			{invoice?.status
					&& restrictedRevokedStatus.includes(invoice?.status) ? (
						<>
							<div className={styles.invoice_status}>
								{startCase(invoice.status || '')}
							</div>
							{invoice?.status === 'finance_rejected' && invoice?.rejection_reason
								? (
									<div className={styles.invoice_rejection_reason}>
										{invoice.rejection_reason}
									</div>
								)
								: null}
						</>
				) : null}

			{invoice?.processing ? (
				<div className={styles.reload}>
					<div className={cl`${styles.payment_method} ${styles.processing}`}>Processing</div>
					<Button
						size="sm"
						themeType="tertiary"
						onClick={() => sendInvoiceToFinance({
							payload: {
								id: invoice?.id,
							},
						})}
					>
						<IcMRefresh width={15} height={15} fill="#ee3425" />
					</Button>
				</div>
			) : (
				!invoice?.is_revoked && invoice?.status !== 'finance_rejected' && (
					<Actions
						invoice={invoice}
						refetch={refetchAferApiCall}
						shipment_data={shipment_data}
						invoiceData={invoiceData}
						isIRNGenerated={isIRNGenerated}
						bfInvoice={bfInvoice}
					/>
				)
			)}

		</div>
	);
}
export default Status;
