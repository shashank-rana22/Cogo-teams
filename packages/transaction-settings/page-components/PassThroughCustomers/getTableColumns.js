import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format, startCase } from '@cogoport/utils';

import styles from './style.module.css';

const getTableColumns = () => {
	const tableColumns = [
		{
			Header   :	'Serial ID',
			accessor : (item) => (
				<div className={styles.container}>
					#
					{' '}
					{startCase(item?.organization?.serial_id) || '-'}
				</div>
			),
		},
		{
			Header   : 'Business Name',
			accessor : (item) => (
				<div
					className={styles.container}
				>
					{startCase(item?.organization?.business_name || '-')}
				</div>
			),
		},
		{
			Header   : 'Account Type',
			accessor : (item) => (
				<div className={styles.container}>
					{startCase(item?.organization?.account_type) || '-'}
				</div>
			),
		},
		{
			Header   : 'Agreement Document',
			accessor : (item) => (
				<a
					className={styles.link}
					target="_blank"
					href={`${item?.setting_config?.agreement_url}`}
					rel="noreferrer"
				>
					View Document

				</a>
			),
		},
		{
			Header   : 'Validity Start Date',
			accessor : (item) => {
				const validity_start = format(
					new Date(item?.setting_config?.validity_start_date),
					GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				);

				return (
					<div className={styles.container}>
						{startCase(validity_start) || '-' }
					</div>
				);
			},
		},
		{
			Header   : 'Validity End Date',
			accessor : (item) => {
				const validity_end = format(
					new Date(item?.setting_config?.validity_end_date),
					GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				);

				return (
					<div className={styles.container}>
						{startCase(validity_end) || '-' }
					</div>
				);
			},
		},
		{
			Header   : 'Status',
			accessor : (item) => (
				<div className={styles.status}>
					{startCase(item?.status) || '-'}
				</div>
			),
		},
	];

	return tableColumns;
};

export default getTableColumns;
