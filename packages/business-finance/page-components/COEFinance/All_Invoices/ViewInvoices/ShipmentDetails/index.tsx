import { Loader, Accordion, Button, MultiSelect } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMArrowRotateDown,
	IcMArrowRotateUp,
	IcADocumentTemplates,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { RemarksValInterface } from '../../../../commons/Interfaces/index';
import useGetDocumentContent from '../../../hook/useGetDocumentContent';
import useGetVariance from '../../../hook/useGetVariance';
import useListShipment from '../../../hook/useListShipment';
import Tagging from '../Taggings';

import ConsolidatedShipmentDetail from './ConsolidatedShipmentDetails/index';
import DetailsCard from './DetailsCard';
import Documents from './Documents/index';
// eslint-disable-next-line import/no-cycle
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
	checkItem?: { shipmentDetailsCheck?: boolean,
		documentsCheck?: boolean,
		taggingCheck?: boolean,
		sidDataCheck?: boolean,
	};
	isTagFound?: boolean;
	setIsTagFound?: any;
	setCurrentTab?: any;
	setCombinedRemarks?: Function;

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
	checkItem = {},
	setCheckItem = (prop) => (prop),
	isTagFound = false,
	setIsTagFound = () => {},
	setCurrentTab = () => {},
	setCombinedRemarks = () => {},
}: ShipmentDetailsInterface) {
	const [showVariance, setShowVariance] = useState(false);
	const collectionPartyId = data?.billAdditionalObject?.collectionPartyId;
	const { job, consolidatedShipmentIds = [] } = data || {};
	const { jobNumber } = job || {};
	const { varianceFullData, loading } = useGetVariance({ collectionPartyId });
	const { data: shipmentData, loading:loadingShipment } = useListShipment(jobNumber);
	const dataList = shipmentData?.list[GLOBAL_CONSTANTS.zeroth_index] || {};
	const shipmentId = dataList?.id || '';

	const jobTypeValue = jobType?.toLowerCase();

	const [tab, setTab] = useState({
		shipmentDetailsTab : true,
		documentsTab       : false,
		taggingTab         : false,
		sidDataTab         : false,
		collectionPartyTab : false,
		billingPartyTab    : false,
		invoiceDetailsTab  : false,
		lineItemsTab       : false,
	});

	const { docContent = '', chargesTable = [] } = useGetDocumentContent({ data });

	const onTabClick = ({ tabName = '' }) => {
		setTab(
			(prev: any) => ({ ...prev, [tabName]: !prev[tabName] }),
		);
		setCurrentTab(tabName);
	};

	const onAccept = ({ tabName = '', tabToOpen = '', timelineItem = '' }) => {
		setTab(
			(prev: any) => ({ ...prev, [tabToOpen]: true, [tabName]: !prev[tabName] }),
		);
		setCurrentTab(tabToOpen);
		setCheckItem(
			(prev: any) => ({ ...prev, [timelineItem]: true }),
		);
	};

	const [value, onChange] = useState([]);
	const options = [
		{ label: '12345', value: 'first' },
	];

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
					<DetailsCard
						onTabClick={onTabClick}
						loadingShipment={loadingShipment}
						onAccept={onAccept}
						shipmentDetailsTab={tab.shipmentDetailsTab}
						shipmentDetailsCheck={checkItem.shipmentDetailsCheck}
						dataList={dataList}
					/>
					<div
						className={styles.card}
					>
						<div
							className={styles.card_upper}
							onClick={() => onTabClick({ tabName: 'documentsTab' })}
							role="presentation"
						>
							<div className={styles.sub_container}>
								Shipment Documents
								<IcADocumentTemplates height="17px" width="17px" />
								{loadingShipment && (
									<Loader />
								)}
							</div>

							<div
								className={styles.caret}
								role="presentation"
							>
								{tab.documentsTab ? (
									<IcMArrowRotateUp height="17px" width="17px" />
								) : (
									<IcMArrowRotateDown height="17px" width="17px" />
								)}
							</div>
						</div>
						{tab.documentsTab && <div className={styles.hr} />}
						<div className={styles.documents}>
							{tab.documentsTab && <Documents shipmentId={shipmentId} docContent={docContent} />}
							{' '}
						</div>
						{tab.documentsTab && (
							<div className={styles.apply_section}>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									disabled={checkItem.documentsCheck}
									onClick={() => onAccept({
										tabName      : 'documentsTab',
										tabToOpen    : isTagFound ? 'taggingTab' : 'sidDataTab',
										timelineItem : 'documentsCheck',
									})}
									className={styles.approve_button}
								>
									Approve
								</Button>
							</div>
						)}
					</div>
					{isTagFound ? (
						<div className={styles.tagging}>
							<Tagging
								billId={billId}
								setRemarksVal={setRemarksVal}
								status={status}
								onTabClick={onTabClick}
								onAccept={onAccept}
								showTab={tab.taggingTab}
								taggingChecked={checkItem.taggingCheck}
								setIsTagFound={setIsTagFound}
							/>
						</div>
					) : undefined}

					<SIDView
						shipmentId={jobNumber}
						onTabClick={onTabClick}
						onAccept={onAccept}
						showTab={tab.sidDataTab}
						sidDataChecked={checkItem.sidDataCheck}
					/>

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
				<div className={styles.poc_aligned}>
					<div className={styles.container_number}>
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
						<div className={styles.select_filter}>
							<MultiSelect
								value={value}
								onChange={onChange}
								placeholder="Container Numbers"
								options={options}
								isClearable
								style={{ width: '250px' }}
								size="md"
							/>
						</div>
					</div>
					<POC itemData={data} />
				</div>
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
						onAccept={onAccept}
						onTabClick={onTabClick}
						tab={tab}
						setCombinedRemarks={setCombinedRemarks}
						docContent={docContent}
						chargesTable={chargesTable}
					/>
				</div>
			</div>
		</div>
	);
}
export default ShipmentDetails;
