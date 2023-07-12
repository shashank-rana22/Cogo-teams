import { Chips } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import { CheckoutContext } from '../../../../../../context';
import SelectedServicesInvoiceTo from '../SelectedServicesInvoiceTo';
import TotalCost from '../TotalCost';

import styles from './styles.module.css';

function CurrentInvoicingParty({ paymentModes, invoiceParty = {}, lastItem }) {
	const {
		orgData = {},
		primary_service,
		rate,
		conversions,
		detail = {},
		invoice = {},
	} = useContext(CheckoutContext);

	const { business_name = '', address = '', tax_number = '', trade_party_type = '', services } = invoiceParty;

	return (
		<div className={styles.container} style={lastItem ? { paddingBottom: '60px', marginBottom: '0px' } : {}}>
			<div className={styles.invoice_content}>
				<div className={styles.left_content}>
					<div className={styles.text}>
						Invoice to:
					</div>
					<div className={styles.flex}>
						<div className={styles.org_name}>{startCase(business_name)}</div>
					</div>

					<div
						className={styles.text}
						style={{ marginTop: '12px' }}
					>
						{address}
					</div>

					<div className={styles.gst}>{`GST: ${tax_number}`}</div>
				</div>

				<div className={styles.right_content}>
					<SelectedServicesInvoiceTo services={services} />

					<TotalCost conversions={conversions} rate={rate} invoicingParty={invoiceParty} detail={detail} />
				</div>
			</div>

			<div className={styles.payment_modes}>
				{paymentModes.map((item) => {
					const { label, style, ...restProps } = item;

					return (
						<div style={style} key={label}>
							<div className={styles.label}>{label}</div>
							<Chips
								{...restProps}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default CurrentInvoicingParty;
