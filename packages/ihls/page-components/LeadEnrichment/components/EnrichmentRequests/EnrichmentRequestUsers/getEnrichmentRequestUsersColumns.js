import styles from './styles.module.css';

const getEnrichmentRequestUsersColumns = () => [
	{
		Header   : 'NAME',
		key      : 'name',
		accessor : ({ name }) => (
			<div className={styles.table_cell}>
				{name || '___'}
			</div>
		),
	},
	{
		Header   : 'DESIGNATION',
		key      : 'designation',
		accessor : ({ designation }) => (
			<div className={styles.table_cell}>
				{designation || '___'}
			</div>
		),
	},
	{
		Header   : 'MOBILE NUMBER',
		key      : 'mobile_number',
		accessor : ({ mobile_number }) => (
			<div className={styles.table_cell}>
				{mobile_number || '___'}
			</div>
		),
	},
	{
		Header   : 'PERSONAL EMAIL',
		key      : 'personal_email',
		accessor : ({ personal_email }) => (
			<div className={styles.table_cell}>
				{personal_email || '___'}
			</div>
		),
	},
];

export default getEnrichmentRequestUsersColumns;
