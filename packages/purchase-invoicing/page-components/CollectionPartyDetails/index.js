/* eslint-disable max-lines-per-function */
import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
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
import useCalculateTotalPrice from '../../helpers/useCalculateTotalPrice';
import useGetEntities from '../../hooks/useGetEntities';
import useGetTradeParty from '../../hooks/useGetTradeParty';
import toastApiError from '../../utils/toastApiError';
import { getCollectionPartyDetails } from '../InvoiceFormLayout/CollectionPartyDetails/utils/getCollectionPartyDetails';
import InvoicesUploaded from '../InvoicesUploaded';

import InvoiceModal from './InvoiceModal';
import styles from './styles.module.css';
import TitleCard from './TitleCard';

const EMPTY_TRADE_PARTY_LENGTH = 0;
const DEFAULT_STEP = 1;
const DEFAULT_NET_TOTAL = 0;
const ONE = 1;
const ZERO = 0;

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

const getCollectionPartyParams = (organization_id = '') => ({
	documents_data_required         : true,
	other_addresses_data_required   : true,
	poc_data_required               : true,
	billing_addresses_data_required : true,
	filters                         : {
		organization_id,
		trade_party_type: ['collection_party', 'self'],
	},
});

function CollectionPartyDetails({
	collectionParty = {}, refetch = () => {}, servicesData = {},
	fullwidth = false, AddService = () => {},
}) {
	const { user } = useSelector(({ profile }) => ({ user: profile }));
	const { shipment_data = {}, primary_service } = useContext(ShipmentDetailContext);

	const [showModal, setShowModal] = useState(false);
	const [uploadInvoiceUrl, setUploadInvoiceUrl] = useState('');
	const [openComparision, setOpenComparision] = useState(false);
	const [open, setOpen] = useState(false);
	const [step, setStep] = useState(DEFAULT_STEP);
	const [generateInvoiceModal, setGenerateInvoiceModal] = useState(false);

	const cpParams = getCollectionPartyParams(collectionParty?.service_provider_id);
	const { handleModifiedOptions = () => {} } = getCollectionPartyDetails();

	const [collectionPartyState, setCollectionPartyState] = useState({});
	const [collectionPartyAddress, setCollectionPartyAddress] = useState({});
	const [codes, setCodes] = useState({});

	const [renderContent, setRenderContent] = useState('');

	const {
		billing_addresses: billingAddresses = [],
		other_addresses: otherAddresses = [],
	} = collectionPartyState || {};
	const allAddresses = [...billingAddresses, ...otherAddresses];
	const collectionPartyAddresses = (allAddresses || []).map((address) => ({
		...address,
		label : `${address?.address} / ${address?.tax_number}`,
		value : address?.id,
	}));

	const services = (collectionParty?.services || []).map(
		(service) => service?.service_type,
	);

	const geo = getGeoConstants();

	const serviceProviderConfirmation = (collectionParty.service_charges || []).find(
		(item) => PURCHASE_INVOICE_SHIPMENT_STATES.includes(item?.detail?.state),
	);

	const { listEntities, entitiesLoading } = useGetEntities();

	const airServiceProviderConfirmation = shipment_data?.shipment_type === 'air_freight'
		&& serviceProviderConfirmation;

	const uploadInvoiceAllowed = shipment_data?.stakeholders
		?.some((ele) => STAKE_HOLDER_TYPES.includes(ele?.stakeholder_type))
		|| shipment_data?.stakeholder_types
			?.some((ele) => STAKE_HOLDER_TYPES.includes(ele))
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

	const filteredServices = servicesData.filter(
		(singleItem) => singleItem?.service_type !== 'subsidiary_service',
	);

	const showGenerate = showUpload
	&& shipment_data.shipment_type === 'ftl_freight'
	&& !shipment_data?.is_job_closed
	&& filteredServices.length === ONE;

	const { fields, control, watch, setValue } = useForm();

	const formValues = watch();

	const calculatedValues = useCalculateTotalPrice({
		baseCurrency : formValues?.invoice_currency,
		lineItems    : formValues?.line_items,
		chargeCodes  : codes,
	});

	const lineItemsDataArray = (calculatedValues.newItems || []).map(
		(item, index) => {
			const codeData = codes[item?.code] || {};
			return {
				serial_number       : index + ONE,
				code                : item?.code,
				product_description : codeData?.actualname,
				sac                 : codeData?.sac_code,
				currency            : item?.currency,
				quantity            : item?.quantity,
				exchange_rate       : item?.exchange_rate,
				tax_type            : 'T',
				tax_percent         : `${codeData?.tax_percent}%`,
				taxable_amount      : Number(item?.tax_amt || ZERO),
				total               : Number(item?.cost || ZERO),
				truck_number        : formValues?.truck_number,
			};
		},
	);

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

	const invoiceCurrency = formValues?.invoice_currency;

	const onConfirm = () => {
		if (!isEmpty(uploadInvoiceUrl)) {
			setOpenComparision({});
			setOpen(false);
		} else {
			toastApiError('Invoice is Required');
		}
	};

	const COLLECTION_PARTY_BANK_OPTIONS = [];

	const bank_details = (collectionPartyState?.documents || []).filter(
		(item) => item?.document_type === 'bank_account_details',
	);
	(bank_details || []).forEach((bank) => {
		if (
			['pending', 'verified'].includes(bank?.verification_status)
			&& bank?.status === 'active'
		) {
			COLLECTION_PARTY_BANK_OPTIONS.push({
				...bank,
				label : bank?.data?.bank_name,
				value : bank?.data?.bank_account_number,
			});
		}
	});

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
					{
							showGenerate && (
								<div>
									<Button
										size="md"
										themeType="secondary"
										className={styles.marginright}
										onClick={() => {
											setGenerateInvoiceModal(true);
											setRenderContent('form');
										}}
									>
										Generate Invoice
									</Button>
								</div>
							)
						}
					{INVOICE_SHIPMENT_TYPES.includes(shipment_type) && (
						<div className={styles.not_added}>
							<Button
								size="md"
								themeType="secondary"
								className={styles.marginright}
								onClick={() => setShowModal(
									shipment_type === 'ftl_freight' ? 'purchase' : 'charge_code',
								)}
								disabled={shipment_data?.is_job_closed}
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
						<Modal.Header title={isJobClosed ? 'Upload Scan of Credit Note' : 'Upload Scan of Invoice'} />
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
						shipmentId={shipment_data?.id}
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

				{generateInvoiceModal ? (
					<InvoiceModal
						generateInvoiceModal={generateInvoiceModal}
						setGenerateInvoiceModal={setGenerateInvoiceModal}
						control={control}
						primary_service={primary_service}
						collectionParty={collectionParty}
						invoiceCurrency={invoiceCurrency}
						listEntities={listEntities}
						entitiesLoading={entitiesLoading}
						watch={watch}
						setValue={setValue}
						setCodes={setCodes}
						cpParams={cpParams}
						handleModifiedOptions={handleModifiedOptions}
						collectionPartyState={collectionPartyState}
						setCollectionPartyState={setCollectionPartyState}
						collectionPartyAddress={collectionPartyAddress}
						setCollectionPartyAddress={setCollectionPartyAddress}
						collectionPartyAddresses={collectionPartyAddresses}
						COLLECTION_PARTY_BANK_OPTIONS={COLLECTION_PARTY_BANK_OPTIONS}
						calculatedValues={calculatedValues}
						renderContent={renderContent}
						setRenderContent={setRenderContent}
						formValues={formValues}
						bank_details={bank_details}
						shipment_data={shipment_data}
						lineItemsDataArray={lineItemsDataArray}
						fields={fields}
					/>
				) : null}
			</AccordianView>
		</div>
	);
}

export default CollectionPartyDetails;
