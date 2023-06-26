import { Pagination } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import ActiveInactiveTabs from '../../../commons/ActiveInactiveTabs';
import Header from '../../../commons/CommonHeader';
import CreateConfigurationModal from '../../../commons/CreateConfigurationModal';
import DeleteConfigurationModal from '../../../commons/DeleteConfigurationModal';
import PACKAGE_CONSTANTS from '../../../commons/packageConstants';
import StyledTable from '../../../commons/StyledTable';

import controls from './controls';
import styles from './styles.module.css';
import useCreateSquad from './useCreateSquad';
import useSquad from './useSquad';
import useUpdateSquad from './useUpdateSquad';

const ADD_BUTTON_LABEL = 'Squad';
const TABLE_EMPTY_TEXT = 'No Squad created yet';
const MODAL_TYPE_UPDATE = 'Update';
const MODAL_TYPE_ADD = 'Add';
const FUNCTION_ADD = 'add';

function Squad() {
	const { control, formState: { errors }, handleSubmit, setValue, reset } = useForm();

	const {
		search, setSearch, columns, loading: listApiLoading, data, page, setPage, setShowDeleteModal,
		showDeleteModal, deleteSquad, deleteLoading, fetchList, setShowSquadModal, showSquadModal,
		activeTab, setActiveTab,
	} = useSquad();

	const { list = [], ...paginationData } = data || {};

	const { total_count, page_limit } = paginationData || {};

	const {
		onClickSubmitButton,
		loading: CreateLoading,
	} = useCreateSquad({ fetchList, setShowSquadModal });

	const {
		onClickUpdateButton,
		loading: UpdateLoading,
	} = useUpdateSquad({ fetchList, setShowSquadModal, showSquadModal });

	const onClickAddButton = () => {
		setShowSquadModal(FUNCTION_ADD);
		reset();
	};

	return (
		<div>
			<div className={styles.header}>
				<ActiveInactiveTabs activeTab={activeTab} setActiveTab={setActiveTab} />

				<Header
					setSearch={setSearch}
					search={search}
					label={ADD_BUTTON_LABEL}
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

			{showSquadModal ? (
				<CreateConfigurationModal
					showModal={showSquadModal}
					setShowModal={setShowSquadModal}
					label={ADD_BUTTON_LABEL}
					controls={controls}
					control={control}
					errors={errors}
					onClickSubmitButton={showSquadModal === FUNCTION_ADD ? onClickSubmitButton : onClickUpdateButton}
					loading={showSquadModal === FUNCTION_ADD ? CreateLoading : UpdateLoading}
					handleSubmit={handleSubmit}
					Type={showSquadModal === FUNCTION_ADD ? MODAL_TYPE_ADD : MODAL_TYPE_UPDATE}
					setValue={setValue}
				/>
			) : null}

			{showDeleteModal ? (
				<DeleteConfigurationModal
					showModal={showDeleteModal}
					setShowModal={setShowDeleteModal}
					onClickButton={deleteSquad}
					loading={deleteLoading}
					label={ADD_BUTTON_LABEL}
				/>
			) : null}
		</div>
	);
}

export default Squad;
