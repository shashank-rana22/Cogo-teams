import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import getGeoConstants from '@cogoport/globalization/constants/geo';
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

const STATE = ['init', 'awaiting_service_provider_confirmation', 'completed'];

const AJEET_EMAIL_ID = 'ajeet@cogoport.com';

const STAKE_HOLDER_TYPES = [
	'superadmin',
	'service_ops2',
	'invoice executive',
	'cost booking executive',
	'costbooking_ops',
	'cost booking manager',
];

function CollectionPartyDetails({ collectionParty = {}, refetch = () => {}, servicesData = {} }) {
	const [uploadInvoiceUrl, setUploadInvoiceUrl] = useState('');
	const [openComparision, setOpenComparision] = useState(false);
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState(1);

	const services = (collectionParty?.services || []).map(
		(service) => service?.service_type,
	);
	const {
		user,
	} = useSelector(({ profile }) => ({
		user: profile,
	}));

	const geo = getGeoConstants();

	const {
		shipment_data,
	} = useContext(ShipmentDetailContext);

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

	const serviceswrapper = (allservices) => (
		<>
			{(allservices || []).map((ser, i) => (
				<span key={ser}>
					{startCase(ser)}
					{' '}
					{(services).length - 1 === i ? '' : ', '}
				</span>
			))}
		</>
	);

	const onClose = () => {
		setUploadInvoiceUrl('');
		setStep(1);
		setOpenComparision(false);
	};

	let disableInvoice = false;
	let errorMsg = '';
	const shipment_type = shipment_data?.shipment_type;

	const { tdata } = useGetTradeParty({
		shipment_id: shipment_data?.id || '',
		shipment_data,
	});

	const servicesList = [];
	(servicesData || []).forEach((element) => {
		if (element?.is_active === true) {
			servicesList.push(element);
		}
	});

	if (shipment_type === 'ftl_freight') {
		disableInvoice = !shipment_data?.all_services?.some(
			(item) => item?.service_type === 'ftl_freight_service'
				&& (item?.lr_numbers || []).length > 0,
		);
		errorMsg = 'LR task not completed';

		if (
			tdata?.list?.length === 0
			&& geo.uuid.fortigo_network_ids.includes(shipment_data?.importer_exporter_id)
		) {
			disableInvoice = true;
			errorMsg = 'Shipper not added';
		}
	}

	const isJobClosed = shipment_data?.is_job_closed;

	const titleCard = (
		<div className={styles.container_title}>
			<div className={styles.customer}>
				<div className={styles.heading}>
					<ToolTipWrapper text={collectionParty?.service_provider?.business_name} maxlength={25} />
				</div>
				<div className={styles.servicename}>
					<span className={styles.spankey}>Services :</span>
					<ToolTipWrapper
						text={services}
						maxlength={2}
						render
						content={(
							<>
								{serviceswrapper(services)}
							</>
						)}
					>
						{serviceswrapper(services?.slice(0, 2) || [])}
						{services.length > 2 ? '...' : ''}
					</ToolTipWrapper>
				</div>
			</div>
			<div className={styles.invoices}>
				<div>
					Total Invoice Value -
				</div>
				<div className={styles.value}>
					<ToolTipWrapper
						text={getFormattedAmount(
							collectionParty.invoice_total,
							collectionParty.invoice_currency,
						)}
						maxlength={25}
					/>
					<span className={styles.paddingleft}>
						{' '}
						- (
						{collectionParty?.collection_parties?.length || 0}
						)
					</span>
				</div>
			</div>
			<div className={styles.lineitems}>
				<div>
					No. Of Line Items -
					{' '}
					{collectionParty?.total_line_items}
					{' '}
					| Locked -
					{' '}
					{ collectionParty?.locked_line_items}
				</div>
			</div>
			<div className={styles.mode}>
				Cash
			</div>
		</div>
	);

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
			<AccordianView title={titleCard}>
				<InvoicesUploaded
					invoicesdata={collectionParty?.existing_collection_parties}
					collectionParty={collectionParty}
					setOpenComparision={setOpenComparision}
					setStep={setStep}
				/>
				<span className={styles.headings}>Live Invoice</span>
				<div className={styles.buttoncontailner}>
					{(showUpload || user?.email === AJEET_EMAIL_ID) && !airServiceProviderConfirmation ? (
						<Button
							size="md"
							themeType="secondary"
							className={styles.marginright}
							onClick={() => { setOpen(true); }}
						>
							{isJobClosed ? 'Upload Credit Note' : 'Upload Invoice'}
						</Button>
					) : null}
					{disableInvoice ? (
						<div className="upload-tooltip">{errorMsg}</div>
					) : null}
				</div>
				<ServiceTables service_charges={collectionParty?.service_charges} />
				<div className={styles.totalamount}>
					Total With TAX
					<span className={styles.amount}>
						{getFormattedAmount(collectionParty?.net_total || 0, collectionParty?.net_total_price_currency)}
					</span>
				</div>
				{open ? (
					<Modal
						show={open}
						size="sm"
						onClose={() => {
							setOpen(false);
						}}
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
