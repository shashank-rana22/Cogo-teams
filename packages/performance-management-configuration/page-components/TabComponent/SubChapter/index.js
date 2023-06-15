import { Pagination } from '@cogoport/components';

import Header from '../../../commons/CommonHeader';
import CreateConfigurationModal from '../../../commons/CreateConfigurationModal';
import StyledTable from '../../../commons/StyledTable';

import controls from './controls';
import styles from './styles.module.css';
import useCreateChapter from './useCreateSubChapter';
import useSubChapter from './useSubChapter';

const ADD_BUTTON_TEXT = 'Sub Chapter';
const TABLE_EMPTY_TEXT = 'No sub chapters created yet';
const DEFAULT_TOTAL_ITEMS = 0;
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_TOTAL_COUNT = 10;
const ADD_BUTTON_LABEL = 'Sub-Chapter';

function SubChapter() {
	const {
		columns, search, setSearch, data, loading: listLoading,
		page, setPage, fetchList,
	} = useSubChapter();

	const { list = [], ...paginationData } = data || {};

	const {
		showAddChapterModal,
		setShowAddChapterModal = () => {},
		control,
		errors,
		onClickSubmitButton,
		loading,
		handleSubmit,
	} = useCreateChapter({ fetchList });

	const onClickAddButton = () => {
		setShowAddChapterModal(true);
	};

	return (
		<div>
			<Header
				setSearch={setSearch}
				search={search}
				label={ADD_BUTTON_TEXT}
				onClickAddButton={onClickAddButton}
			/>

			<StyledTable columns={columns} data={list} emptyText={TABLE_EMPTY_TEXT} loading={listLoading} />

			{paginationData?.total_count > DEFAULT_TOTAL_COUNT && (
				<div className={styles.pagination_container}>
					<Pagination
						totalItems={paginationData?.total_count || DEFAULT_TOTAL_ITEMS}
						currentPage={page || DEFAULT_CURRENT_PAGE}
						pageSize={paginationData?.page_limit}
						onPageChange={setPage}
					/>
				</div>
			)}

			{showAddChapterModal ? (
				<CreateConfigurationModal
					showModal={showAddChapterModal}
					setShowModal={setShowAddChapterModal}
					label={ADD_BUTTON_LABEL}
					controls={controls}
					control={control}
					errors={errors}
					onClickSubmitButton={onClickSubmitButton}
					loading={loading}
					handleSubmit={handleSubmit}
				/>
			) : null}
		</div>
	);
}

export default SubChapter;
