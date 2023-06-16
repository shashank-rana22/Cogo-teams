import { Pagination } from '@cogoport/components';

import Header from '../../../commons/CommonHeader';
import CreateConfigurationModal from '../../../commons/CreateConfigurationModal';
import DeleteConfigurationModal from '../../../commons/DeleteConfigurationModal';
import PACKAGE_CONSTANTS from '../../../commons/packageConstants';
import StyledTable from '../../../commons/StyledTable';

import controls from './controls';
import styles from './styles.module.css';
import useChapter from './useChapter';
import useCreateChapter from './useCreateChapter';
import useUpdateChapter from './useUpdateChapter';

const ADD_BUTTON_LABEL = 'Chapter';
const TABLE_EMPTY_TEXT = 'No Chapters created yet';
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

	const { total_count, page_limit } = paginationData || {};

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

			{total_count > PACKAGE_CONSTANTS.pagination_data.default_total_count && (
				<div className={styles.pagination_container}>
					<Pagination
						totalItems={total_count || PACKAGE_CONSTANTS.pagination_data.default_total_items}
						currentPage={page || PACKAGE_CONSTANTS.pagination_data.default_current_page}
						pageSize={page_limit}
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
