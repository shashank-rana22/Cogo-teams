import { Button } from '@cogoport/components';

import styles from './styles.module.css';

const useGetColumns = (setTaxShow) => (
	[
		{
			Header   : 'Sl. NO',
			accessor : () => (<div className={styles.table_item}>0</div>),
			id       : 'slno',
		},
		{
			Header   : 'CTC EFFECTIVE FROM',
			accessor : (item) => (<div className={styles.table_item}>{item?.ctc_effective}</div>),
			id       : 'ctc_effective_from',
		},
		{
			Header   : 'CTC EFFECTIVE TO',
			accessor : (item) => (<div className={styles.table_item}>{item?.ctc_effective_to}</div>),
			id       : 'ctc_effective_to',
		},
		{
			Header   : 'MONTHLY GROSS',
			accessor : (item) => (<div className={styles.table_item}>{`₹${item?.monthly_gross}`}</div>),
			id       : 'monthly_gross',
		},
		{
			Header   : 'MONTHLY CTC',
			accessor : (item) => (<div className={styles.table_item}>{`₹${item?.monthly_ctc}`}</div>),
			id       : 'monthly_ctc',
		},
		{
			Header   : 'ACTION',
			accessor : () => (
				<div className={styles.table_item}>
					<Button size="md" themeType="secondary" onClick={() => setTaxShow(true)}>View</Button>
				</div>
			),
			id: 'action',
		},
	]
);

export default useGetColumns;
