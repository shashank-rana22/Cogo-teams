import { Pagination } from '@cogoport/components';

import Header from '../../../commons/CommonHeader';
import CreateConfigurationModal from '../../../commons/CreateConfigurationModal';
import DeleteConfigurationModal from '../../../commons/DeleteConfigurationModal';
import StyledTable from '../../../commons/StyledTable';

import controls from './controls';
import styles from './styles.module.css';
import useChapter from './useChapter';
import useCreateChapter from './useCreateChapter';
import useUpdateChapter from './useUpdateChapter';

const ADD_BUTTON_LABEL = 'Chapter';
const TABLE_EMPTY_TEXT = 'No Chapters created yet';
const DEFAULT_TOTAL_ITEMS = 0;
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_TOTAL_COUNT = 10;
const MODAL_TYPE_UPDATE = 'Update';
const MODAL_TYPE_ADD = 'Add';

function Chapter() {
	const {
		columns, search, setSearch, data, loading: listApiLoading,
		page, setPage, fetchList, showDeleteModal, setShowDeleteModal,
		deleteChapter, deleteLoading, showUpdateChapterModal,
		setShowUpdateChapterModal,
	} = useChapter();

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

	const {
		control: UpdateControl,
		errors: UpdateErrors,
		onClickUpdateButton,
		loading: UpdateLoading,
		handleSubmit: UpdateHandleSubmit,
		setValue,
	} = useUpdateChapter({ fetchList, setShowUpdateChapterModal, showUpdateChapterModal });

	const onClickAddButton = () => {
		setShowAddChapterModal(true);
	};

	return (
		<div>
			<Header
				setSearch={setSearch}
				search={search}
				label={ADD_BUTTON_LABEL}
				onClickAddButton={onClickAddButton}
			/>

			<StyledTable columns={columns} data={list} emptyText={TABLE_EMPTY_TEXT} loading={listApiLoading} />

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
					Type={MODAL_TYPE_ADD}
				/>
			) : null}

			{showUpdateChapterModal ? (
				<CreateConfigurationModal
					showModal={showUpdateChapterModal}
					setShowModal={setShowUpdateChapterModal}
					label={ADD_BUTTON_LABEL}
					controls={controls}
					control={UpdateControl}
					errors={UpdateErrors}
					onClickSubmitButton={onClickUpdateButton}
					loading={UpdateLoading}
					handleSubmit={UpdateHandleSubmit}
					Type={MODAL_TYPE_UPDATE}
					setValue={setValue}
				/>
			) : null}

			{showDeleteModal ? (
				<DeleteConfigurationModal
					showModal={showDeleteModal}
					setShowModal={setShowDeleteModal}
					onClickButton={deleteChapter}
					loading={deleteLoading}
					label={ADD_BUTTON_LABEL}
				/>
			) : null}
		</div>
	);
}

export default Chapter;
