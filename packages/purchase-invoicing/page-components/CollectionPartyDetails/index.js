import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMUpload } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import AccordianView from '../../common/Accordianview';
import ComparisionModal from '../../common/ComparisionModal';
import getFormattedAmount from '../../common/helpers/formatAmount';
import ServiceTables from '../../common/ServiceTable';
import ToolTipWrapper from '../../common/ToolTipWrapper';
import useGetTradeParty from '../../hooks/useGetTradeParty';
import toastApiError from '../../utils/toastApiError';
import InvoicesUploaded from '../InvoicesUploaded';

import styles from './styles.module.css';

const EMPTY_TRADE_PARTY_LENGTH = 0;
const SERVICE_WRAPPER_LAST_INDEX = 2;
const SERVICE_WRAPPER_START_INDEX = 0;
const DEFAULT_COLECTION_PARTY_COUNT = 0;
const DEFAULT_STEP = 1;
const DEFAULT_NET_TOTAL = 0;
const MAX_LEN_FOR_TOOLTIP = 25;

const STATE = ['init', 'awaiting_service_provider_confirmation', 'completed'];

const LAST_INDEX = 1;

const STAKE_HOLDER_TYPES = [
	'superadmin',
	'service_ops2',
	'invoice executive',
	'cost booking executive',
	'costbooking_ops',
	'cost booking manager',
];

function Serviceswrapper({ allservices = [] }) {
	return (
		<>
			{(allservices || []).map((service, i) => (
				<span key={service}>
					{`${startCase(service)} ${allservices.length - LAST_INDEX === i ? '' : ', '}`}
				</span>
			))}
		</>
	);
}

function TitleCard({ collectionParty = {}, services = [] }) {
	return (
		<div className={styles.container_title}>
			<div className={styles.customer}>
				<div className={styles.heading}>
					<ToolTipWrapper
						text={collectionParty?.service_provider?.business_name}
						maxlength={MAX_LEN_FOR_TOOLTIP}
					/>
				</div>
				<div className={styles.servicename}>
					<span className={styles.spankey}>Services :</span>
					<ToolTipWrapper
						text={services}
						maxlength={SERVICE_WRAPPER_LAST_INDEX}
						render
						content={(
							<Serviceswrapper allservices={services} />
						)}
					>
						<Serviceswrapper allservices={services?.slice(
							SERVICE_WRAPPER_START_INDEX,
							SERVICE_WRAPPER_LAST_INDEX,
						) || []}
						/>
						{services?.length > SERVICE_WRAPPER_LAST_INDEX ? '...' : ''}
					</ToolTipWrapper>
				</div>
			</div>
			<div className={styles.invoices}>
				<div>Total Invoice Value -</div>
				<div className={styles.value}>
					<ToolTipWrapper
						text={getFormattedAmount(
							collectionParty.invoice_total,
							collectionParty.invoice_currency,
						)}
						maxlength={MAX_LEN_FOR_TOOLTIP}
					/>
					<span className={styles.paddingleft}>
						{`- (${collectionParty?.collection_parties?.length || DEFAULT_COLECTION_PARTY_COUNT})`}
					</span>
				</div>
			</div>
			<div className={styles.lineitems}>
				<div>
					{`No. Of Line Items 
				- ${collectionParty?.total_line_items} | Locked - ${collectionParty?.locked_line_items}`}
				</div>
			</div>
			<div className={styles.mode}>
				Cash
			</div>
		</div>
	);
}

