import {
	Button,
	Tooltip,
	Popover,
	Modal,
	Textarea,
} from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import {
	IcMOverflowDot,
	IcMInfo,
	IcMArrowRotateDown,
	IcMArrowRotateUp,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import converter from 'number-to-words';
import React, { useEffect, useState } from 'react';

import List from '../../../../../../commons/List/index';
import {
	LINE_ITEMS,
	LINE_ITEMS_CHECK,
} from '../../../../../configurations/LINE_ITEMS';

import RenderAction from './RenderAction';
import styles from './styles.module.css';

interface LineItemCardInterface {
	lineItems: Array<object>;
	bill?: {
		taxTotal: any;
		billCurrency: string;
		grandTotal: any;
		subTotal: string | number;
		tdsAmount: string | number;
	};
	lineItemsRemarks: object;
	setLineItemsRemarks: React.Dispatch<React.SetStateAction<{}>>;
	isInvoiceApproved: boolean;
	shipmentType: string;
	tdsRate: string | number;
	paidTds: string | number;
	subTotal: string | number;
	setCheckItem: React.Dispatch<React.SetStateAction<{}>>;
}

const PERCENTAGE_FACTOR = 100;
const MAX_DECIMAL_PLACES = 2;
const DEFAULT_GRAND_TOTAL = 1;
const DEFAULT_ZERO_VALUE = 0;
function LineItemCard({
	lineItems = [],
	bill = {
		taxTotal     : 0,
		billCurrency : '',
		grandTotal   : 0,
		subTotal     : '' || 0,
		tdsAmount    : 0,
	},
	lineItemsRemarks = {},
	setLineItemsRemarks = () => {},
	isInvoiceApproved = false,
	shipmentType = '',
	tdsRate = 0,
	paidTds = 0,
	subTotal = 0,
	setCheckItem = (prop) => (prop),
}: LineItemCardInterface) {
	const [showDetails, setShowDetails] = useState(false);
	const [approvedItems, setApprovedItems] = useState({});
	const [popover, setPopover] = useState(false);
	const [rejectedItems, setRejectedItems] = useState({});
	const [activeLineItem, setActiveLineItem] = useState(0);
	const [showRejectedModal, setShowRejectedModal] = useState({
		id   : '',
		name : '',
	});

	const ApproveCheck = Object.values(approvedItems).filter(
		(item) => item === true,
	).length;

	const RejectCheck = Object.keys(rejectedItems).length;

	useEffect(() => {
		if (lineItems?.length === ApproveCheck + RejectCheck) {
			setCheckItem(
				(prev) => ({ ...prev, lineItemsCheck: true }),
			);
		} else if (lineItems?.length !== ApproveCheck + RejectCheck) {
			setCheckItem(
				(prev) => ({ ...prev, lineItemsCheck: false }),
			);
		}
	}, [ApproveCheck, RejectCheck, lineItems?.length, setCheckItem]);

	const handleApproveClick = (key = '') => {
		setApprovedItems((previousActions: any) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
		setRejectedItems((p) => {
			// eslint-disable-next-line no-param-reassign
			delete p[key as keyof typeof p];
			return { ...p };
		});
		setLineItemsRemarks((prev) => {
			// eslint-disable-next-line no-param-reassign
			delete prev[key as keyof typeof prev];
			return { ...prev };
		});
	};

	const openRejectModal = (item: any) => {
		setActiveLineItem(item?.id);
		setShowRejectedModal(item);
		setPopover((previousActions: any) => ({
			...previousActions,
			[item?.id]: !previousActions[item?.id],
		}));
	};

	const handleRejectClick = (key: string = '') => {
		setRejectedItems((p: any) => ({
			...p,
			[key]: true,
		}));
		setApprovedItems((p) => {
			// eslint-disable-next-line no-param-reassign
			delete p[key as keyof typeof p];
			return { ...p };
		});
		setPopover(false);
	};

	const onClose = () => {
		setPopover(false);
	};

	const functions = {
		renderIcon: (item: any) => (
			<div
				className={styles.circle_big}
				onClick={() => {
					handleApproveClick(item?.id);
				}}
				role="presentation"
			>
				<RenderAction
					id={item?.id}
					isInvoiceApproved={isInvoiceApproved}
					rejectedItems={rejectedItems}
					approvedItems={approvedItems}
				/>
			</div>
		),
		renderReject: (item: any) => (
			<div style={{ cursor: 'pointer' }}>
				{!isInvoiceApproved && (
					<Popover
						placement="left"
						render={(
							<div
								className={styles.popover_rejected}
								onClick={() => {
									openRejectModal(item);
								}}
								role="presentation"
							>
								{popover[item?.id as keyof typeof popover] ? (
									<div>Undo</div>
								) : (
									<div>Reject Line Item</div>
								)}
							</div>
						)}
					>
						<div>
							{' '}
							<IcMOverflowDot width="20px" height="20px" />
							{' '}
						</div>
					</Popover>
				)}
			</div>
		),
	};

	const { id } = showRejectedModal;

	const handleLineItemsRemarks = (val: string) => {
		setLineItemsRemarks({ ...lineItemsRemarks, [activeLineItem]: val });
	};

	const paidTdsPercentage = +((+paidTds / (+subTotal || DEFAULT_GRAND_TOTAL)) * PERCENTAGE_FACTOR)
		.toFixed(MAX_DECIMAL_PLACES);

	return (
		<div className={styles.line_item_container}>
			<div className={styles.header_dropdown}>
				<div className={styles.main_header}>
					<div className={styles.instructions}>
						Line Items and Tax Rates
						{showDetails ? (
							<div className={styles.pill_tooltip}>
								<Tooltip
									content={(
										<div className={styles.form_style}>
											As filled by SO2 In The COGO Invoice
										</div>
									)}
								>
									<IcMInfo width={15} height={15} />
								</Tooltip>
							</div>
						) : undefined}
					</div>

					{showDetails && (
						<div>
							{!isInvoiceApproved && (
								<div className={styles.header_detail}>
									Click
									{' '}
									<IcMOverflowDot />
									{' '}
									To reject line item
								</div>
							)}
						</div>
					)}
				</div>
				<div
					className={styles.caret}
					onClick={() => {
						setShowDetails(!showDetails);
					}}
					role="presentation"
				>
					{showDetails ? (
						<IcMArrowRotateUp height="17px" width="17px" />
					) : (
						<IcMArrowRotateDown height="17px" width="17px" />
					)}
				</div>
			</div>
			{showDetails ? <div className={styles.hr} /> : undefined}

			<div>
				{showDetails ? (
					<div className={styles.container}>
						<List
							config={LINE_ITEMS}
							itemData={{ list: lineItems }}
							functions={functions}
						/>

						<div className={styles.outer}>
							<div className={styles.flex}>
								<div className={styles.flex_div}>
									<div className={styles.info}>T: Taxable</div>
									<div className={styles.info}>P: Pure Agent</div>
									<div className={styles.info}>E: Exempted</div>
									<div className={styles.info}>N: Nil Rated</div>
									<div className={styles.info}>NG: Non GST</div>
									<div className={styles.info}>R: Reverse Charge</div>
								</div>

								<div className={styles.amount}>
									<div className={styles.border}>
										{formatAmount({
											amount   :	bill?.taxTotal || '0',
											currency :	bill?.billCurrency || GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										})}
									</div>
								</div>
								<div className={styles.amount_right}>
									<div className={styles.border_right}>
										{formatAmount({
											amount   :	bill?.grandTotal || '0',
											currency :	bill?.billCurrency || GLOBAL_CONSTANTS.currency_code.INR,
											options  : {
												style           : 'currency',
												currencyDisplay : 'code',
											},
										})}
										{shipmentType === 'ftl_freight'
								&& (
									<div>
										<div className={styles.tds_amount}>
											(Applicable  TDS
											{' '}
											{tdsRate}
											% -
											{' '}
											{startCase(bill?.billCurrency)}
											{' '}
											{bill?.tdsAmount || DEFAULT_ZERO_VALUE}
											)
										</div>
										<div className={styles.tds_amount}>
											(Ded. TDS
											{' '}
											{paidTdsPercentage}
											% -
											{' '}
											{startCase(bill?.billCurrency)}
											{' '}
											{paidTds || DEFAULT_ZERO_VALUE}
											)
										</div>
									</div>
								)}
									</div>
								</div>
							</div>

							<div className={styles.flex}>
								<div className={styles.bottom_div}>
									<div>Total payable in words : </div>
									<div className={styles.words_currency}>
										{bill?.billCurrency}
										{' '}
										{bill?.subTotal ? (
											<>
												{startCase(converter.toWords(bill?.grandTotal))}
												{' '}
												only
											</>
										) : null}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : undefined }

				{popover[id as keyof typeof popover] && (
					<Modal
						size="lg"
						placement="center"
						show={popover[id]}
						onClose={onClose}
					>
						<Modal.Header title="Rejected line items" />
						<Modal.Body>
							<div className={styles.modal_container}>
								<List
									config={LINE_ITEMS_CHECK}
									itemData={{ list: [showRejectedModal] }}
									functions={functions}
								/>
							</div>

							<div style={{ display: 'flex', justifyContent: 'center' }} />
							<Textarea
								name="remark"
								size="md"
								placeholder="Remarks Here ..."
								style={{ width: '700', height: '100px' }}
								onChange={(val: string) => handleLineItemsRemarks(val)}
							/>
						</Modal.Body>

						<Modal.Footer>
							<Button
								onClick={() => handleRejectClick(id)}
								disabled={
                     !lineItemsRemarks[id as keyof typeof lineItemsRemarks
                     ] || (lineItemsRemarks[id as keyof typeof lineItemsRemarks
                     ] as Array<string>
                     ).length < 0
                }
							>
								Submit
							</Button>
						</Modal.Footer>
					</Modal>
				)}
			</div>
		</div>
	);
}
export default LineItemCard;
