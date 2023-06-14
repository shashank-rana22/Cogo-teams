import { Pagination } from '@cogoport/components';

import AddSquadTribeModal from '../../../commons/AddSquadTribeModal';
import Header from '../../../commons/CommonHeader';
import PACKAGE_CONSTANTS from '../../../commons/packageConstants';
import StyledTable from '../../../commons/StyledTable';

import controls from './controls';
import styles from './styles.module.css';
import useCreateTribe from './useCreateTribe';
import useTribe from './useTribe';

const ADD_BUTTON_LABEL = 'Tribe';
const TABLE_EMPTY_TEXT = 'No Tribe created yet';

function Tribe() {
	const { search, setSearch, columns, loading:listApiLoading, data, page, setPage } = useTribe();

	const { list = [], ...paginationData } = data || {};

	const { total_count, page_limit } = paginationData || {};

	const {
		showAddTribeModal,
		setShowAddTribeModal,
		control,
		errors,
		handleSubmit,
		onClickSubmitButton,
		loading,
	} = useCreateTribe();

	const onClickAddButton = () => {
		setShowAddTribeModal(true);
	};

	return (
		<div className={styles.container}>
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

			{
				showAddTribeModal ? (
					<AddSquadTribeModal
						showModal={showAddTribeModal}
						setShowModal={setShowAddTribeModal}
						label={ADD_BUTTON_LABEL}
						controls={controls}
						control={control}
						errors={errors}
						handleSubmit={handleSubmit}
						onClickSubmitButton={onClickSubmitButton}
						loading={loading}
					/>
				) : null
			}
		</div>
	);
}

export default Tribe;
