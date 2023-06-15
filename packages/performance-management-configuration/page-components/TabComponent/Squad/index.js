import { Pagination } from '@cogoport/components';

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

function Squad() {
	const {
		search, setSearch, columns, loading:listApiLoading, data, page, setPage, setShowDeleteModal,
		showDeleteModal, deleteSquad, deleteLoading, fetchList, setShowUpdateSquadModal, showUpdateSquadModal,
	} = useSquad();

	const { list = [], ...paginationData } = data || {};

	const { total_count, page_limit } = paginationData || {};

	const {
		showAddSquadModal,
		setShowAddSquadModal,
		control :CreateControl,
		errors: CreateErrors,
		onClickSubmitButton,
		loading:CreateLoading,
		handleSubmit:CreateHandleSubmit,
	} = useCreateSquad({ fetchList });

	const {
		control: UpdateControl,
		errors: UpdateErrors,
		onClickUpdateButton,
		loading: UpdateLoading,
		handleSubmit: UpdateHandleSubmit,
		setValue,
	} = useUpdateSquad({ fetchList, setShowUpdateSquadModal, showUpdateSquadModal });

	const onClickAddButton = () => {
		setShowAddSquadModal(true);
	};

	return (
		<div>
			<Header
				search={search}
				setSearch={setSearch}
				label={ADD_BUTTON_LABEL}
				onClickAddButton={onClickAddButton}
			/>

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

			{showAddSquadModal ? (
				<CreateConfigurationModal
					showModal={showAddSquadModal}
					setShowModal={setShowAddSquadModal}
					label={ADD_BUTTON_LABEL}
					controls={controls}
					control={CreateControl}
					errors={CreateErrors}
					onClickSubmitButton={onClickSubmitButton}
					loading={CreateLoading}
					handleSubmit={CreateHandleSubmit}
					Type={MODAL_TYPE_ADD}
				/>
			) : null}

			{showUpdateSquadModal ? (
				<CreateConfigurationModal
					showModal={showUpdateSquadModal}
					setShowModal={setShowUpdateSquadModal}
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
					onClickButton={deleteSquad}
					loading={deleteLoading}
					label={ADD_BUTTON_LABEL}
				/>
			) : null}
		</div>
	);
}

export default Squad;
