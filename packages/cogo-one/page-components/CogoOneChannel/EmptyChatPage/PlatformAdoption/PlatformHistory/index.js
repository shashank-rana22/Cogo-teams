import { Pagination, Table, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRight, IcMHome } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const COLUMNS = [
	{
		id       : 'request_id',
		Header   : 'Request Id',
		accessor : (item) => <div>{item?.serial_id}</div>,
	},
	{
		id       : 'request_by',
		Header   : 'Request By',
		accessor : (item) => <div className={styles.label}>{startCase(item?.request_submitted_by?.name) || '-'}</div>,
	},
	{
		id       : 'organization_name',
		Header   : 'ORGANIZATION NAME',
		accessor : (item) => <div className={styles.label}>{startCase(item?.organization?.business_name) || '-'}</div>,
	},
	{
		id       : 'request_type',
		Header   : 'REQUEST TYPE',
		accessor : (item) => <div className={styles.label}>{startCase(item?.request_type)}</div>,
	},
	{
		id       : 'request_on',
		Header   : 'REQUEST ON',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item?.created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
					formatType : 'dateTime',
					separator  : ' | ',
				}) || 'NA'}

			</div>
		),
	},
	{
		id       : 'action_status',
		Header   : 'ACTION STATUS',
		accessor : (item) => (
			<div className={styles.status_div}>
				<div className={cl`${styles.circle} 
				${item?.request_status === 'completed' ? styles.complete : styles.pending}`}
				/>
				<div className={styles.title}>{startCase(item?.request_status)}</div>
			</div>
		),
	},
];

function PlatformHistory({ setShowHistory = () => {}, rest = {}, list = [], loading = false }) {
	const { page, page_limit, total_count } = rest || {};

	return (
		<div className={styles.history_container}>
			<div className={styles.header_section}>
				<div role="presentation" className={styles.back} onClick={() => setShowHistory(false)}>
					<IcMHome fill="#034AFD" width={20} height={20} />
					<div className={styles.back_title}>Home</div>
				</div>
				<IcMArrowRight className={styles.side_arrow} />
				<div className={styles.title}>Task History</div>
			</div>
			<div className={styles.content}>
				<Table columns={COLUMNS} data={list} loading={loading} />
			</div>
			{page >= 1 ? (
				<div className={styles.pagination_info}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
					/>
				</div>
			) : null}
		</div>
	);
}

export default PlatformHistory;
