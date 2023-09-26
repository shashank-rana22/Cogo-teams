import { Button, cl, Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMRefresh, IcCError } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import useSendInvoiceToFinance from '../../../../../../../hooks/useSendInvoiceToFinance';
import useUpdateShipmentInvoiceStatus from '../../../../../../../hooks/useUpdateShipmentInvoiceStatus';
import ClickableDiv from '../../../../../../ClickableDiv';
import Actions from '../Actions';

import styles from './styles.module.css';

const MAXIMUM_FRACTION_DIGIT = 2;
const OFFSET_VALUE = 2;
const END_INDEX_FOR_CREDIT_SOURCE = -2;
const START_INDEX_FOR_CREDIT_SOURCE = 0;
const FALLBACK_VALUE = 0;
const INVOICE_STATUS = ['reviewed', 'approved', 'revoked', 'finance_rejected'];
const API_SUCCESS_MESSAGE = {
	reviewed : 'Invoice sent for approval to customer!',
	approved : 'Invoice approved!,',
};
const RESTRICT_REVOKED_STATUS = ['revoked', 'finance_rejected'];

function InvoiceInfo({
	invoice = {},
	bfInvoiceRefetch = () => {},
	disableMarkAsReviewed = false,
	bfInvoice = {},
	invoiceStatus = '',
	showRequestCN = false,
	setShowReview = () => {},
	isAuthorized = false,
	disableAction = false,
	setShowOTPModal = () => {},
	setAskNullify = () => {},
	salesInvoicesRefetch = () => {},
	invoiceData = {},

}) {
	const {
		invoice_total_currency,
		invoice_total_discounted,
		live_invoice_number,
		processing : isProcessing = false,
		id: invoiceId = '',
		status = '',
		is_revoked = false,
		rejection_reason = '',
	} = invoice || {};

	const { shipment_data } = useContext(ShipmentDetailContext);

	const showIrnTriggerForOldShipments = shipment_data?.serial_id <= GLOBAL_CONSTANTS.invoice_check_id
	&& status === 'reviewed'
		&& !isEmpty(invoice?.data);

	const creditSource = invoice?.credit_option?.credit_source?.split('_');

	const refetchAferApiCall = () => {
		bfInvoiceRefetch();
	};

	const { apiTrigger = () => {} } = useUpdateShipmentInvoiceStatus({ refetch: refetchAferApiCall });
	const { sendInvoiceToFinance = () => {} } = useSendInvoiceToFinance({ refetch: refetchAferApiCall });

	const handleDownload = (invoiceLink) => {
		window.open(invoiceLink);
	};

	const handleClick = (type) => {
		apiTrigger({
			payload: {
				id     : invoice?.id,
				status : type,
			},
			message: API_SUCCESS_MESSAGE[type],
		});
	};

	return (
		<>
			<div className={styles.invoice_info}>
				<div className={styles.so_container}>
					<ClickableDiv
						className={cl`${styles.so_number} ${!isEmpty(bfInvoice) ? styles.active : ''}`}
						onClick={() => (!isEmpty(bfInvoice)
							? handleDownload(
								bfInvoice?.invoicePdfUrl || bfInvoice?.proformaPdfUrl,
							)
							: null)}
					>
						{bfInvoice?.invoiceNumber
								|| bfInvoice?.proformaNumber
								|| live_invoice_number}
					</ClickableDiv>

					<div className={styles.status_container}>
						{invoiceStatus === 'FINANCE_REJECTED' ? (
							<Tooltip
								theme="light"
								placement="bottom"
								content={
									<div>{bfInvoice?.invoiceRejectionReason || '-'}</div>
									}
							>
								<div className={styles.status_style}>{startCase(invoiceStatus)}</div>
							</Tooltip>
						) : (
							<div>{startCase(invoiceStatus)}</div>
						)}
					</div>
					{showIrnTriggerForOldShipments ? (
						<Button
							onClick={() => handleClick('approved')}
						>
							Generate IRN Invoice
						</Button>
					) : null}
				</div>
				<div className={styles.invoice_value_container}>
					<div className={styles.invoice_value_title}>Invoice Value -</div>

					<div className={styles.invoice_value}>
						{formatAmount({
							amount   : invoice_total_discounted,
							currency : invoice_total_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : MAXIMUM_FRACTION_DIGIT,
							},
						})}
					</div>
				</div>

				<div className={styles.payment_mode_status}>
					{invoice?.payment_mode === 'credit' ? (
						<div>
							<div className={styles.info_container}>
								{startCase(creditSource?.slice(
									START_INDEX_FOR_CREDIT_SOURCE,
									END_INDEX_FOR_CREDIT_SOURCE,
								))}
							</div>

							<div className={styles.payment_method}>
								{startCase(
									`${
										creditSource?.[(creditSource?.length ?? FALLBACK_VALUE) - OFFSET_VALUE]
									} deferred payment`,
								)}
							</div>
						</div>
					) : (
						<div className={styles.payment_method}>{invoice?.payment_mode}</div>
					)}
				</div>
			</div>

			<div className={styles.invoice_container}>
				{status
					&& RESTRICT_REVOKED_STATUS.includes(status) ? (
						<>
							<div className={styles.invoice_status}>
								{startCase(status)}
							</div>
							{(status === 'finance_rejected' && rejection_reason)
								? (
									<div className={styles.rejection_reason}>
										<IcCError width={16} height={16} />
										<span>{rejection_reason}</span>
									</div>
								) : null}
						</>
					) : null}

				{isProcessing
					? (
						<div className={styles.reload}>
							<div className={cl`${styles.payment_method} ${styles.processing}`}>Processing</div>
							<Button
								size="sm"
								themeType="tertiary"
								onClick={() => sendInvoiceToFinance({
									payload: {
										id: invoiceId,
									},
								})}
							>
								<IcMRefresh width={15} height={15} fill="#ee3425" />
							</Button>
						</div>
					)
					: null}

				{(!is_revoked && status !== 'finance_rejected' && !isProcessing) ? (
					<Actions
						invoice={invoice}
						bfInvoiceRefetch={bfInvoiceRefetch}
						salesInvoicesRefetch={salesInvoicesRefetch}
						isAuthorized={isAuthorized}
						disableAction={disableAction}
						invoiceData={invoiceData}
					/>
				) : null}

				{(status === 'reviewed'
					&& shipment_data?.serial_id <= GLOBAL_CONSTANTS.invoice_check_id && !isProcessing) ? (
						<Button
							style={{ marginTop: '4px' }}
							size="sm"
							disabled={shipment_data?.is_job_closed}
							onClick={() => handleClick('amendment_requested')}
						>
							Request Amendment
						</Button>
					) : null}

				{(showRequestCN && !isProcessing) ? (
					<Button
						style={{ marginTop: '4px' }}
						size="sm"
						disabled={shipment_data?.is_job_closed}
						onClick={() => setAskNullify(true)}
					>
						Request CN
					</Button>
				) : null}

				{(status === 'reviewed' && !isProcessing) ? (
					<Button
						size="sm"
						onClick={() => setShowOTPModal(true)}
						disabled={shipment_data?.is_job_closed_financially}
					>
						Send OTP for Approval
					</Button>
				) : null}

				{(!INVOICE_STATUS.includes(status) && !isProcessing) ? (
					<Button
						size="sm"
						onClick={() => setShowReview(true)}
						themeType="accent"
						disabled={disableMarkAsReviewed
							|| invoice?.is_eta_etd || shipment_data?.is_job_closed_financially}
					>
						Mark as Reviewed
					</Button>
				) : null}

				{(is_revoked && status !== 'revoked' && !isProcessing) ? (
					<div className={styles.info_container}>Requested for Revoke</div>
				) : null}
			</div>

		</>

	);
}

export default InvoiceInfo;
