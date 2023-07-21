import { Pill, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import { CheckoutContext } from '../../../../../../context';
import SelectedServicesInvoiceTo from '../SelectedServicesInvoiceTo';
import TotalCost from '../TotalCost';

import HandleButtons from './HandleButtons';
import PaymentModes from './PaymentModes';
import styles from './styles.module.css';

const TRADE_PARTY_TYPE_MAPPING = {
	self: {
		color : '#fff8f5',
		label : 'SELF',
		style : {
			border     : '1px solid  #FFD9D6',
			color      : '#ee3425',
			marginLeft : '8px',
		},
	},
	paying_party: {
		color : '#ced1ed',
		label : 'TRADE PARTNER',
		style : {
			border     : '1px solid  #888FD1',
			color      : '#7278ad',
			marginLeft : '8px',
		},
	},
};

function CurrentInvoicingParty({
	paymentModes = [],
	invoiceParty = {},
	lastItem = true,
	editInvoice = {},
	setEditInvoice = () => {},
	length = 0,
	updateCheckoutInvoice = () => {},
	updateLoading = false,
	editInvoiceDetails = {},
	setEditInvoiceDetails = () => {},
	allServices = [],
	paymentModeValues = {},
	paymentModesLoading = false,
}) {
	const { rate, conversions, detail = {} } = useContext(CheckoutContext);

	const {
		services,
		additional_info = {},
		billing_address = {},
		id,
	} = invoiceParty;

	const { business_name = '', trade_party_type = '' } = additional_info;

	const { tax_number = '', address = '' } = billing_address || {};

	const isEditMode = editInvoice[id];

	const tradePartyObj = TRADE_PARTY_TYPE_MAPPING[trade_party_type] || TRADE_PARTY_TYPE_MAPPING.self;

	return (
		<div
			className={styles.container}
			style={lastItem ? { paddingBottom: '60px', marginBottom: '0px' } : {}}
		>
			<div className={styles.invoice_content}>
				<div className={styles.left_content}>
					<div className={styles.text}>Invoice to:</div>
					<div className={cl`${styles.flex} ${styles[trade_party_type]}`}>
						<div className={styles.org_name}>{startCase(business_name)}</div>

						<Pill {...tradePartyObj} size="md">
							{tradePartyObj.label}
						</Pill>
					</div>

					<div className={styles.text} style={{ marginTop: '12px' }}>
						{address}
					</div>

					<div className={styles.gst}>{`GST: ${tax_number}`}</div>
				</div>

				<div className={styles.right_content}>
					<SelectedServicesInvoiceTo
						services={services}
						isEditMode={isEditMode}
						allServices={allServices}
						editInvoiceDetails={editInvoiceDetails}
						setEditInvoiceDetails={setEditInvoiceDetails}
					/>

					<TotalCost
						conversions={conversions}
						rate={rate}
						invoicingParty={invoiceParty}
						detail={detail}
						editInvoiceDetails={editInvoiceDetails}
						setEditInvoiceDetails={setEditInvoiceDetails}
						isEditMode={isEditMode}
					/>
				</div>
			</div>

			<HandleButtons
				isEditMode={isEditMode}
				length={length}
				invoiceParty={invoiceParty}
				updateCheckoutInvoice={updateCheckoutInvoice}
				editInvoiceDetails={editInvoiceDetails}
				setEditInvoice={setEditInvoice}
				setEditInvoiceDetails={setEditInvoiceDetails}
				paymentModeValues={paymentModeValues}
				updateLoading={updateLoading}
			/>

			<div className={styles.payment_modes}>
				<PaymentModes
					paymentModes={paymentModes}
					editMode={isEditMode}
					paymentModeValues={paymentModeValues}
					paymentModesLoading={paymentModesLoading}
				/>
			</div>
		</div>
	);
}

export default CurrentInvoicingParty;