function CollectionPartyDetails({
	collectionParty = {}, refetch = () => {}, servicesData = {},
	fullwidth = false,
}) {
	const services = (collectionParty?.services || []).map(
		(service) => service?.service_type,
	);
	const { user } = useSelector(({ profile }) => ({ user: profile }));
	const { shipment_data } = useContext(ShipmentDetailContext);
	const [uploadInvoiceUrl, setUploadInvoiceUrl] = useState('');
	const [openComparision, setOpenComparision] = useState(false);
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState(DEFAULT_STEP);
	const geo = getGeoConstants();

	const serviceProviderConfirmation = (collectionParty.service_charges || []).find(
		(item) => STATE.includes(item?.detail?.state),
	);

	const airServiceProviderConfirmation = shipment_data?.shipment_type === 'air_freight'
		&& serviceProviderConfirmation;

	const uploadInvoiceAllowed = shipment_data?.stakeholder_types?.some((ele) => STAKE_HOLDER_TYPES.includes(ele))
		|| [
			geo.uuid.super_admin_id,
			geo.uuid.admin_id,
			geo.uuid.coe_finance_head,
			geo.uuid.prod_process_owner,
		].some((ele) => user?.partner.user_role_ids?.includes(ele));

	const showUpload = uploadInvoiceAllowed || shipment_data?.source === 'spot_line_booking';

	const onClose = () => {
		setUploadInvoiceUrl('');
		setStep(DEFAULT_STEP);
		setOpenComparision(false);
	};

	let disableInvoice = false;
	let errorMsg = '';
	const shipment_type = shipment_data?.shipment_type;

	const { tdata } = useGetTradeParty({
		shipment_id: shipment_data?.id || '',
		shipment_data,
	});

	const SERVICES_LIST = [];
	(servicesData || []).forEach((element) => {
		if (element?.is_active === true) {
			SERVICES_LIST.push(element);
		}
	});

	if (shipment_type === 'ftl_freight') {
		disableInvoice = !shipment_data?.all_services?.some(
			(item) => item?.service_type === 'ftl_freight_service'
				&& (item?.lr_numbers || []).length,
		);
		errorMsg = 'LR task not completed';

		if (
			tdata?.list?.length === EMPTY_TRADE_PARTY_LENGTH
			&& geo.uuid.fortigo_network_ids.includes(shipment_data?.importer_exporter_id)
		) {
			disableInvoice = true;
			errorMsg = 'Shipper not added';
		}
	}

	const isJobClosed = shipment_data?.is_job_closed;

	const onConfirm = () => {
		if (!isEmpty(uploadInvoiceUrl)) {
			setOpenComparision({});
			setOpen(false);
		} else {
			toastApiError('Invoice is Required');
		}
	};

	return (
		<div className={styles.container}>
			<AccordianView
				fullwidth={fullwidth}
				title={(
					<TitleCard
						collectionParty={collectionParty}
						services={services}
					/>
				)}
			>
				<InvoicesUploaded
					invoicesdata={collectionParty?.existing_collection_parties}
					collectionParty={collectionParty}
					setOpenComparision={setOpenComparision}
					setStep={setStep}
				/>
				<span className={styles.headings}>Live Invoice</span>
				<div className={styles.buttoncontailner}>
					{(showUpload || user?.user?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id)
					&& !airServiceProviderConfirmation ? (
						<div className={styles.uploadbuttonwrapper}>
							<Button
								size="md"
								themeType="secondary"
								className={styles.marginright}
								disabled={disableInvoice}
								onClick={() => { setOpen(true); }}
							>
								{isJobClosed ? 'Upload Credit Note' : 'Upload Invoice'}
							</Button>
							{disableInvoice ? (
								<div className={styles.uploadtooltip}>{errorMsg}</div>
							) : null}
						</div>
						) : null}
				</div>

				<ServiceTables service_charges={collectionParty?.service_charges} />
				<div className={styles.totalamount}>
					Total With TAX
					<span className={styles.amount}>
						{getFormattedAmount(
							collectionParty?.net_total || DEFAULT_NET_TOTAL,
							collectionParty?.net_total_price_currency,
						)}
					</span>
				</div>
				{open ? (
					<Modal
						show={open}
						size="sm"
						onClose={() => { setOpen(false); }}
					>
						<Modal.Header title="Upload Scan of Invoice" />
						<Modal.Body>
							<section>
								<FileUploader
									value={uploadInvoiceUrl}
									onChange={setUploadInvoiceUrl}
									draggable
									uploadIcon={<IcMUpload height={40} width={40} />}
								/>
							</section>
						</Modal.Body>
						<Modal.Footer>
							<Button
								size="md"
								className={styles.marginright}
								themeType="secondary"
								onClick={() => {
									setOpen(false);
									setUploadInvoiceUrl(null);
								}}
							>
								Cancel
							</Button>
							<Button
								size="md"
								onClick={onConfirm}
							>
								Confirm
							</Button>
						</Modal.Footer>
					</Modal>
				) : null}

				{openComparision ? (
					<ComparisionModal
						uploadInvoiceUrl={uploadInvoiceUrl}
						setUploadInvoiceUrl={setUploadInvoiceUrl}
						serviceProvider={collectionParty}
						openComparision={openComparision}
						setOpenComparision={setOpenComparision}
						editData={openComparision}
						step={step}
						setStep={setStep}
						onClose={() => {
							onClose();
							refetch();
						}}
					/>
				) : null}
			</AccordianView>
		</div>
	);
}

export default CollectionPartyDetails;
