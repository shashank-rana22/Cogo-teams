import { Table, Pagination, Toggle, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import DeallocateModal from '../DeallocateModal';
import ScoreTrendModal from '../ScoreTrendModal';

import getLeaderBoardColumns from './LeaderboardListColumns';
import styles from './styles.module.css';

function Leaderboard(props) {
	const {
		leaderboardList,
		leaderboardLoading,
		page = 0,
		page_limit = 0,
		total_count = 0,
		getNextPage = () => {},
		checkedRowsId,
		setCheckedRowsId = () => {},
		currentPageListIds = [],
		isAllChecked,
		setIsAllChecked = () => {},
		selectAllHelper = () => {},
		setValue = () => {},
		setBulkDeallocateFilter = () => {},
		bulkDeallocateFilter,
		refetch = () => {},
	} = props;

	const [scoreTrendIds, setScoreTrendIds] = useState({});
	const [showDeallocateModal, setShowDeallocateModal] = useState(false);
	const [modalDetailsArray, setModalDetailsArray] = useState([]);

	const columns = getLeaderBoardColumns({
		setScoreTrendIds,
		checkedRowsId,
		setCheckedRowsId,
		currentPageListIds,
		isAllChecked,
		setIsAllChecked,
		selectAllHelper,
		bulkDeallocateFilter,
		modalDetailsArray,
		setModalDetailsArray,
		leaderboardList,
	});

	const onChangeBulkToggle = (event) => {
		setBulkDeallocateFilter(() => {
			if (event.target?.checked) {
				return true;
			} return false;
		});
		if (event?.target?.checked) {
			setValue('warmth', ['ice_cold', 'cold']);
		} else {
			setValue('warmth', undefined);
			setCheckedRowsId([]);
			setModalDetailsArray([]);
		}
	};

	return (
		<>
			<div className={styles.header_text}>Leaderboard List</div>
			<div className={styles.bulk_container}>

				<div className={styles.bulk_deallocate_toggle}>
					Bulk De-allocate:
					<Toggle
						name="bulk_deallocate"
						size="md"
						offLabel="off"
						onLabel="on"
						onChange={(event) => onChangeBulkToggle(event)}
					/>

				</div>

				<div>
					<Button
						disabled={(!bulkDeallocateFilter) || (bulkDeallocateFilter && isEmpty(checkedRowsId))}
						onClick={() => setShowDeallocateModal(true)}
					>
						De-allocate

					</Button>
				</div>

			</div>

			{isEmpty(leaderboardList) && !leaderboardLoading ? (
				<div className={styles.empty_container}>
					<EmptyState
						height={220}
						width={380}
						flexDirection="column"
						emptyText="Leaderboard Data not found"
						textSize={20}
					/>
				</div>
			) : (
				<>
					<div className={styles.table_container}>
						<Table
							className={styles.table}
							columns={columns}
							data={leaderboardList || []}
							loading={leaderboardLoading}
						/>
					</div>

					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={getNextPage}
						/>
					</div>

					{!isEmpty(scoreTrendIds) && (
						<ScoreTrendModal
							scoreTrendIds={scoreTrendIds}
							setScoreTrendIds={setScoreTrendIds}
						/>
					)}

					{showDeallocateModal && (
						<DeallocateModal
							setShowDeallocateModal={setShowDeallocateModal}
							showDeallocateModal={showDeallocateModal}
							setCheckedRowsId={setCheckedRowsId}
							checkedRowsId={checkedRowsId}
							modalDetailsArray={modalDetailsArray}
							setModalDetailsArray={setModalDetailsArray}
							refetch={refetch}
						/>
					)}
				</>
			)}

		</>
	);
}

export default Leaderboard;
