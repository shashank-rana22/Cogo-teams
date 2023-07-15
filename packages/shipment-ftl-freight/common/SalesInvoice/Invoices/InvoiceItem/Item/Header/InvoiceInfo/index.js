import { Button, cl, Tooltip } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import useUpdateShipmentInvoiceStatus from '../../../../../../../hooks/useUpdateShipmentInvoiceStatus';
import ClickableDiv from '../../../../../../ClickableDiv';
import Actions from '../Actions';

import styles from './styles.module.css';

const MAXIMUM_FRACTION_DIGIT = 2;
const OFFSET_VALUE = 2;
const END_INDEX_FOR_CREDIT_SOURCE = -2;
const START_INDEX_FOR_CREDIT_SOURCE = 0;
const FALLBACK_VALUE = 0;
const INVOICE_STATUS = ['reviewed', 'approved', 'revoked'];
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

}) {
	const { user_data } = useSelector(({ profile }) => ({ user_data: profile || {} }));
	const isAuthorizedForCN = [
		GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id,
		GLOBAL_CONSTANTS.uuid.sachin_mehra_user_id].includes(user_data?.user?.id);

	const {
		invoice_total_currency,
		invoice_total_discounted,
		live_invoice_number,
	} = invoice;

	const { shipment_data } = useContext(ShipmentDetailContext);

	const showIrnTriggerForOldShipments = shipment_data?.serial_id <= GLOBAL_CONSTANTS.invoice_check_id
	&& invoice?.status === 'reviewed'
		&& !isEmpty(invoice?.data);

	const creditSource = invoice?.credit_option?.credit_source?.split('_');

	const refetchAferApiCall = () => {
		bfInvoiceRefetch();
	};

	const { apiTrigger = () => {} } = useUpdateShipmentInvoiceStatus({ refetch: refetchAferApiCall });

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
				{invoice.status
					&& RESTRICT_REVOKED_STATUS.includes(invoice.status) ? (
						<div className={styles.invoice_status}>
							{startCase(invoice.status)}
						</div>
					) : null}

				{!invoice.is_revoked && invoice.status !== 'finance_rejected' ? (
					<Actions
						invoice={invoice}
						bfInvoiceRefetch={bfInvoiceRefetch}
						salesInvoicesRefetch={salesInvoicesRefetch}
						isAuthorized={isAuthorized}
						disableAction={disableAction}
					/>
				) : null}

				{invoice?.status === 'reviewed'
					&& shipment_data?.serial_id <= GLOBAL_CONSTANTS.invoice_check_id ? (
						<Button
							style={{ marginTop: '4px' }}
							size="sm"
							onClick={() => handleClick('amendment_requested')}
						>
							Request Amendment
						</Button>
					) : null}

				{showRequestCN && isAuthorizedForCN ? (
					<Button
						style={{ marginTop: '4px' }}
						size="sm"
						onClick={() => setAskNullify(true)}
					>
						Request CN
					</Button>
				) : null}

				{invoice?.status === 'reviewed' ? (
					<Button
						size="sm"
						onClick={() => setShowOTPModal(true)}
					>
						Send OTP for Approval
					</Button>
				) : null}

				{!INVOICE_STATUS.includes(invoice.status) ? (
					<Button
						size="sm"
						onClick={() => setShowReview(true)}
						themeType="accent"
						disabled={disableMarkAsReviewed || invoice?.is_eta_etd}
					>
						Mark as Reviewed
					</Button>
				) : null}

				{invoice?.is_revoked && invoice?.status !== 'revoked' ? (
					<div className={styles.info_container}>Requested for Revoke</div>
				) : null}
			</div>

		</>

	);
}

export default InvoiceInfo;
