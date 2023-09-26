import styles from './styles.module.css';

const tableColumns = [
	{
		Header: (
			<div className={styles.promo_budget_details_table_heading}>NAME</div>
		),
		accessor : (item) => item?.name,
		id       : 'role_name',
	},
	{
		Header: (
			<div className={styles.promo_budget_details_table_heading}>
				AMOUNT ALOTTED
				{' '}
			</div>
		),
		accessor : (item) => item?.total_budget,
		id       : 'total_budget',
	},
	{
		Header: (
			<div className={styles.promo_budget_details_table_heading}>
				PROMO CODES GENERATED
			</div>
		),
		accessor : (item) => item?.total_count,
		id       : 'total_count',
	},
	{
		Header: (
			<div className={styles.promo_budget_details_table_heading}>
				AMOUNT UTILISED
			</div>
		),
		accessor : (item) => item?.amount_utilised,
		id       : 'amount_utilised',
	},
	{
		Header: (
			<div className={styles.promo_budget_details_table_heading}>SHIPMENTS</div>
		),
		accessor : (item) => item?.shipment_stats,
		id       : 'shipment_stats',
	},
	{
		Header   : '',
		accessor : 'block',
		id       : 'block',
	},
];

export default tableColumns;
