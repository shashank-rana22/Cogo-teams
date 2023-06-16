import { Pagination } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import ActiveInactiveTabs from '../../../commons/ActiveInactiveTabs';
import Header from '../../../commons/CommonHeader';
import CreateConfigurationModal from '../../../commons/CreateConfigurationModal';
import DeleteConfigurationModal from '../../../commons/DeleteConfigurationModal';
import StyledTable from '../../../commons/StyledTable';

import controls from './controls';
import styles from './styles.module.css';
import useCreateChapter from './useCreateSubChapter';
import useSubChapter from './useSubChapter';
import useUpdateSubChapter from './useUpdateSubChapter';

const ADD_BUTTON_TEXT = 'Sub Chapter';
const TABLE_EMPTY_TEXT = 'No sub chapters created yet';
const DEFAULT_TOTAL_ITEMS = 0;
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_TOTAL_COUNT = 10;
const MODAL_TYPE_UPDATE = 'Update';
const MODAL_TYPE_ADD = 'Add';
const ADD_BUTTON_LABEL = 'Sub Chapter';

function SubChapter() {
	const { control, formState: { errors }, handleSubmit, setValue } = useForm();

	const {
		columns,
		search,
		setSearch,
		data,
		loading: listLoading,
		page,
		setPage,
		fetchList,
		setShowDeleteModal,
		showDeleteModal,
		deleteSubChapter,
		deleteLoading,
		setShowUpdateSubChapterModal,
		showUpdateSubChapterModal,
		activeTab,
		setActiveTab,
	} = useSubChapter();

	const { list = [], ...paginationData } = data || {};

	const {
		showAddChapterModal,
		setShowAddChapterModal = () => {},
		onClickSubmitButton,
		loading,
	} = useCreateChapter({ fetchList });

	const {
		onClickUpdateButton,
		loading: UpdateLoading,
	} = useUpdateSubChapter({
		fetchList,
		setShowUpdateSubChapterModal,
		showUpdateSubChapterModal,
	});

	const onClickAddButton = () => {
		setShowAddChapterModal(true);
	};

	return (
		<div>
			<ActiveInactiveTabs activeTab={activeTab} setActiveTab={setActiveTab} />

			<Header
				setSearch={setSearch}
				search={search}
				label={ADD_BUTTON_TEXT}
				onClickAddButton={onClickAddButton}
			/>

			<StyledTable
				columns={columns}
				data={list}
				emptyText={TABLE_EMPTY_TEXT}
				loading={listLoading}
			/>

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
					controls={controls}
					control={control}
					errors={errors}
					onClickSubmitButton={onClickSubmitButton}
					loading={loading}
					handleSubmit={handleSubmit}
					Type={MODAL_TYPE_ADD}
					label={ADD_BUTTON_LABEL}
				/>
			) : null}

			{showUpdateSubChapterModal ? (
				<CreateConfigurationModal
					showModal={showUpdateSubChapterModal}
					setShowModal={setShowUpdateSubChapterModal}
					controls={controls}
					control={control}
					errors={errors}
					onClickSubmitButton={onClickUpdateButton}
					loading={UpdateLoading}
					handleSubmit={handleSubmit}
					Type={MODAL_TYPE_UPDATE}
					setValue={setValue}
					label={ADD_BUTTON_LABEL}
				/>
			) : null}

			{showDeleteModal ? (
				<DeleteConfigurationModal
					showModal={showDeleteModal}
					setShowModal={setShowDeleteModal}
					onClickButton={deleteSubChapter}
					loading={deleteLoading}
					label={ADD_BUTTON_LABEL}
				/>
			) : null}
		</div>
	);
}

export default SubChapter;
