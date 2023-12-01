import { Pill } from '@cogoport/components';

import styles from './styles.module.css';

const getTableColumns = () => {
	const tableColumns = [
		{
			Header   : 'Business Name',
			accessor : (item) => <div>{item.business_name}</div>,
		},
		{
			Header   : 'Registration Number',
			accessor : (item) => <div>{item.registration_number}</div>,
		},
		{
			Header   : 'Country',
			accessor : (item) => <div>{item.country.name}</div>,
		},
		{
			Header   : 'Status',
			accessor : (item) => (
				<Pill color={item.status === 'active' ? 'rgb(205, 247, 212)' : 'rgb(247, 205, 205)'}>
					<div className={styles.status}>{item.status}</div>
				</Pill>
			),
		},
	];
	return tableColumns;
};
export default getTableColumns;
