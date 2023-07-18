import { IcMCrossInCircle, IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import { CheckoutContext } from '../../../../../../context';
import SelectedServicesInvoiceTo from '../SelectedServicesInvoiceTo';
import TotalCost from '../TotalCost';

import PaymentModes from './PaymentModes';
import styles from './styles.module.css';

const ICON_MAPPING = {
	true  : IcMCrossInCircle,
	false : IcMEdit,
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

	const IconToShow = ICON_MAPPING[editInvoice[id]];

	return (
		<div
			className={styles.container}
			style={lastItem ? { paddingBottom: '60px', marginBottom: '0px' } : {}}
		>
			<div className={styles.invoice_content}>
				<div className={styles.left_content}>
					<div className={styles.text}>Invoice to:</div>
					<div className={styles.flex}>
						<div className={styles.org_name}>{startCase(business_name)}</div>
					</div>

					<div className={styles.text} style={{ marginTop: '12px' }}>
						{address}
					</div>

					<div className={styles.gst}>{`GST: ${tax_number}`}</div>
				</div>

				<div className={styles.right_content}>
					<SelectedServicesInvoiceTo services={services} />

					<TotalCost
						conversions={conversions}
						rate={rate}
						invoicingParty={invoiceParty}
						detail={detail}
					/>
				</div>
			</div>

			<div className={styles.icon_container}>
				<IconToShow
					height={18}
					width={18}
					className={styles.icon}
					onClick={() => setEditInvoice((prev) => ({ ...prev, [id]: !prev[id] }))}
				/>

				{length > 1 ? (
					<IcMDelete
						height={18}
						width={18}
						className={styles.icon}
						onClick={() => {
							updateCheckoutInvoice({ values: { id, status: 'inactive' } });
						}}
					/>
				) : null}
			</div>

			<div className={styles.payment_modes}>
				<PaymentModes
					paymentModes={paymentModes}
					editMode={editInvoice[id]}
				/>
			</div>
		</div>
	);
}

export default CurrentInvoicingParty;
