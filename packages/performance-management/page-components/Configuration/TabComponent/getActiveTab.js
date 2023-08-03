import { Pagination } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import PACKAGE_CONSTANTS from '../../../common/packageConstants';
import StyledTable from '../../../common/StyledTable';
import ActiveInactiveTabs from '../commons/ActiveInactiveTabs';
import Header from '../commons/CommonHeader';
import CreateConfigurationModal from '../commons/CreateConfigurationModal';
import DeleteConfigurationModal from '../commons/DeleteConfigurationModal';
import useCreateComponent from '../commons/useCreateComponent';
import useDeleteComponent from '../commons/useDeleteComponent';
import useTableComponent from '../commons/useTableComponent';
import useUpdateComponent from '../commons/useUpdateComponent';

import chapterControls from './Chapter/controls';
import getChapterColumns from './Chapter/getColumns';
import getEmployeesColumns from './Employees/getColumns';
import squadControls from './Squad/controls';
import getSquadColumns from './Squad/getColumns';
import styles from './styles.module.css';
import subChapterControls from './SubChapter/controls';
import getSubChapterColumns from './SubChapter/getColumns';
import tribeControls from './Tribe/controls';
import getTribeColumns from './Tribe/getColumns';

const MAPPING = {
	tribe       : getTribeColumns,
	squad       : getSquadColumns,
	sub_chapter : getSubChapterColumns,
	chapter     : getChapterColumns,
	employee    : getEmployeesColumns,
};

const CONTROLS_MAPPING = {
	tribe       : tribeControls,
	squad       : squadControls,
	sub_chapter : subChapterControls,
	chapter     : chapterControls,
};

const MODAL_TYPE_UPDATE = 'Update';
const MODAL_TYPE_ADD = 'Add';
const FUNCTION_ADD = 'add';

function ActiveTabs({ source }) {
	const TABLE_EMPTY_TEXT = `No ${source} created yet`;

	const { control, formState: { errors }, handleSubmit, setValue, reset } = useForm();

	const {
		columns,
		search,
		setSearch,
		page,
		setPage,
		data,
		loading: listApiLoading,
		fetchList,
		showCreateModal,
		setShowCreateModal,
		activeTab,
		setActiveTab,
		showDeleteModal,
		setShowDeleteModal,
	} = useTableComponent({ source, getColumns: MAPPING[source] });

	const { deleteComponent, loading: deleteLoading } = useDeleteComponent({
		fetchList,
		setShowDeleteModal,
		showDeleteModal,
		source,
	});

	const { list = [], ...paginationData } = data || {};

	const { total_count, page_limit } = paginationData || {};

	const {
		onClickSubmitButton,
		loading: createLoading,
	} = useCreateComponent({ fetchList, setShowCreateModal, source });

	const {
		onClickUpdateButton,
		loading: updateLoading,
	} = useUpdateComponent({ fetchList, setShowCreateModal, showCreateModal, source, reset });

	const onClickAddButton = () => {
		setShowCreateModal(FUNCTION_ADD);
		reset();
	};

	return (
		<div>
			<div className={styles.header}>
				<ActiveInactiveTabs activeTab={activeTab} setActiveTab={setActiveTab} />

				<Header
					setSearch={setSearch}
					search={search}
					label={startCase(source)}
					onClickAddButton={onClickAddButton}
				/>
			</div>

			<StyledTable columns={columns} data={list} emptyText={TABLE_EMPTY_TEXT} loading={listApiLoading} />

			{paginationData?.total_count > PACKAGE_CONSTANTS.pagination_data.default_total_count && (
				<div className={styles.pagination_container}>
					<Pagination
						totalItems={total_count || PACKAGE_CONSTANTS.pagination_data.default_total_items}
						currentPage={page || PACKAGE_CONSTANTS.pagination_data.default_current_page}
						pageSize={page_limit}
						onPageChange={setPage}
					/>
				</div>
			)}

			{showCreateModal ? (
				<CreateConfigurationModal
					showModal={showCreateModal}
					setShowModal={setShowCreateModal}
					label={source}
					controls={CONTROLS_MAPPING[source]}
					control={control}
					errors={errors}
					onClickSubmitButton={
						showCreateModal === FUNCTION_ADD ? onClickSubmitButton : onClickUpdateButton
}
					loading={showCreateModal === FUNCTION_ADD ? createLoading : updateLoading}
					handleSubmit={handleSubmit}
					type={showCreateModal === FUNCTION_ADD ? MODAL_TYPE_ADD : MODAL_TYPE_UPDATE}
					setValue={setValue}
				/>
			) : null}

			{showDeleteModal ? (
				<DeleteConfigurationModal
					showModal={showDeleteModal}
					setShowModal={setShowDeleteModal}
					onClickButton={deleteComponent}
					loading={deleteLoading}
					label={source}
				/>
			) : null}
		</div>
	);
}

export default ActiveTabs;
