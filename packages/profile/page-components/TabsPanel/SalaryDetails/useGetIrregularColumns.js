import { cl } from '@cogoport/components';
import { IcCGreenCircle, IcCRedCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function GetStatus({ total_emi, emi_paid }) {
	if (total_emi === emi_paid) {
		return (
			<span className={cl`${styles.paid}${styles.btn}`}>
				<IcCGreenCircle />
				{' '}
				Paid
			</span>
		);
	}
	return (
		<span className={cl`${styles.progress}${styles.btn}`}>
			<IcCRedCircle />
			In Progress
		</span>
	);
}

const useGetIrregularColumns = () => (
	[
		{
			Header   : 'Name',
			accessor : (item) => (<div className={styles.table_item}>{item?.name}</div>),
			id       : 'name',
		},
		{
			Header   : 'Monthly EMI',
			accessor : (item) => (<div className={styles.table_item}>{Math.round(item?.monthly_emi)}</div>),
			id       : 'ctc_effective_from',
		},
		{
			Header   : 'EMI AUTHORISED',
			accessor : (item) => (<div className={styles.table_item}>{item?.total_emi}</div>),
			id       : 'ctc_effective_to',
		},
		{
			Header   : 'EMI PAID',
			accessor : (item) => (<div className={styles.table_item}>{item?.emi_paid}</div>),
			id       : 'monthly_gross',
		},
		{
			Header   : 'LAST PAYMENT DATE',
			accessor : (item) => (<div className={styles.table_item}>{item.last_payment_date || '-'}</div>),
			id       : 'monthly_ctc',
		},
		{
			Header   : 'STATUS',
			accessor : (item) => (
				<div className={styles.table_item}>
					<GetStatus item_emi={item?.total_emi} emi_paid={item?.emi_paid} />
				</div>
			),
			id: 'action',
		},
	]
);

export default useGetIrregularColumns;
