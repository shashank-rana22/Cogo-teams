// import { Button } from '@cogoport/components';

import styles from './styles.module.css';

const useGetIrregularColumns = () => (
	[
		{
			Header   : 'Name',
			accessor : (item) => (<div className={styles.table_item}>{item.name}</div>),
			id       : 'name',
		},
		{
			Header   : 'Monthly EMI',
			accessor : (item) => (<div className={styles.table_item}>{item.monthly_emi}</div>),
			id       : 'ctc_effective_from',
		},
		{
			Header   : 'EMI AUTHORISED',
			accessor : (item) => (<div className={styles.table_item}>{item.total_emi}</div>),
			id       : 'ctc_effective_to',
		},
		{
			Header   : 'EMI PAID',
			accessor : (item) => (<div className={styles.table_item}>{item.emi_paid}</div>),
			id       : 'monthly_gross',
		},
		{
			Header   : 'LAST PAYMENT DATE',
			accessor : (item) => (<div className={styles.table_item}>{item.last_payment_date || '-'}</div>),
			id       : 'monthly_ctc',
		},
		// {
		// 	Header   : 'STATUS',
		// 	accessor : (item) => (
		// 		<div className={styles.table_item}>
		// 			<Button size="md" themeType="accent">{item.action}</Button>
		// 		</div>
		// 	),
		// 	id: 'action',
		// },
	]
);

export default useGetIrregularColumns;
