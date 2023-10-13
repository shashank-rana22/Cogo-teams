import geoConstants from '@cogoport/globalization/constants/geo';

import getFormattedPrice from '../../../../../../commons/utils/getFormattedPrice';
import { DETAILS } from '../../../../constants';

import styles from './styles.module.css';

function SupplierData({ item = {}, invoiceDetails = {} }) {
	const geo = geoConstants();

	return (
		<div className={styles.body_details_card}>
			<div className={styles.invoice_card_data}>
				<div className={styles.supplier_data_header}>
					<span className={styles.text_container}>
						Supplier Name :
					</span>
					<span className={styles.text_container}>
						{item?.organizationName}
					</span>
				</div>
				<div className={styles.flex}>
					{DETAILS?.map((detail) => (
						<div className={styles.supplier_data_body} key={detail?.key}>
							<div>{detail?.label}</div>
							<div>
								{getFormattedPrice(
									invoiceDetails?.[detail?.key],
									geo.country.currency.code,
									{
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default SupplierData;
