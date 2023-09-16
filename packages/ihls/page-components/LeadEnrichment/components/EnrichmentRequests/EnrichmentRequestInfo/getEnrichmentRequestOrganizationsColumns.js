import styles from './styles.module.css';

const getEnrichmentRequestOrganizations = () => [
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
