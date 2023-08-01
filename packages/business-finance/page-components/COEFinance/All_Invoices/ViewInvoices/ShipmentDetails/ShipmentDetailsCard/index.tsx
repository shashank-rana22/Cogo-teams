/* eslint-disable no-nested-ternary */
import {
	Button,
	Tooltip,
	Modal,
	Textarea,
	ButtonIcon,
	CheckboxGroup,
} from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCFtick, IcMCrossInCircle, IcMInfo, IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line import/no-cycle
import { DataInterface } from '..';
import { RemarksValInterface } from '../../../../../commons/Interfaces/index';
import billingPartyRejectCheckboxList from '../../../../constants/billing-party-remark-checkbox-list';
import collectionPartyRejectCheckboxList from '../../../../constants/collection-party-remark-checkbox-list';
import invoiceDetailsRejectCheckboxList from '../../../../constants/invoice-details-checkbox-list';
import useListShipment from '../../../../hook/useListShipment';
import useShipmentDocument from '../../../../hook/useShipmentDocument';
import isDisabled from '../../../../utils/isDisabled';

import HighAmountRequestModal from './HighAdvancePaymentApprovalModal';
import LineItemCard from './lineItemCard/index';
import styles from './styles.module.css';

interface ShipmentDetailsCardInterface {
	data: DataInterface;
	remarksVal: RemarksValInterface;
	setRemarksVal: any;
	lineItemsRemarks: object;
	setLineItemsRemarks: React.Dispatch<React.SetStateAction<{}>>;
	setItemCheck: React.Dispatch<React.SetStateAction<boolean>>;
	setLineItem: React.Dispatch<React.SetStateAction<boolean>>;
	invoiceStatus: string;
}

const HIGH_ADVANCE_PAYMENT_PROOF = 'high_advance_payment_proof';
const VALID_ADVANCE_ATH_RANGE = 80;
const PERCENTAGE_FACTOR = 100;
const MAX_DECIMAL_PLACES = 2;
const DEFAULT_GRAND_TOTAL = 1;
const MIN_AMOUNT = 0;
const CHECK_REMARK_LENGTH = 1;

