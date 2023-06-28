import { Pagination } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import StyledTable from '../../../../common/StyledTable';
import ActiveInactiveTabs from '../../commons/ActiveInactiveTabs';
import Header from '../../commons/CommonHeader';
import CreateConfigurationModal from '../../commons/CreateConfigurationModal';
import DeleteConfigurationModal from '../../commons/DeleteConfigurationModal';

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
const FUNCTION_ADD = 'add';

function SubChapter() {
	const { control, formState: { errors }, handleSubmit, setValue, reset } = useForm();

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
		setShowSubChapterModal,
		showSubChapterModal,
		activeTab,
		setActiveTab,
	} = useSubChapter();

	const { list = [], ...paginationData } = data || {};

	const {
		onClickSubmitButton,
		loading:CreateLoading,
	} = useCreateChapter({ fetchList, setShowSubChapterModal });

	const {
		onClickUpdateButton,
		loading: UpdateLoading,
	} = useUpdateSubChapter({
		fetchList,
		setShowSubChapterModal,
		showSubChapterModal,
	});

	const onClickAddButton = () => {
		setShowSubChapterModal(FUNCTION_ADD);
		reset();
	};

	return (
		<div>
			<div className={styles.header}>
				<ActiveInactiveTabs activeTab={activeTab} setActiveTab={setActiveTab} />

				<Header
					setSearch={setSearch}
					search={search}
					label={ADD_BUTTON_TEXT}
					onClickAddButton={onClickAddButton}
				/>
			</div>

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

			{showSubChapterModal ? (
				<CreateConfigurationModal
					showModal={showSubChapterModal}
					setShowModal={setShowSubChapterModal}
					controls={controls}
					control={control}
					errors={errors}
					onClickSubmitButton={showSubChapterModal === FUNCTION_ADD
						? onClickSubmitButton : onClickUpdateButton}
					loading={showSubChapterModal === FUNCTION_ADD ? CreateLoading : UpdateLoading}
					handleSubmit={handleSubmit}
					Type={showSubChapterModal === FUNCTION_ADD ? MODAL_TYPE_ADD : MODAL_TYPE_UPDATE}
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
