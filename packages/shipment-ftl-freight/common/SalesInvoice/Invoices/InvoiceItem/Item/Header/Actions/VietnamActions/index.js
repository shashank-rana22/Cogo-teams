import { Button, Popover, Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMOverflowDot,
	IcMInfo,
	IcCError,
	IcMEmail,
} from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useUpdateShipmentInvoiceStatus from '../../../../../../../../hooks/useUpdateShipmentInvoiceStatus';
import ClickableDiv from '../../../../../../../ClickableDiv';
import styles from '../styles.module.css';

const AddRemarks = dynamic(() => import('../../AddRemarks'), { ssr: false });
const ChangeCurrency = dynamic(() => import('../../ChangeCurrency'), { ssr: false });
const OTPVerification = dynamic(() => import('../../OTPVerification'), { ssr: false });
const ReviewServices = dynamic(() => import('../../ReviewServices'), { ssr: false });
const AmendmentReasons = dynamic(() => import('../AmendmentReasons'), { ssr: false });
const ChangePaymentMode = dynamic(() => import('../ChangePaymentMode'), { ssr: false });
const SendInvoiceEmail = dynamic(() => import('../SendInvoiceEmail'), { ssr: false });

const INVOICE_SERAIL_ID_LESS_THAN = 8;
const DEFAULT_COUNT = 0;

const DISABLE_STATUS = ['reviewed', 'approved'];
const REVIEW_STATUS = ['reviewed', 'approved', 'revoked'];
const INVOICE_TAG_STATUS = ['pending', 'approved'];

const remarkRender = ({ invoice }) => (
	<div className={styles.remark_container}>
		<div className={styles.title}>Invoice Remarks</div>
		<div className={styles.value}>{invoice.remarks}</div>
	</div>
);

const underTranslation = ({ invoice, bfInvoice }) => ((invoice?.status === 'reviewed'
	&& (!bfInvoice?.systemGeneratedProforma || !bfInvoice?.proformaPdfUrl))
		|| (invoice?.status === 'approved' && !bfInvoice?.systemGeneratedInvoice) ? (
			<div className={styles.pill}>Under Translation</div>
	) : null);

const approveButton = ({
	invoice,
	loading,
	updateInvoiceStatus = () => {},
	bfInvoice,
}) => (invoice?.status === 'reviewed' && bfInvoice?.systemGeneratedProforma && bfInvoice?.proformaPdfUrl
	? (
		<div className={styles.review_invoice}>
			<Button
				size="sm"
				onClick={updateInvoiceStatus}
				disabled={loading}
			>
				Approve
			</Button>
		</div>
	) : null
);

