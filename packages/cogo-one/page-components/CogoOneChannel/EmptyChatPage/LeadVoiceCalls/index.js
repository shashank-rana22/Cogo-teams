import { Input, Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import useListLeadOrgUsers from '../../../../hooks/useListLeadOrgUsers';

import LeadOrgCard from './LeadOrgCard';
import styles from './styles.module.css';

function LeadVoiceCalls({ setActiveTab = () => {} }) {
	const {
		data,
		loading,
		search,
		setSearch,
		handlePagination,
	} = useListLeadOrgUsers();

	const { list = [], page = 1, page_limit = 6, total_count = 0 } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.title}>All Leads</div>
				<Input
					size="sm"
					value={search}
					onChange={setSearch}
					prefix={<IcMSearchlight className={styles.search_icon} />}
					placeholder="Search By Name"
					className={styles.input_styled}
				/>
			</div>
			{loading ? (
				<div className={styles.loader}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
						alt="load"
						width={160}
						height={160}
					/>
				</div>
			) : (
				<div className={styles.list_container}>
					{list?.map((eachItem) => (
						<LeadOrgCard
							eachItem={eachItem}
							key={eachItem?.id}
							setActiveTab={setActiveTab}
						/>
					))}
				</div>
			)}
			<div className={styles.pagination_container}>
				{!isEmpty(list) ? (
					<Pagination
						type="number"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						disabled={loading}
						onPageChange={handlePagination}
					/>
				) : null}
			</div>
		</div>
	);
}
export default LeadVoiceCalls;
