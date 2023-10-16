import { Button, Tooltip, Popover, Modal, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMOverflowDot, IcMInfo, IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import converter from 'number-to-words';
import React, { useEffect, useState } from 'react';

import List from '../../../../../../commons/List/index';
import { LINE_ITEMS, LINE_ITEMS_CHECK } from '../../../../../configurations/LINE_ITEMS';
import { getLineItemLabelStyle, getLineItemIcon } from '../../../../../utils/getLabelStyle';

import extraFunctions from './extraFunctions';
import RenderAction from './RenderAction';
import styles from './styles.module.css';

const PERCENTAGE_FACTOR = 100;
const MAX_DECIMAL_PLACES = 2;
const DEFAULT_GRAND_TOTAL = 1;
const DEFAULT_ZERO_VALUE = 0;
const PRESENT_TAB = 'lineItemsTab';

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
	onTabClick = (prop) => (prop),
	showTab = false,
	chargesTable = [],
}) {
	const [approvedItems, setApprovedItems] = useState({});
	const [popover, setPopover] = useState(false);
	const [rejectedItems, setRejectedItems] = useState({});
	const [activeLineItem, setActiveLineItem] = useState(0);
	const [showRejectedModal, setShowRejectedModal] = useState({
		id   : '',
		name : '',
	});

	const approveCheck = Object.values(approvedItems).filter(
		(item) => item === true,
	).length;

	const rejectCheck = Object.keys(rejectedItems).length;

	useEffect(() => {
		if (lineItems?.length === approveCheck + rejectCheck) {
			setCheckItem(
				(prev) => ({ ...prev, lineItemsCheck: true }),
			);
		} else if (lineItems?.length !== approveCheck + rejectCheck) {
			setCheckItem(
				(prev) => ({ ...prev, lineItemsCheck: false }),
			);
		}
	}, [approveCheck, rejectCheck, lineItems?.length, setCheckItem]);

	const lineItemLabel = getLineItemLabelStyle({
		length: lineItems?.length,
		approveCheck,
		rejectCheck,
		styles,
		isInvoiceApproved,
	});
	const iconElement = getLineItemIcon({
		length: lineItems?.length,
		approveCheck,
		rejectCheck,
		isInvoiceApproved,
	});

	const handleApproveClick = (key = '') => {
		setApprovedItems((previousActions) => ({
			...previousActions,
			[key]: !previousActions[key],
		}));
		setRejectedItems((p) => {
			// eslint-disable-next-line no-param-reassign
			delete p[key];
			return { ...p };
		});
		setLineItemsRemarks((prev) => {
			// eslint-disable-next-line no-param-reassign
			delete prev[key];
			return { ...prev };
		});
	};

	const openRejectModal = (item) => {
		setActiveLineItem(item?.id);
		setShowRejectedModal(item);
		setPopover((previousActions) => ({
			...previousActions,
			[item?.id]: !previousActions[item?.id],
		}));
	};

	const handleRejectClick = (key) => {
		setRejectedItems((p) => ({
			...p,
			[key]: true,
		}));
		setApprovedItems((p) => {
			// eslint-disable-next-line no-param-reassign
			delete p[key];
			return { ...p };
		});
		setPopover(false);
	};

	const onClose = () => {
		setPopover(false);
	};

	const functions = {
		renderIcon: (item) => (
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
		renderReject: (item) => (
			<div style={{ cursor: 'pointer' }}>
				{!isInvoiceApproved ? (
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
								{popover[item?.id] ? (
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
				) : null}
			</div>
		),
	};

	const allFunctions = { ...functions, ...(extraFunctions({ chargesTable })) };

	const { id } = showRejectedModal;

	const handleLineItemsRemarks = (val) => {
		setLineItemsRemarks({ ...lineItemsRemarks, [activeLineItem]: val });
	};

	const paidTdsPercentage = +((+paidTds / (+subTotal || DEFAULT_GRAND_TOTAL)) * PERCENTAGE_FACTOR)
		.toFixed(MAX_DECIMAL_PLACES);

	return (
		<div className={styles.line_item_container}>
			<div className={styles.header_dropdown}>
				<div className={styles.main_header}>
					<div className={styles.instructions}>
						<span className={lineItemLabel}>Line Items and Tax Rates</span>
						{showTab ? (
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
						{iconElement}
					</div>

					{showTab ? (
						<div>
							{!isInvoiceApproved ? (
								<div className={styles.header_detail}>
									Click
									{' '}
									<IcMOverflowDot />
									{' '}
									To reject line item
								</div>
							) : null}
						</div>
					) : null}
				</div>
				<div
					className={styles.caret}
					onClick={() => {
						onTabClick({ tabName: PRESENT_TAB });
					}}
					role="presentation"
				>
					{showTab ? (
						<IcMArrowRotateUp height="17px" width="17px" />
					) : (
						<IcMArrowRotateDown height="17px" width="17px" />
					)}
				</div>
			</div>
			{showTab ? <div className={styles.hr} /> : undefined}

			<div>
				{showTab ? (
					<div className={styles.container}>
						<List
							config={LINE_ITEMS}
							itemData={{ list: lineItems }}
							functions={allFunctions}
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
											? (
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
											) : null}
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

				{popover[id] ? (
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
									functions={allFunctions}
								/>
							</div>

							<div className={styles.text_container}>
								<Textarea
									name="remark"
									size="md"
									placeholder="Enter Remarks Here ..."
									style={{ width: '700', height: '100px' }}
									onChange={(val) => handleLineItemsRemarks(val)}
								/>
							</div>
						</Modal.Body>

						<Modal.Footer>
							<Button
								onClick={() => handleRejectClick(id)}
								disabled={!lineItemsRemarks[id] || (lineItemsRemarks[id]).length < 0}
							>
								Submit
							</Button>
						</Modal.Footer>
					</Modal>
				) : null}
			</div>
		</div>
	);
}
export default LineItemCard;
