import { Loader, Accordion, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
import Tagging from '../Taggings';

import ConsolidatedShipmentDetail from './ConsolidatedShipmentDetails/index';
import Details from './Details/index';
import Documents from './Documents/index';
// eslint-disable-next-line import/no-cycle
import GetPills from './GetPills';
import PdfDisplay from './PdfDisplay/index';
// eslint-disable-next-line import/no-cycle
import POC from './POC/index';
// eslint-disable-next-line import/no-cycle, import/no-named-as-default
import ShipmentDetailsCard from './ShipmentDetailsCard/index';
import SIDView from './SIDView';
import styles from './styles.module.css';
import VarianceView from './VarianceView/index';

interface BuyerDetailInterface {
	entityCode?: string;
	organizationName?: string;
	address?: string;
	registrationNumber?: string;
	taxNumber?: string;
	tdsRate?: string | number;
}

interface SellerDetailInterface {
	organizationName?: string;
	registrationNumber?: string;
	taxNumber?: string;
	organizationId?: string,
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
	tdsAmount: string | number;
	paidTds: string | number
}

interface JobInterface {
	jobNumber: string;
}

interface BillAdditionalObjectInterface {
	collectionPartyId: string;
	shipmentType?: string;
	reasonForCN? : string;
	outstandingDocument? : string;
	paymentType? : string;
	isIncidental? : string;
	advancedAmountCurrency? : string;
	serialId?: string,
	advancedAmount?: string,
	urgencyTag?: string,
}
export interface DataInterface {
	job?: JobInterface;
	lineItems?: Array<object>;
	billAdditionalObject?: BillAdditionalObjectInterface;
	buyerDetail?: BuyerDetailInterface;
	sellerBankDetail?: SellerBankDetailInterface;
	sellerDetail?: SellerDetailInterface;
	bill?: BillInterface;
	consolidatedShipmentIds?:Array<string>;
	organizationId?: string;
	serviceProviderDetail?: any;
	remarks?: Array<object>;
}

interface ShipmentDetailsInterface {
	data: DataInterface;
	remarksVal?: RemarksValInterface;
	setRemarksVal: any;
	lineItemsRemarks: object;
	setLineItemsRemarks: React.Dispatch<React.SetStateAction<{}>>;
	status: string;
	jobType?:string;
	billId?:string;
	setCheckItem?: React.Dispatch<React.SetStateAction<{}>>,
	lineItemsCheck?: boolean;
}

function ShipmentDetails({
	data = {},
	remarksVal = {},
	setRemarksVal = () => {},
	lineItemsRemarks = {},
	setLineItemsRemarks = () => {},
	status = '',
	jobType = '',
	billId = '',
	lineItemsCheck = false,
	setCheckItem = (prop) => (prop),
}: ShipmentDetailsInterface) {
	const [showDetails, setShowDetails] = useState(false);
	const [showDocuments, setShowDocuments] = useState(false);
	const [showVariance, setShowVariance] = useState(false);
	const collectionPartyId = data?.billAdditionalObject?.collectionPartyId;
	const { job, consolidatedShipmentIds = [] } = data || {};
	const { jobNumber } = job || {};
	const { varianceFullData, loading } = useGetVariance({ collectionPartyId });
	const { data: shipmentData, loading:loadingShipment } = useListShipment(jobNumber);
	const dataList = shipmentData?.list[GLOBAL_CONSTANTS.zeroth_index] || {};
	const { source, trade_type: tradeType } = dataList;
	const shipmentId = dataList?.id || '';
	const sourceText = source === 'direct' ? 'Sell Without Buy' : startCase(source);
	const { data: dataWallet } = useGetWallet(shipmentId);
	const {
		agent_data: agentData,
		agent_role_data: agentRoleData,
		amount,
		amount_currency: amountCurrency,
	} = dataWallet?.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const jobTypeValue = jobType?.toLowerCase();

	const onAccept = ({ valueName = '', setCloseDetails = (prop) => prop }) => {
		setCloseDetails(false);
		setCheckItem(
			(prev: any) => ({ ...prev, [valueName]: true }),
		);
	};

	return (
		<div className={styles.container}>
			<h3>
				{startCase(jobTypeValue)}
				{' '}
				Details
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

			{jobType === 'SHIPMENT' && (
				<>
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
									<GetPills
										loadingShipment={loadingShipment}
										sourceText={sourceText}
										tradeType={tradeType}
									/>
								</div>
								{dataWallet?.list?.[GLOBAL_CONSTANTS.zeroth_index] && (
									<div className={styles.data}>
										<div className={styles.kam_data}>KAM -</div>
										<div>
											{agentData?.name}
											(
											{agentRoleData?.name}
											)
										</div>
										<div className={styles.kam_data}>Wallet Usage - </div>
										<div>
											{amountCurrency || ''}

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

						{showDetails && (
							<div className={styles.shipment_container_section}>
								<div className={styles.details}>
									<Details
										dataList={dataList}
										shipmentId={shipmentId}
									/>
								</div>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									onClick={() => onAccept({
										valueName       : 'shipmentDetailsCheck',
										setCloseDetails : setShowDetails,
									})}
									className={styles.approve_button}
								>
									Accept
								</Button>
							</div>
						)}
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
						{showDocuments && (
							<div className={styles.apply_section}>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									onClick={() => onAccept({
										valueName       : 'documentsCheck',
										setCloseDetails : setShowDocuments,
									})}
									className={styles.approve_button}
								>
									Accept
								</Button>
							</div>
						)}
					</div>

					<div className={styles.tagging}>
						<Tagging
							billId={billId}
							setRemarksVal={setRemarksVal}
							status={status}
							setCheckItem={setCheckItem}
						/>
					</div>

					<SIDView shipmentId={jobNumber} setCheckItem={setCheckItem} />
				</>
			)}
			<div>
				{jobType === 'CONSOLIDATED' && (
					<div className={styles.consolidated_shipment_details}>
						<Accordion
							type="text"
							title="Shipment Details"
							animate
						>
							<div className={styles.line} />
							<ConsolidatedShipmentDetail consolidatedSids={consolidatedShipmentIds} />
						</Accordion>
					</div>
				)}
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

			{showVariance && (
				<VarianceView
					show={showVariance}
					loading={loading}
					onClose={() => setShowVariance(false)}
					data={varianceFullData?.data}
					currency={varianceFullData?.currency}
				/>
			)}

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
						invoiceStatus={status}
						lineItemsCheck={lineItemsCheck}
						setCheckItem={setCheckItem}
					/>
				</div>
			</div>
		</div>
	);
}
export default ShipmentDetails;
