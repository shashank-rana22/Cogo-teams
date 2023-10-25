import { Pagination, Table } from '@cogoport/components';
import { IcMArrowRight, IcMHome } from '@cogoport/icons-react';

import styles from './styles.module.css';

function OrgNameLabel({ item = {} }) {
	console.log('item:', item);
	return (
		<div className={styles.name_content}>
			<div className={styles.name}>{item?.name}</div>
			<div className={styles.org_section}>
				<div className={styles.org_name}>
					{item?.organization}
				</div>
				<div className={styles.account_type}>{item?.account}</div>
			</div>
		</div>
	);
}

const COLUMNS = [
	{
		id       : 'organization_name',
		Header   : 'ORGANIZATION NAME',
		accessor : (item) => <OrgNameLabel item={item?.organization_name} />,
	},
	{ id: 'request_type', Header: 'REQUEST TYPE', accessor: 'request_type' },
	{ Header: 'REQUEST ON', accessor: 'request_on', id: 'request_on' },
	{ Header: 'ACTION TIME', accessor: 'action_time' },
	{ Header: 'ACTION TAKEN', accessor: 'action_taken' },
];

const data = [
	{
		organization_name: {
			name         : 'John Wick (Agent)',
			organization : 'Reliance Private Limited',
			account      : 'CP',
		},
		request_type : 'KYC',
		request_on   : '25 Oct 2023',

	},
	{
		organization_name: {
			name         : 'John Wick (Agent)',
			organization : 'Reliance Private Limited',
			account      : 'CP',
		},
		request_type : 'KYC',
		request_on   : '25 Oct 2023',

	},
	{
		organization_name: {
			name         : 'John Wick (Agent)',
			organization : 'Reliance Private Limited',
			account      : 'CP',
		},
		request_type : 'KYC',
		request_on   : '25 Oct 2023',

	},
];

function PlatformHistory({ setShowHistory = () => {}, rest = {}, list = [] }) {
	console.log('list:', list);
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
				<Table columns={COLUMNS} data={data} loading={false} />
			</div>
			{/* {page > 1 ? ( */}
			<div className={styles.pagination_info}>
				<Pagination
					type="number"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
				/>
			</div>
			{/* ) : null} */}
		</div>
	);
}

export default PlatformHistory;
