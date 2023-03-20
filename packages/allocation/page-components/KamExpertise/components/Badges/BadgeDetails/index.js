import { Pagination } from '@cogoport/components';

import Header from './Header';
import ListItem from './ListItem';
import styles from './styles.module.css';

function BadgeDetails(props) {
	const {
		badgeList, setToggleScreen, searchValue, setSearchValue,
		debounceQuery, setMasteryItemData, setBadgeItemData, expertise, setExpertise,
		loading, listRefetch, getNextPage, paginationData,
	} = props;

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	return (
		<div>
			<Header
				setToggleScreen={setToggleScreen}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				debounceQuery={debounceQuery}
				setMasteryItemData={setMasteryItemData}
				setBadgeItemData={setBadgeItemData}
				expertise={expertise}
				setExpertise={setExpertise}
				loading={loading}
			/>

			<ListItem
				setToggleScreen={setToggleScreen}
				setBadgeItemData={setBadgeItemData}
				setMasteryItemData={setMasteryItemData}
				loading={loading}
				badgeList={badgeList}
				listRefetch={listRefetch}
			/>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>
		</div>
	);
}
export default BadgeDetails;