function Actions({
	invoice = {},
	refetch = () => {},
	shipment_data = {},
	invoiceData = {},
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
	bfInvoice = {},
}) {
	const [show, setShow] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const showForOldShipments =	shipment_data.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& invoice.status === 'pending';

	const disableActionCondition = DISABLE_STATUS.includes(invoice.status) || isEmpty(invoiceData.invoice_trigger_date);

	let disableAction = showForOldShipments ? isIRNGenerated : disableActionCondition;
	disableAction = invoice.status === 'amendment_requested' ? false : disableAction;

	// HARD CODING STARTS
	const invoice_serial_id = invoice.serial_id.toString() || '';
	const firstChar = invoice_serial_id[GLOBAL_CONSTANTS.zeroth_index];

	const isInvoiceBefore20Aug2022 = firstChar !== '1' || invoice_serial_id.length < INVOICE_SERAIL_ID_LESS_THAN;

	let disableMarkAsReviewed = disableAction;
	disableMarkAsReviewed = showForOldShipments ? isIRNGenerated && isInvoiceBefore20Aug2022 : disableMarkAsReviewed;
	// HARD CODING ENDS

	const refetchAfterCall = () => {
		setShowModal(false);
		refetch();
	};

	const { updateInvoiceStatus = () => {}, loading } = useUpdateShipmentInvoiceStatus({ refetch: refetchAfterCall });

	const handleShowModal = (type) => {
		setShowModal(type);
		setShow(false);
	};

	const handleRefetch = () => {
		refetch();
		salesInvoicesRefetch();
	};

	const commonActions = invoice.status !== 'approved' && !disableAction;

	const content = (
		<div className={styles.dialog_box}>
			{commonActions ? (
				<>
					<div>
						<ClickableDiv className={styles.text} onClick={() => handleShowModal('isChangeCurrency')}>
							Change Currency
						</ClickableDiv>

						<div className={styles.line} />
					</div>

					<ClickableDiv className={styles.text} onClick={() => handleShowModal('showAddRemarks')}>
						Add Remarks
					</ClickableDiv>

					<div>
						<div className={styles.line} />

						<ClickableDiv className={styles.text} onClick={() => handleShowModal('showChangePaymentMode')}>
							Change Payment Mode
						</ClickableDiv>
					</div>
				</>
			) : null}

			{(invoice.exchange_rate_document || []).map((url) => (
				<div key={url}>
					{commonActions ? <div className={styles.line} /> : null}
					<ClickableDiv className={styles.text} onClick={() => window.open(url, '_blank')}>
						Exchange Rate Document
					</ClickableDiv>
				</div>
			))}
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.main_container}>
				<div className={styles.actions_wrap}>
					<div className={styles.statuses}>
						{INVOICE_TAG_STATUS.includes(invoice.status) ? (
							<div className={styles.info_container}>{startCase(invoice.status)}</div>
						) : null}

						{!REVIEW_STATUS.includes(invoice.status) ? (
							<Button
								size="sm"
								onClick={() => setShowModal('showReview')}
								disabled={disableMarkAsReviewed}
							>
								Mark as Reviewed
							</Button>
						) : null}
					</div>
					{underTranslation({ invoice, bfInvoice })}

					{approveButton({ invoice, loading, updateInvoiceStatus, bfInvoice })}

					{invoice?.status === 'amendment_requested' ? (
						<Tooltip
							placement="bottom"
							theme="light-border"
							content={<AmendmentReasons invoice={invoice} />}
						>
							<div className={styles.icon_info_wrapper}>
								<IcCError width={17} height={17} />
							</div>
						</Tooltip>
					) : null}
				</div>
				<div className={styles.actions_wrap}>
					<div className={styles.email_wrapper}>
						<IcMEmail onClick={() => setShowModal('sendEmail')} />

						<Tooltip
							placement="bottom"
							theme="light"
							content={(
								<div className={styles.tooltip_child}>
									<div className={styles.flex_row}>
										{`Proforma email sent : ${invoice.proforma_email_count || DEFAULT_COUNT}`}
									</div>

									<div className={cl`${styles.flex_row} ${styles.margin}`}>
										{`Live email sent: ${invoice.sales_email_count || DEFAULT_COUNT}`}
									</div>

									<div className={cl`${styles.flex_row} ${styles.utr_details}`}>
										<div className={cl`${styles.flex_row} ${styles.margin}`}>
											{`UTR Number: ${invoice?.sales_utr?.utr_number || ''}`}
										</div>

										<div className={cl`${styles.flex_row} ${styles.margin}`}>
											{`Status: ${invoice?.sales_utr?.status || ''}`}
										</div>
									</div>
								</div>
							)}
						>
							<div className={styles.icon_div}>
								<IcMInfo />
							</div>
						</Tooltip>
					</div>

					{!disableAction || invoice.exchange_rate_document?.length ? (
						<Popover
							interactive
							placement="bottom"
							visible={show}
							content={content}
							theme="light"
							onClickOutside={() => setShow(false)}
						>
							<ClickableDiv className={styles.icon_more_wrapper} onClick={() => setShow(!show)}>
								<IcMOverflowDot />
							</ClickableDiv>
						</Popover>
					) : (
						<div className={styles.empty_div} />
					)}

					{!isEmpty(invoice.remarks) ? (
						<Tooltip
							placement="bottom"
							theme="light-border"
							content={remarkRender({ invoice })}
						>
							<div className={styles.icon_more_wrapper}><IcMInfo fill="yellow" /></div>
						</Tooltip>
					) : null}
				</div>
			</div>

			{showModal === 'showReview' ? (
				<ReviewServices
					show={showModal === 'showReview'}
					setShow={setShowModal}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showModal === 'isChangeCurrency' ? (
				<ChangeCurrency
					show={showModal === 'isChangeCurrency'}
					setShow={setShowModal}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showModal === 'showOtpModal' ? (
				<OTPVerification
					show={showModal === 'showOtpModal'}
					setShow={setShowModal}
					invoice={invoice}
					refetch={salesInvoicesRefetch}
					shipment_data={shipment_data}
				/>
			) : null}

			{showModal === 'showAddRemarks' ? (
				<AddRemarks
					show={showModal === 'showAddRemarks'}
					setShow={setShowModal}
					invoice={invoice}
					refetch={handleRefetch}
				/>
			) : null}

			{showModal === 'sendEmail' ? (
				<SendInvoiceEmail
					show={showModal === 'sendEmail'}
					setShow={setShowModal}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}

			{showModal === 'showChangePaymentMode' ? (
				<ChangePaymentMode
					show={showModal === 'showChangePaymentMode'}
					setShow={setShowModal}
					invoice={invoice}
					refetch={refetch}
				/>
			) : null}
		</div>
	);
}

export default Actions;
