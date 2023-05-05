// import getGeoConstants from '@cogoport/globalization/constants/geo';
// import formatAmount from '@cogoport/globalization/utils/formatAmount';
// import formatDate from '@cogoport/globalization/utils/formatDate';
import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import serviceNameMapping from '../../../configs/short-disply-names.json';

import styles from './styles.module.css';

const tableColumn = () => {
	// const geo = getGeoConstants();
	const renderServices = (item) => (
		<div className={styles.text}>
			{(item?.service_name || []).map((service, i) => (
				<>
					{serviceNameMapping[service]}
					{i < item.service_name.length - 1 ? ', ' : null}
					val
				</>
			))}
		</div>
	);

	return [
		{
			label  : 'INVOICE NUMBER',
			span   : 1.5,
			render : (item) => (
				<div
					className={cl`${styles.text} ${styles.invoice_sid}
				${styles.bold} ${item?.invoice_url ? styles.pointer : ''}`}
					onClick={() => (!isEmpty(item?.invoice_url) ? window.open(item?.invoice_url) : null)}
				>
					{item?.invoice_no}
				</div>
			),
		},
		{
			label  : 'UTR',
			span   : 2,
			render : (item) => (
				<div className={cl`${styles.text} ${styles.bold_colored}`}>{(item?.utr_nos || []).join(', ')}</div>
			),
		},
		{
			label : 'Date',
			span  : 1.5,
			// render : (item) => formatDate({
			// 	date       : item?.updated_at,
			// 	//dateFormat : geo.formats.date.default,
			// 	formatType : 'date',
			// }),
		},
		{
			label  : 'BILLED BY',
			span   : 3,
			render : (item) => (
				<div className={cl`${styles.text} ${styles.captalizae}`}>
					{(item?.billed_by || '').toLowerCase()}
				</div>
			),
		},
		{
			label  : 'SERVICE TYPE',
			span   : 1.5,
			render : (item) => renderServices(item),
		},
		{
			label  : 'AMOUNT',
			span   : 1,
			render : (item) => (
				<div className={styles.text}>
					{item.inr_invoice_total}
					{/* {formatAmount({
						amount   : item?.inr_invoice_total,
						currency : item?.invoice_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})} */}
				</div>
			),
		},
		{
			label  : 'Payment Status',
			span   : 1,
			render : (item) => <div className={styles.text}>{item?.payment_status}</div>,
		},
	];
};

export default tableColumn;
