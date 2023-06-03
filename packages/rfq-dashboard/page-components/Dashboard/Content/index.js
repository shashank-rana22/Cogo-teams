import { Pagination, Tabs, TabPanel } from '@cogoport/components';
import { useEffect } from 'react';

import useListRfqs from '../../../hooks/useListrfqs';

import RfqDetails from './RfqDetails';
import styles from './styles.module.css';

const TAB_MAPPING = [
	{ name: 'approval', title: 'Approval' },
];

function Content(props) {
	const { activeTab, setActiveTab, filterStore } = props;

	const { getRfqsForApproval, data = {}, page, setPage, loading } = useListRfqs({ filterStore });

	useEffect(() => {
		getRfqsForApproval();
	}, [getRfqsForApproval, filterStore]);

	const { list = [] } = data;

	return (
		<div>
			<div className={styles.container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					{TAB_MAPPING.map(({ name, title }) => (
						<TabPanel name={name} title={title} key={name}>
							<RfqDetails
								{...props}
								list={list}
								loading={loading}
								getRfqsForApproval={getRfqsForApproval}
							/>
						</TabPanel>
					))}
				</Tabs>

			</div>
			<div className={styles.pagination_container}>
				<Pagination
					className="md"
					totalItems={data?.total_count || 0}
					currentPage={page || 1}
					pageSize={data?.page_limit}
					onPageChange={setPage}
					type="table"
				/>
			</div>
		</div>
	);
}

export default Content;
