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
import useCreateTribe from './useCreateTribe';
import useTribe from './useTribe';
import useUpdateTribe from './useUpdateTribe';

const ADD_BUTTON_LABEL = 'Tribe';
const TABLE_EMPTY_TEXT = 'No Tribe created yet';
const MODAL_TYPE_UPDATE = 'Update';
const MODAL_TYPE_ADD = 'Add';

function Tribe() {
	const { control, formState: { errors }, handleSubmit, setValue } = useForm();

	const {
		search, setSearch, columns, loading:listApiLoading, data, page, setPage, fetchList, showDeleteModal,
		setShowDeleteModal, deleteLoading, deleteTribe, setShowUpdateTribeModal, showUpdateTribeModal,
		activeTab, setActiveTab,
	} = useTribe();

	const { list = [], ...paginationData } = data || {};

	const { total_count, page_limit } = paginationData || {};

	const {
		showAddTribeModal,
		setShowAddTribeModal,
		onClickSubmitButton,
		loading:CreateLoading,
	} = useCreateTribe({ fetchList });

	const {
		onClickUpdateButton,
		loading: UpdateLoading,
	} = useUpdateTribe({ fetchList, setShowUpdateTribeModal, showUpdateTribeModal });

	const onClickAddButton = () => {
		setShowAddTribeModal(true);
	};

	return (
		<div className={styles.container}>

			<ActiveInactiveTabs activeTab={activeTab} setActiveTab={setActiveTab} />

			<Header
				setSearch={setSearch}
				search={search}
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

			{showAddTribeModal ? (
				<CreateConfigurationModal
					showModal={showAddTribeModal}
					setShowModal={setShowAddTribeModal}
					label={ADD_BUTTON_LABEL}
					controls={controls}
					control={control}
					errors={errors}
					onClickSubmitButton={onClickSubmitButton}
					loading={CreateLoading}
					handleSubmit={handleSubmit}
					Type={MODAL_TYPE_ADD}
				/>
			) : null}

			{showUpdateTribeModal ? (
				<CreateConfigurationModal
					showModal={showUpdateTribeModal}
					setShowModal={setShowUpdateTribeModal}
					label={ADD_BUTTON_LABEL}
					controls={controls}
					control={control}
					errors={errors}
					onClickSubmitButton={onClickUpdateButton}
					loading={UpdateLoading}
					handleSubmit={handleSubmit}
					Type={MODAL_TYPE_UPDATE}
					setValue={setValue}
				/>
			) : null}

			{showDeleteModal ? (
				<DeleteConfigurationModal
					showModal={showDeleteModal}
					setShowModal={setShowDeleteModal}
					onClickButton={deleteTribe}
					loading={deleteLoading}
					label={ADD_BUTTON_LABEL}
				/>
			) : null}
		</div>
	);
}

export default Tribe;
