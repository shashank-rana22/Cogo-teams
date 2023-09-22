import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMUpload } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import AccordianView from '../../common/Accordianview';
import ComparisionModal from '../../common/ComparisionModal';
import getFormattedAmount from '../../common/helpers/formatAmount';
import ServiceTables from '../../common/ServiceTable';
import useGetTradeParty from '../../hooks/useGetTradeParty';
import toastApiError from '../../utils/toastApiError';
import InvoicesUploaded from '../InvoicesUploaded';

import styles from './styles.module.css';
import TitleCard from './TitleCard';

const EMPTY_TRADE_PARTY_LENGTH = 0;
const DEFAULT_STEP = 1;
const DEFAULT_NET_TOTAL = 0;

const PURCHASE_INVOICE_SHIPMENT_STATES = ['init', 'awaiting_service_provider_confirmation'];

const INVOICE_SHIPMENT_TYPES = ['air_freight', 'ftl_freight', 'fcl_freight'];
const ADD_SERVICE_MODALS = ['purchase', 'charge_code'];

const STAKE_HOLDER_TYPES = [
	'superadmin',
	'service_ops2',
	'invoice executive',
	'cost booking executive',
	'costbooking_ops',
	'cost booking manager',
	'ff cost booking executive',
	'release_desk',
	'collection_desk',
];

function CollectionPartyDetails({
	collectionParty = {}, refetch = () => {}, servicesData = {},
	fullwidth = false, AddService = () => {},
}) {
	const { user } = useSelector(({ profile }) => ({ user: profile }));
	const { shipment_data = {} } = useContext(ShipmentDetailContext);

	const {
		id = '',
		shipment_type = '',
		stakeholders = [],
		stakeholder_types = [],
		source = '',
		all_services = [],
		importer_exporter_id = '',
		is_job_closed = false,
		is_job_closed_financially = false,
	} = shipment_data || {};

	const [showModal, setShowModal] = useState(false);
	const [uploadInvoiceUrl, setUploadInvoiceUrl] = useState('');
	const [openComparision, setOpenComparision] = useState(false);
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState(DEFAULT_STEP);

	const services = (collectionParty?.services || []).map(
		(service) => service?.service_type,
	);

	const geo = getGeoConstants();

	const serviceProviderConfirmation = (collectionParty.service_charges || []).find(
		(item) => PURCHASE_INVOICE_SHIPMENT_STATES.includes(item?.detail?.state),
	);

	const airServiceProviderConfirmation = shipment_type === 'air_freight'
		&& serviceProviderConfirmation;

	const uploadInvoiceAllowed = stakeholders
		?.some((ele) => STAKE_HOLDER_TYPES.includes(ele?.stakeholder_type))
		|| stakeholder_types
			?.some((ele) => STAKE_HOLDER_TYPES.includes(ele))
		|| [
			geo.uuid.super_admin_id,
			geo.uuid.admin_id,
			geo.uuid.coe_finance_head,
			geo.uuid.prod_process_owner,
		].some((ele) => user?.partner.user_role_ids?.includes(ele));

	const showUpload = uploadInvoiceAllowed || source === 'spot_line_booking';

	const onClose = () => {
		setUploadInvoiceUrl('');
		setStep(DEFAULT_STEP);
		setOpenComparision(false);
	};

	let disableInvoice = false;
	let errorMsg = '';

	const { tdata } = useGetTradeParty({
		shipment_id: id,
		shipment_data,
	});

	const SERVICES_LIST = [];
	(servicesData || []).forEach((element) => {
		if (element?.is_active === true) {
			SERVICES_LIST.push(element);
		}
	});

	if (shipment_type === 'ftl_freight') {
		disableInvoice = !all_services?.some(
			(item) => item?.service_type === 'ftl_freight_service'
				&& (item?.lr_numbers || []).length,
		);
		errorMsg = 'LR task not completed';

		if (
			tdata?.list?.length === EMPTY_TRADE_PARTY_LENGTH
			&& geo.uuid.fortigo_network_ids.includes(importer_exporter_id)
		) {
			disableInvoice = true;
			errorMsg = 'Shipper not added';
		}
	}

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
								disabled={is_job_closed_financially || disableInvoice}
								onClick={() => { setOpen(true); }}
							>
								{is_job_closed ? 'Upload Credit Note' : 'Upload Invoice'}
							</Button>

							{disableInvoice ? (
								<div className={styles.uploadtooltip}>{errorMsg}</div>
							) : null}
						</div>
						) : null}

					{INVOICE_SHIPMENT_TYPES.includes(shipment_type) && (
						<div className={styles.not_added}>
							<Button
								size="md"
								themeType="secondary"
								className={styles.marginright}
								onClick={() => setShowModal(
									shipment_type === 'ftl_freight' ? 'purchase' : 'charge_code',
								)}
								disabled={is_job_closed}
							>
								Add Incidental Charges
							</Button>
						</div>
					)}
				</div>

				<ServiceTables service_charges={collectionParty?.service_charges} shipment_data={shipment_data} />

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
						<Modal.Header title={is_job_closed ? 'Upload Scan of Credit Note' : 'Upload Scan of Invoice'} />
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

				{ADD_SERVICE_MODALS.includes(showModal)
				&& (
					<AddService
						shipmentType={shipment_type}
						shipmentId={id}
						services={SERVICES_LIST}
						refetch={refetch}
						source={showModal}
						setShowChargeCodes={setShowModal}
						closeModal={setShowModal}
					/>
				)}

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
