import { Table, Pagination, Toggle, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import DeallocateModal from '../DeallocateModal';
import ScoreTrendModal from '../ScoreTrendModal';

import getLeaderBoardColumns from './LeaderboardListColumns';
import styles from './styles.module.css';

function Leaderboard(props) {
	const { t } = useTranslation(['allocation']);

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
		t,
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
			<div className={styles.header_text}>{t('allocation:leader_board_list')}</div>
			<div className={styles.bulk_container}>

				<div className={styles.bulk_deallocate_toggle}>
					{t('allocation:bulk_deallocate')}
					<Toggle
						name="bulk_deallocate"
						size="md"
						offLabel={t('allocation:off_label')}
						onLabel={t('allocation:on_label')}
						onChange={(event) => onChangeBulkToggle(event)}
					/>

				</div>

				<div>
					<Button
						disabled={(!bulkDeallocateFilter) || (bulkDeallocateFilter && isEmpty(checkedRowsId))}
						onClick={() => setShowDeallocateModal(true)}
					>
						{t('allocation:deallocate')}
					</Button>
				</div>

			</div>

			{isEmpty(leaderboardList) && !leaderboardLoading ? (
				<div className={styles.empty_container}>
					<EmptyState
						height={220}
						width={380}
						flexDirection="column"
						emptyText={t('allocation:leaderboard_empty_state')}
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
