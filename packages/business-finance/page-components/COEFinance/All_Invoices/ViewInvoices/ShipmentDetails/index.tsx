import { Loader, Placeholder, Pill } from '@cogoport/components';
import {
	IcMArrowRotateDown,
	IcMArrowRotateUp,
	IcADocumentTemplates,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { RemarksValInterface } from '../../../../commons/Interfaces/index';
import useGetVariance from '../../../hook/useGetVariance';
import useGetWallet from '../../../hook/useGetWallet';
import useListShipment from '../../../hook/useListShipment';

import Details from './Details/index';
import Documents from './Documents/index';
// eslint-disable-next-line import/no-cycle
import PdfDisplay from './PdfDisplay/index';
// eslint-disable-next-line import/no-cycle
import POC from './POC/index';
// eslint-disable-next-line import/no-cycle, import/no-named-as-default
import ShipmentDetailsCard from './ShipmentDetailsCard/index';
import styles from './styles.module.css';
import TimeLineItemCheck from './TimelineItemCheck/index';
import VarianceView from './VarianceView/index';

interface BuyerDetailInterface {
	entityCode?: string;
	organizationName?: string;
	address?: string;
	registrationNumber?: string;
	taxNumber?: string;
}

interface SellerDetailInterface {
	organizationName?: string;
	registrationNumber?: string;
	taxNumber?: string;
}

interface SellerBankDetailInterface {
	bankName?: string;
	accountNumber?: string;
	ifscCode?: string;
	beneficiaryName?: string;
}

interface BillInterface {
	id?: string;
	billDocumentUrl?: string;
	billNumber?: string;
	billDate: Date;
	status?: string;
	placeOfSupply?: string;
	taxTotal: any;
	billCurrency: string;
	grandTotal: any;
	subTotal: string | number;
	recurringState?:string,
	billType: string;
	isProforma: boolean,
}

interface JobInterface {
	jobNumber: string;
}

interface BillAdditionalObjectInterface {
	collectionPartyId: string;
	shipmentType?: string;
	reasonForCN? : string;
	outstandingDocument? : string;
}
export interface DataInterface {
	job?: JobInterface;
	lineItems: Array<object>;
	billAdditionalObject?: BillAdditionalObjectInterface;
	buyerDetail?: BuyerDetailInterface;
	sellerBankDetail?: SellerBankDetailInterface;
	sellerDetail?: SellerDetailInterface;
	bill: BillInterface;
}

interface ShipmentDetailsInterface {
	data: DataInterface;
	orgId: string;
	remarksVal?: RemarksValInterface;
	setRemarksVal: any;
	lineItemsRemarks: object;
	setLineItemsRemarks: React.Dispatch<React.SetStateAction<{}>>;
	setLineItem: React.Dispatch<React.SetStateAction<boolean>>;
	lineItem?: boolean;
	status: string;
}
function ShipmentDetails({
	data,
	orgId,
	remarksVal,
	setRemarksVal,
	lineItemsRemarks,
	setLineItemsRemarks,
	setLineItem,
	lineItem,
	status,
}: ShipmentDetailsInterface) {
	const [showDetails, setShowDetails] = useState(false);
	const [showDocuments, setShowDocuments] = useState(false);
	const [showVariance, setShowVariance] = useState(false);
	const [itemCheck, setItemCheck] = useState(false);
	const collectionPartyId = data?.billAdditionalObject?.collectionPartyId;
	const { job } = data || {};
	const { jobNumber } = job || {};
	const { varianceFullData, loading } = useGetVariance({ collectionPartyId });
	const { data: shipmentData, loading:loadingShipment } = useListShipment(jobNumber);
	const dataList = shipmentData?.list[0] || {};
	const { source, trade_type: tradeType } = dataList;
	const shipmentId = dataList?.id || '';
	const sourceText = source === 'direct' ? 'Sell Without Buy' : startCase(source);
	const { data: dataWallet } = useGetWallet(shipmentId);
	const {
		agent_data: agentData,
		agent_role_data: agentRoleData,
		amount,
		amount_currency: amountCurrency,
	} = dataWallet?.list?.[0] || {};

	const getPills = () => {
		if (loadingShipment) {
			return <Placeholder height="20px" width="80px" />;
		}
		if (sourceText) {
			return <Pill color="blue">{sourceText}</Pill>;
		}
		if (tradeType) {
			return <Pill color="yellow">{startCase(tradeType)}</Pill>;
		}
		return <div>NO DATA FOUND</div>;
	};

	return (
		<div className={styles.container}>
			<h3>
				Shipment Details
				{' '}
				{jobNumber && (
					<span>
						- SID
						<span className={styles.serial_id}>
							{' '}
							#
							{jobNumber}
						</span>
					</span>
				)}
			</h3>

			<div className={styles.small_hr} />

			<div className={styles.card}>
				<div
					className={styles.card_upper}
					onClick={() => {
						setShowDetails(!showDetails);
					}}
					role="presentation"
				>
					<div className={styles.sub_container}>
						Details
						<div className={styles.tags_container}>
							{getPills()}
						</div>
						{dataWallet?.list?.[0] && (
							<div className={styles.data}>
								<div className={styles.kam_data}>KAM -</div>
								<div>
									{agentData?.name}
                  &nbsp;(
									{agentRoleData?.name}
									)
								</div>
								<div className={styles.kam_data}>Wallet Usage - </div>
								<div>
									{amountCurrency || 'USD'}

									{amount || 0}
								</div>
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
				{showDetails && <div className={styles.hr} />}
				<div className={styles.details}>
					{showDetails && (
						<Details
							orgId={orgId}
							dataList={dataList}
							shipmentId={shipmentId}
						/>
					)}
				</div>
			</div>

			<div
				className={styles.card}
				onClick={() => {
					setShowDocuments(!showDocuments);
				}}
				role="presentation"
			>
				<div className={styles.card_upper}>
					<div className={styles.sub_container}>
						Shipment Documents
						<IcADocumentTemplates height="17px" width="17px" />
						{loadingShipment && (
							<Loader />
						)}
					</div>

					<div
						className={styles.caret}
						onClick={() => {
							setShowDocuments(!showDocuments);
						}}
						role="presentation"
					>
						{showDocuments ? (
							<IcMArrowRotateUp height="17px" width="17px" />
						) : (
							<IcMArrowRotateDown height="17px" width="17px" />
						)}
					</div>
				</div>
				{showDocuments && <div className={styles.hr} />}
				<div className={styles.documents}>
					{showDocuments && <Documents shipmentId={shipmentId} />}
					{' '}
				</div>
			</div>

			<div>
				{collectionPartyId ? (
					<div className={styles.variance}>
						<div>
							VARIANCE -
							{loading
								? 'Getting......'
								: `${varianceFullData?.currency || '--'}${' '}
					${varianceFullData?.total_variance || '--'}`}
						</div>
						{varianceFullData?.data ? (
							<div
								className={styles.view_more}
								onClick={() => setShowVariance(true)}
								role="presentation"
							>
								View More
							</div>
						) : (
							<div>NO DATA FOUND</div>
						)}
					</div>
				) : null}
				<POC itemData={data} />
			</div>

			{showVariance ? (
				<VarianceView
					show={showVariance}
					loading={loading}
					onClose={() => setShowVariance(false)}
					data={varianceFullData?.data}
					currency={varianceFullData?.currency}
				/>
			) : null}

			<TimeLineItemCheck
				itemCheck={itemCheck}
				lineItem={lineItem}
				status={status}
			/>

			<div className={styles.shipment_details_footer}>
				<div className={styles.pdf_display}>
					<PdfDisplay data={data} />
				</div>
				<div className={styles.shipment_details_card}>
					<ShipmentDetailsCard
						data={data}
						remarksVal={remarksVal}
						setRemarksVal={setRemarksVal}
						lineItemsRemarks={lineItemsRemarks}
						setLineItemsRemarks={setLineItemsRemarks}
						setItemCheck={setItemCheck}
						setLineItem={setLineItem}
						invoiceStatus={status}
					/>
				</div>
			</div>
		</div>
	);
}
export default ShipmentDetails;
