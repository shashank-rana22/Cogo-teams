import { Button, Breadcrumb } from '@cogoport/components';
import { useState } from 'react';

import SearchInput from '../../../../common/SearchInput';

import ApproveDetails from './ApproveDetails';
import DetailFilters from './DetailFilters';
import styles from './styles.module.css';

function Header({
	params,
	setParams,
	partner_id,
	locale,
	debounceQuery,
	searchValue,
	setSearchValue,
	listRefetch,
}) {
	const [showApprove, setShowApprove] = useState(false);

	return (
		<div className={styles.header_container}>
			<Breadcrumb>
				<Breadcrumb.Item
					label={<a href={`/v2/${locale}/${partner_id}/allocation/core-engine/`}>Core Engine</a>}
				/>
				<Breadcrumb.Item label="Allocation Details" />
			</Breadcrumb>

			<div className={styles.search_container}>
				<SearchInput
					size="sm"
					placeholder="Search by Business Name/User/Stakeholder"
					setGlobalSearch={setSearchValue}
					debounceQuery={debounceQuery}
					value={searchValue}
				/>
			</div>

			<DetailFilters params={params} setParams={setParams} />

			<div>
				<Button
					size="md"
					themeType="accent"
					style={{ marginLeft: '8px' }}
					onClick={() => setShowApprove(true)}
				>
					Approve
				</Button>
			</div>

			{showApprove && (
				<ApproveDetails
					showApprove={showApprove}
					setShowApprove={setShowApprove}
					listRefetch={listRefetch}
				/>
			)}
		</div>
	);
}

export default Header;
