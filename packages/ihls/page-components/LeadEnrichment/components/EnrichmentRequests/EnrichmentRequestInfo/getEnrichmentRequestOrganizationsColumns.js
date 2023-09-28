import styles from './styles.module.css';

const getEnrichmentRequestOrganizations = () => [
	{
		Header   : 'BUSINESS NAME',
		key      : 'business_name',
		accessor : ({ business_name }) => (
			<div className={styles.table_cell}>
				{business_name || '___'}
			</div>
		),
	},
	{
		Header   : 'TRADE NAME',
		key      : 'trade_name',
		accessor : ({ trade_name }) => (
			<div className={styles.table_cell}>
				{trade_name || '___'}
			</div>
		),
	},
	{
		Header   : 'PAN',
		key      : 'registration_number',
		accessor : ({ registration_number }) => (
			<div className={styles.table_cell}>
				{registration_number || '___'}
			</div>
		),
	},
];

export default getEnrichmentRequestOrganizations;