function ShipmentDetailsCard({
	data = {},
	remarksVal = {},
	setRemarksVal = () => {},
	lineItemsRemarks = {},
	setLineItemsRemarks = () => {},
	setItemCheck = () => {},
	setLineItem = () => {},
	invoiceStatus = '',
}: ShipmentDetailsCardInterface) {
	const [showValue, setShowValue] = useState([]);
	const [rejected, setRejected] = useState([]);
	const [showLineItem, setShowLineItem] = useState(false);
	const [showRejected, setShowRejected] = useState({});
	const [showHighAdvanceModal, setShowHighAdvancedModal] = useState(false);
	const [checkedValue, setCheckedValue] = useState({
		collectionPartyRemark : [],
		billingPartyRemark    : [],
		invoiceDetailsRemark  : [],
	});

	const {
		lineItems, buyerDetail, sellerBankDetail, sellerDetail, bill, billAdditionalObject, serviceProviderDetail,
	} = data || {};
	const {
		entityCode = '',
		organizationName: organizationNameBuyer = '',
		address = '',
		registrationNumber: registrationNumberBuyer = '',
		taxNumber: taxNumberBuyer = '',
		tdsRate = '',
	} = buyerDetail || {};
	const {
		organizationName = '', taxNumber = '', registrationNumber = '',
		organizationId: sellerOrganizationId,
	} = sellerDetail || {};
	const {
		bankName = '',
		accountNumber = '',
		ifscCode = '',
		beneficiaryName = '',
	} = sellerBankDetail || {};

	const {
		billNumber = '',
		billDate,
		status = '',
		placeOfSupply = '',
		billType = '',
		isProforma = false,
		billDocumentUrl,
		grandTotal,
		paidTds,
		subTotal,
	} = bill || {};

	const {
		shipmentType = '',
		reasonForCN = '',
		outstandingDocument = '',
		paymentType = '',
		isIncidental = '',
		serialId = '',
		advancedAmount = '0',
		advancedAmountCurrency = '',

	} = billAdditionalObject || {};

	const { organizationId: serviceProviderOrgId } = serviceProviderDetail || {};

	const [DetailsCard, setDetailsCard] = useState([
		{
			id    : 1,
			name  : 'billing-details',
			label : 'Bank Details - Collection Party',
		},
		{ id: 2, name: 'billing-party', label: 'Billing Party' },
		{ id: 3, name: 'invoice-details', label: 'Invoice Details' },
	] as any);

	const isInvoiceApproved = invoiceStatus === 'FINANCE_ACCEPTED';

	const advancedATHAmountPercentage = +((+advancedAmount / (+grandTotal || DEFAULT_GRAND_TOTAL)) * PERCENTAGE_FACTOR)
		.toFixed(MAX_DECIMAL_PLACES);
	const isAdvancedATHAmountGreaterThan80Percent = !Number.isNaN(advancedATHAmountPercentage)
														&& advancedATHAmountPercentage > VALID_ADVANCE_ATH_RANGE;

	const handleClick = (id: number) => {
		const approveData = [...showValue, id];
		setShowValue(approveData);
		DetailsCard.push(DetailsCard.shift());
		setDetailsCard(DetailsCard);
	};

	const handleRejected = (id: number) => {
		setRejected([...rejected, id]);
		DetailsCard.push(DetailsCard.shift());
		setDetailsCard(DetailsCard);
	};

	let invoiceType = startCase(billType);

	if (billType === 'BILL') {
		if (isProforma === true) {
			invoiceType = 'PROFORMA INVOICE';
		} else {
			invoiceType = 'PURCHASE INVOICE';
		}
	}

	const { data: shipmentData } = useListShipment(serialId);
	const [dataList = {}] = shipmentData?.list || [];

	const shipmentId = dataList?.id || '';

	const { data : shipmentDocData, refetchShipmentDocument } = useShipmentDocument(shipmentId);

	const [advancedPaymentObj = {}] = (shipmentDocData?.list
		?.filter((item) => JSON.parse(JSON.stringify(item?.data || ''))?.invoice_number === billNumber
		&& item?.document_type === HIGH_ADVANCE_PAYMENT_PROOF) || []);

	const handleClickUndo = (id: number) => {
		const undoApprovedData = showValue.filter((item: any) => item !== id);
		setShowValue(undoApprovedData);
		const undoRejectedData = rejected.filter((item: any) => item !== id);
		setRejected(undoRejectedData);

		if (id === 1) {
			setRemarksVal({ ...remarksVal, collectionPartyRemark: [] });
		} else if (id === 2) {
			setRemarksVal({ ...remarksVal, billingPartyRemark: [] });
		} else if (id === 3) {
			setRemarksVal({ ...remarksVal, invoiceDetailsRemark: [] });
		}
	};

	const handleClickReject = (id: number) => {
		setShowRejected((previousActions: any) => ({
			...previousActions,
			[id]: !previousActions[id],
		}));
	};

	const viewDocument = (document) => {
		window.open(document);
	};
	const onClose = () => {
		if (Object.keys(showRejected).includes('1')) {
			setRemarksVal({ ...remarksVal, collectionPartyRemark: [] });
			setCheckedValue({
				...checkedValue,
				collectionPartyRemark: [],
			});
		} else if (Object.keys(showRejected).includes('2')) {
			setRemarksVal({ ...remarksVal, billingPartyRemark: [] });
			setCheckedValue({
				...checkedValue,
				billingPartyRemark: [],
			});
		} else {
			setRemarksVal({ ...remarksVal, invoiceDetailsRemark: [] });
			setCheckedValue({
				...checkedValue,
				invoiceDetailsRemark: [],
			});
		}
		setShowRejected(false);
	};

	const onSubmit = () => {
		const current = Object.keys(showRejected)?.[GLOBAL_CONSTANTS.zeroth_index];
		handleRejected(+current);
		setShowRejected(false);
	};
	const handleSave = () => {
		setShowLineItem(true);
		setItemCheck(true);
	};
	const collectionPartyRejectionList = collectionPartyRejectCheckboxList(
		{
			organizationName,
			beneficiaryName,
			bankName,
			accountNumber,
			ifscCode,
			registrationNumber,
			taxNumber,
		},
	);
	const billingPartyRejectionList = billingPartyRejectCheckboxList(
		{
			entityCode,
			organizationNameBuyer,
			address,
			registrationNumberBuyer,
			taxNumberBuyer,
		},
	);

	useEffect(() => {
		setRemarksVal((prev) => ({
			...prev,
			collectionPartyRemark:
			[...checkedValue.collectionPartyRemark, prev.collectionPartyRemark[
				prev.collectionPartyRemark.length - CHECK_REMARK_LENGTH]],
			billingPartyRemark:
			[...checkedValue.billingPartyRemark, prev.billingPartyRemark[
				prev.billingPartyRemark.length - CHECK_REMARK_LENGTH]],
			invoiceDetailsRemark:
			[...checkedValue.invoiceDetailsRemark, prev.invoiceDetailsRemark[
				prev.invoiceDetailsRemark.length - CHECK_REMARK_LENGTH]],
		}));
	}, [checkedValue, setRemarksVal]);

	return (
		<div>
			{!!showHighAdvanceModal && (
				<HighAmountRequestModal
					shipmentData={shipmentData}
					invoiceData={{
						invoiceNumber       : billNumber,
						serialNumber        : serialId,
						invoiceUploadDate   : billDate,
						invoice             : billDocumentUrl,
						totalInvoiceValue   : grandTotal,
						advancedAmountValue : advancedAmount,
						advancedPaymentObj,
						sellerOrganizationId,
					}}
					serviceProviderOrgId={serviceProviderOrgId}
					modalData={{ show: showHighAdvanceModal, hide: () => setShowHighAdvancedModal(false) }}
					refetchShipmentDocument={refetchShipmentDocument}
				/>
			)}

			{showLineItem ? (
				<LineItemCard
					lineItems={lineItems}
					bill={bill}
					setShowLineItem={setShowLineItem}
					lineItemsRemarks={lineItemsRemarks}
					setLineItemsRemarks={setLineItemsRemarks}
					setLineItem={setLineItem}
					invoiceType={invoiceType}
					isInvoiceApproved={isInvoiceApproved}
					shipmentType={shipmentType}
					subTotal={subTotal}
					tdsRate={tdsRate}
					paidTds={paidTds}
				/>
			) : (
				<div>
					<div className={styles.main_header}>
						<div className={styles.instructions}>
							Check the Details
							<Tooltip
								content={(
									<div className={styles.form_style}>
										As filled by SO2 In The COGO Invoice
									</div>
								)}
							>
								<div className={styles.tooltip}>
									<IcMInfo width={15} height={15} />
								</div>
							</Tooltip>
						</div>

						{!isInvoiceApproved && (
							<div className={styles.completed}>
								Completed
								{!isDisabled(status) ? 3 : showValue.length + rejected.length || 0}
								/3
							</div>
						)}
					</div>
					<div className={styles.small_hr} />
					{DetailsCard.map((itemData: any) => {
						const { id, label = '' } = itemData || {};

						return (
							<>
								{showRejected[id as keyof typeof showRejected] && (
									<Modal
										size="lg"
										show={showRejected[id as keyof typeof showRejected]}
										onClose={onClose}
									>
										<Modal.Header title="CHOOSE THE DETAILS YOU WANT TO REJECT" />
										<Modal.Body>
											{Object.keys(showRejected).includes('1') && (
												<div>
													<div className={styles.flex_center}>
														<CheckboxGroup
															options={collectionPartyRejectionList}
															onChange={(val) => {
																setCheckedValue(
																	{ ...checkedValue, collectionPartyRemark: val },
																);
															}}
															value={checkedValue.collectionPartyRemark}
															style={{ display: 'flex', flexDirection: 'column' }}
														/>
													</div>
													<Textarea
														name="remark"
														size="md"
														placeholder="Remarks Here ..."
														style={{ width: '700', height: '100px' }}
														value={remarksVal.collectionPartyRemark[remarksVal
															.collectionPartyRemark.length - CHECK_REMARK_LENGTH]}
														onChange={(value) => setRemarksVal({
															...remarksVal,
															collectionPartyRemark: [
																...checkedValue.collectionPartyRemark, value],
														})}
													/>
												</div>
											)}

											{Object.keys(showRejected).includes('2') && (
												<div>
													<div className={styles.flex_center}>
														<CheckboxGroup
															options={billingPartyRejectionList}
															onChange={(val) => {
																setCheckedValue(
																	{ ...checkedValue, billingPartyRemark: val },
																);
															}}
															value={checkedValue.billingPartyRemark}
															style={{ display: 'flex', flexDirection: 'column' }}
														/>
													</div>
													<Textarea
														name="remark"
														size="md"
														placeholder="Remarks Here ..."
														value={remarksVal.billingPartyRemark[remarksVal
															.billingPartyRemark.length - CHECK_REMARK_LENGTH]}
														onChange={(value) => setRemarksVal({
															...remarksVal,
															billingPartyRemark: [
																...checkedValue.billingPartyRemark, value],
														})}
														style={{ width: '700', height: '100px' }}
													/>
												</div>
											)}
											{Object.keys(showRejected).includes('3') && (
												<div>
													<div className={styles.flex_center}>
														<CheckboxGroup
															options={invoiceDetailsRejectCheckboxList(
																{
																	billNumber,
																	billDate,
																	status,
																	placeOfSupply,
																},
															)}
															onChange={(val) => {
																setCheckedValue(
																	{ ...checkedValue, invoiceDetailsRemark: val },
																);
															}}
															value={checkedValue.invoiceDetailsRemark}
															style={{ display: 'flex', flexDirection: 'column' }}
														/>
													</div>

													<Textarea
														name="remark"
														size="md"
														placeholder="Remarks Here ..."
														value={remarksVal.invoiceDetailsRemark[remarksVal
															.invoiceDetailsRemark.length - CHECK_REMARK_LENGTH]}
														onChange={(value) => setRemarksVal({
															...remarksVal,
															invoiceDetailsRemark: [
																...checkedValue.invoiceDetailsRemark, value],
														})}
														style={{ width: '700', height: '100px' }}
													/>
												</div>
											)}
										</Modal.Body>
										<Modal.Footer>
											<Button onClick={onSubmit}>Submit</Button>
										</Modal.Footer>
									</Modal>
								)}

								{id === 1 && (
									<div className={styles.container}>
										<div className={styles.header_container}>
											<div
												className={
                showValue.includes(1) || isInvoiceApproved ? styles.label_approved : rejected.includes(1)
                // eslint-disable-next-line no-mixed-spaces-and-tabs
                	? styles.label_rejected : styles.label
                        }
											>
												{label}
												<div
													style={{ justifyContent: 'center', display: 'flex' }}
												>
													{showValue.includes(1) || isInvoiceApproved ? (
														<IcCFtick height="17px" width="17px" />
													) : rejected.includes(1) ? (
														<IcMCrossInCircle height="17px" width="17px" />
													) : null}
												</div>
											</div>

											{!isInvoiceApproved && (
												<div>
													{showValue.includes(1) || rejected.includes(1) ? (
														<div
															className={styles.button_container}
															onClick={() => {
																handleClickUndo(id);
															}}
															role="presentation"
														>
															<Button size="md" themeType="secondary">
																Undo
															</Button>
														</div>
													) : (
														<div className={styles.button_container}>
															<Button
																disabled={!isDisabled(status)}
																size="md"
																themeType="secondary"
																onClick={() => {
																	handleClick(id);
																}}
															>
																Approve
															</Button>
															<Button
																disabled={!isDisabled(status)}
																size="md"
																themeType="secondary"
																style={{ border: '1px solid #ed3726' }}
																onClick={() => {
																	handleClickReject(id);
																}}
															>
																Reject
															</Button>
														</div>
													)}
												</div>
											)}
										</div>
										<div className={styles.hr} />

										<div className={styles.billing_party_container}>
											{collectionPartyRejectionList?.map((item) => (
												<div key={item.label} className={styles.margin_bottom}>
													{item.label}
												</div>
											))}
										</div>
									</div>
								)}

								{id === 2 && (
									<div className={styles.container}>
										<div className={styles.header_container}>
											<div
												className={
                          showValue.includes(2) || isInvoiceApproved ? styles.label_approved : rejected.includes(2)
                          // eslint-disable-next-line no-mixed-spaces-and-tabs
                          	? styles.label_rejected : styles.label
                        }
											>
												{label}
												<div
													style={{ justifyContent: 'center', display: 'flex' }}
												>
													{showValue.includes(2) || isInvoiceApproved ? (
														<IcCFtick height="17px" width="17px" />
													) : rejected.includes(2) ? (
														<IcMCrossInCircle height="17px" width="17px" />
													) : null}
												</div>
											</div>

											{!isInvoiceApproved && (
												<div>
													{showValue.includes(2) || rejected.includes(2) ? (
														<div
															className={styles.button_container}
															onClick={() => {
																handleClickUndo(id);
															}}
															role="presentation"
														>
															<Button size="md" themeType="secondary">
																Undo
															</Button>
														</div>
													) : (
														<div className={styles.button_container}>
															<Button
																disabled={!isDisabled(status)}
																size="md"
																themeType="secondary"
																onClick={() => {
																	handleClick(id);
																}}
															>
																Approve
															</Button>
															<Button
																disabled={!isDisabled(status)}
																size="md"
																themeType="secondary"
																style={{ border: '1px solid #ed3726' }}
																onClick={() => {
																	handleClickReject(id);
																}}
															>
																Reject
															</Button>
														</div>
													)}
												</div>
											)}
										</div>

										<div className={styles.hr} />

										<div className={styles.billing_party_container}>
											{billingPartyRejectionList?.map((item) => (
												<div key={item.label} className={styles.margin_bottom}>
													{item.label}
												</div>
											))}
										</div>
									</div>
								)}

								{id === 3 && (
									<div className={styles.container}>
										<div className={styles.header_container}>
											<div
												className={
                          showValue.includes(3) || isInvoiceApproved ? styles.label_approved : rejected.includes(3)
                          // eslint-disable-next-line no-mixed-spaces-and-tabs
                          	? styles.label_rejected : styles.label
                        }
											>
												{label}
												{' '}
												<div
													style={{ justifyContent: 'center', display: 'flex' }}
												>
													{showValue.includes(3) || isInvoiceApproved ? (
														<IcCFtick height="17px" width="17px" />
													) : rejected.includes(3) ? (
														<IcMCrossInCircle height="17px" width="17px" />
													) : null}
												</div>
											</div>

											{!isInvoiceApproved && (
												<div>
													{showValue.includes(3) || rejected.includes(3) ? (
														<div
															className={styles.button_container}
															onClick={() => {
																handleClickUndo(id);
															}}
															role="presentation"
														>
															<Button size="md" themeType="secondary">
																Undo
															</Button>
														</div>
													) : (
														<div className={styles.button_container}>
															<Button
																disabled={!isDisabled(status)}
																size="md"
																themeType="secondary"
																onClick={() => {
																	handleClick(id);
																}}
															>
																Approve
															</Button>
															<Button
																disabled={!isDisabled(status)}
																size="md"
																themeType="secondary"
																style={{ border: '1px solid #ed3726' }}
																onClick={() => {
																	handleClickReject(id);
																}}
															>
																Reject
															</Button>
														</div>
													)}
												</div>
											)}
										</div>

										<div className={styles.hr} />
										<div className={styles.billing_party_container}>
											<div className={styles.margin_bottom}>
												Bill Type -
												{' '}
												<span>{invoiceType}</span>
											</div>
											<div className={styles.margin_bottom}>
												Invoice Number -
												{' '}
												<span>{billNumber}</span>
											</div>
											<div className={styles.margin_bottom}>
												Invoice Date -
												{' '}
												<span>
													{formatDate({
														date       : billDate,
														dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'],
														formatType : 'date',
													})}
												</span>
											</div>
											<div className={styles.margin_bottom}>
												Status -
												{' '}
												<span>{startCase(status)}</span>
											</div>
											<div className={styles.margin_bottom}>
												Place Of Supply -
												{' '}
												<span>{placeOfSupply}</span>
											</div>

											{shipmentType === 'ftl_freight'
											&& billType === 'BILL' && 		isIncidental
											&& (
												<div className={styles.margin_bottom}>
													Is Incidental -
													{' '}
													<span>{startCase(isIncidental)}</span>
												</div>
											)}
											{shipmentType === 'ftl_freight'
											&& billType === 'BILL' && 	paymentType
											&& (
												<div className={styles.margin_bottom}>
													Payment Type -
													{' '}
													<span>{startCase(paymentType)}</span>
												</div>
											)}
											{shipmentType === 'ftl_freight' && (
												<div className={styles.document}>
													Advance amount -
													{' '}
													{advancedATHAmountPercentage}
													%
													{' '}
													{advancedAmountCurrency}
													{' '}
													(
													{advancedAmount}
													/
													{grandTotal}
													)

													{!Number.isNaN(advancedATHAmountPercentage)
														&& isAdvancedATHAmountGreaterThan80Percent
														? !advancedPaymentObj?.remarks?.includes('accepted', 'rejected')
															? (
																<Tooltip
																	placement="top"
																	trigger="mouseenter"
																	interactive
																	content={<div>ATH document was rejected</div>}
																>
																	<Button
																		className={styles.button}
																		onClick={() => {
																			setShowHighAdvancedModal(true);
																		}}
																		disabled={advancedPaymentObj
																			?.remarks?.includes('rejected')}
																	>
																		View
																	</Button>
																</Tooltip>

															) : (
																<ButtonIcon
																	size="sm"
																	icon={<IcMDownload />}
																	onClick={() => {
																		viewDocument(advancedPaymentObj?.document_url);
																	}}
																	themeType="primary"
																/>
															)
														: null}
												</div>
											)}
											{shipmentType === 'ftl_freight'
											&& advancedPaymentObj?.data
											&& (
												<div className={styles.margin_bottom}>
													Updated Advanced Amount -
													{' '}
													{advancedAmountCurrency}
													{' '}
													<span>
														{JSON.parse(advancedPaymentObj?.data)?.updated_advanced_amount
														|| MIN_AMOUNT}
													</span>
												</div>
											)}
											{shipmentType === 'ftl_freight'
											&& outstandingDocument
											&& (
												<div className={styles.margin_bottom}>
													Outstanding Proforma Approval-
													{' '}
													<ButtonIcon
														size="sm"
														icon={<IcMDownload />}
														onClick={() => {
															viewDocument(outstandingDocument);
														}}
														themeType="primary"
													/>
												</div>
											)}
											{shipmentType === 'ftl_freight'
											&& billType === 'CREDIT_NOTE' && reasonForCN
											&& (
												<div className={styles.margin_bottom}>
													Reason For CN -
													{' '}
													<span>{startCase(reasonForCN)}</span>
												</div>
											)}

										</div>
									</div>
								)}
							</>
						);
					})}

					<div className={styles.footer}>
						<Button
							size="md"
							disabled={
                !(showValue.length + rejected.length === 3 || isInvoiceApproved)
              }
							onClick={() => handleSave()}
						>
							{isInvoiceApproved ? 'Check line items ➢ ' : ' Save And Next ➢ '}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
export default ShipmentDetailsCard;
