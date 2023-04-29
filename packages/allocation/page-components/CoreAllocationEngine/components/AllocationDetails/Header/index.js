import { Button, Breadcrumb } from '@cogoport/components';
import { useState } from 'react';

import SearchInput from '../../../../../common/SearchInput';

import ApproveDetails from './ApproveDetails';
import DetailFilters from './DetailFilters';
import styles from './styles.module.css';

function Header(props) {
	const {
		params,
		setParams,
		disabled,
		partner_id,
		locale,
		debounceQuery,
		searchValue,
		setSearchValue,
		listRefetch,
		instanceStatus,
	} = props;

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
					disabled={disabled}
				/>
			</div>

			<DetailFilters
				params={params}
				setParams={setParams}
				disabled={disabled}
			/>

			<div>
				<Button
					size="md"
					themeType="primary"
					style={{ marginLeft: '8px' }}
					onClick={() => setShowApprove(true)}
					disabled={instanceStatus === 'completed' || disabled}
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
