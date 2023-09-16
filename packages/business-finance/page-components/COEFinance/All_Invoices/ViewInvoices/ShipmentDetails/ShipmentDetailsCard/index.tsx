/* eslint-disable no-nested-ternary */
import { Tooltip, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line import/no-cycle
import { DataInterface } from '..';
import { RemarksValInterface } from '../../../../../commons/Interfaces/index';
import billingPartyRejectCheckboxList from '../../../../constants/billing-party-remark-checkbox-list';
import collectionPartyRejectCheckboxList from '../../../../constants/collection-party-remark-checkbox-list';
import useListShipment from '../../../../hook/useListShipment';
import useShipmentDocument from '../../../../hook/useShipmentDocument';
import { getCardDataFromId } from '../../../../utils/getCardDataFromId';
import isDisabled from '../../../../utils/isDisabled';

import BillingPartyCard from './BillingPartyCard';
import CollectionPartyCard from './CollectionPartyCard';
import HighAmountRequestModal from './HighAdvancePaymentApprovalModal';
import InvoiceDetailsCard from './InvoiceDetailsCard';
import LineItemCard from './lineItemCard/index';
import RejectModal from './RejectModal';
import styles from './styles.module.css';

interface ShipmentDetailsCardInterface {
	data: DataInterface;
	remarksVal: RemarksValInterface;
	setRemarksVal: any;
	lineItemsRemarks: object;
	setLineItemsRemarks: React.Dispatch<React.SetStateAction<{}>>;
	invoiceStatus: string;
	lineItemsCheck?: boolean;
	setCheckItem: React.Dispatch<React.SetStateAction<{}>>;
	onAccept: any;
	onTabClick: any;
	tab?: { collectionPartyTab?: boolean,
		billingPartyTab?: boolean,
		invoiceDetailsTab?: boolean,
		lineItemsTab?: boolean,
	};
	setCombinedRemarks?: Function;
	docContent?: string;
}

const HIGH_ADVANCE_PAYMENT_PROOF = 'high_advance_payment_proof';
const MAX_CARDS = 4;
const LINE_ITEM_ID = 4;

function ShipmentDetailsCard({
	data = {},
	remarksVal = {},
	setRemarksVal = () => {},
	lineItemsRemarks = {},
	setLineItemsRemarks = () => {},
	invoiceStatus = '',
	lineItemsCheck = false,
	setCheckItem = (prop) => (prop),
	onAccept = (prop) => (prop),
	onTabClick = (prop) => (prop),
	tab = {},
	setCombinedRemarks = () => {},
	docContent = '',
}: ShipmentDetailsCardInterface) {
	const [showValue, setShowValue] = useState([]);
	const [rejected, setRejected] = useState([]);
	const [showRejected, setShowRejected] = useState({});
	const [showHighAdvanceModal, setShowHighAdvancedModal] = useState(false);
	const [checkedValue, setCheckedValue] = useState({
		collectionPartyRemark : [],
		billingPartyRemark    : [],
		invoiceDetailsRemark  : [],
	});

	const {
		lineItems, buyerDetail, sellerBankDetail, sellerDetail, bill, billAdditionalObject, serviceProviderDetail,
		remarks = [],
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
		billType = '',
		isProforma = false,
		billDocumentUrl,
		grandTotal,
		paidTds,
		subTotal,
	} = bill || {};

	const {
		shipmentType = '',
		serialId = '',
		advancedAmount = '0',
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
		{ id: 4, name: 'line-item-details', label: 'Timeline Details' },
	] as any);

	const isInvoiceApproved = invoiceStatus === 'FINANCE_ACCEPTED';

	const handleClick = (id?: number) => {
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

	const handleClickUndo = (id?: number) => {
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

	const handleClickReject = (id?: number) => {
		setShowRejected((previousActions: any) => ({
			...previousActions,
			[id]: !previousActions[id],
		}));
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

	const onSubmit = (cardId) => {
		const current = Object.keys(showRejected)?.[GLOBAL_CONSTANTS.zeroth_index];
		handleRejected(+current);
		setShowRejected(false);
		if (cardId !== LINE_ITEM_ID) {
			const { tabName = '', tabToOpen = '', timelineItem = '' } = getCardDataFromId(cardId);
			onAccept({ tabName, tabToOpen, timelineItem });
		}
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

	const lineItemCheckedCount = lineItemsCheck ? 1 : 0;

	useEffect(() => {
		const COMBINED_DATA = {};
		Object.keys(checkedValue)?.forEach((key) => {
			COMBINED_DATA[key] = [...checkedValue[key], ...remarksVal[key]];
		});
		setCombinedRemarks({ ...COMBINED_DATA });
	}, [checkedValue, remarksVal, setCombinedRemarks]);

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
						{!isEmpty(invoiceType) ? <Pill color="blue">{invoiceType}</Pill> : undefined}
					</div>

					{!isInvoiceApproved && (
						<div className={styles.completed}>
							<span className={styles.status_completed_text}>Completed</span>

							{!isDisabled(status)
								? MAX_CARDS : showValue.length + rejected.length + lineItemCheckedCount || 0}
							/
							{MAX_CARDS}
						</div>
					)}
				</div>
				<div className={styles.small_hr} />
				{DetailsCard.map((itemData: any) => {
					const { id = '' } = itemData || {};

					return (
						<>
							{showRejected[id as keyof typeof showRejected] && (
								<RejectModal
									id={id}
									showRejected={showRejected}
									onClose={onClose}
									collectionPartyRejectionList={collectionPartyRejectionList}
									billingPartyRejectionList={billingPartyRejectionList}
									checkedValue={checkedValue}
									setCheckedValue={setCheckedValue}
									remarksVal={remarksVal}
									setRemarksVal={setRemarksVal}
									invoiceType={invoiceType}
									remarks={remarks}
									organizationName={organizationName}
									onSubmit={onSubmit}
									billAdditionalObject={billAdditionalObject}
									bill={bill}
								/>
							)}

							{id === 1 && (
								<CollectionPartyCard
									showValue={showValue}
									isInvoiceApproved={isInvoiceApproved}
									rejected={rejected}
									handleClickUndo={handleClickUndo}
									collectionPartyRejectionList={collectionPartyRejectionList}
									handleClickReject={handleClickReject}
									handleClick={handleClick}
									status={status}
									docContent={docContent}
									setCheckItem={setCheckItem}
									onAccept={onAccept}
									onTabClick={onTabClick}
									showTab={tab.collectionPartyTab}
								/>
							)}

							{id === 2 && (
								<BillingPartyCard
									showValue={showValue}
									isInvoiceApproved={isInvoiceApproved}
									rejected={rejected}
									handleClickUndo={handleClickUndo}
									billingPartyRejectionList={billingPartyRejectionList}
									handleClickReject={handleClickReject}
									handleClick={handleClick}
									status={status}
									docContent={docContent}
									setCheckItem={setCheckItem}
									onAccept={onAccept}
									onTabClick={onTabClick}
									showTab={tab.billingPartyTab}
								/>
							)}

							{id === 3 && (
								<InvoiceDetailsCard
									showValue={showValue}
									isInvoiceApproved={isInvoiceApproved}
									rejected={rejected}
									handleClickUndo={handleClickUndo}
									handleClickReject={handleClickReject}
									handleClick={handleClick}
									invoiceType={invoiceType}
									organizationName={organizationName}
									remarks={remarks}
									billAdditionalObject={billAdditionalObject}
									bill={bill}
									advancedPaymentObj={advancedPaymentObj}
									setShowHighAdvancedModal={setShowHighAdvancedModal}
									docContent={docContent}
									setCheckItem={setCheckItem}
									onAccept={onAccept}
									onTabClick={onTabClick}
									showTab={tab.invoiceDetailsTab}
								/>
							)}

							{id === 4 && (
								<LineItemCard
									lineItems={lineItems}
									bill={bill}
									lineItemsRemarks={lineItemsRemarks}
									setLineItemsRemarks={setLineItemsRemarks}
									isInvoiceApproved={isInvoiceApproved}
									shipmentType={shipmentType}
									subTotal={subTotal}
									tdsRate={tdsRate}
									paidTds={paidTds}
									setCheckItem={setCheckItem}
									onTabClick={onTabClick}
									showTab={tab.lineItemsTab}
								/>
							)}
						</>
					);
				})}
			</div>
		</div>
	);
}
export default ShipmentDetailsCard;
