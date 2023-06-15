import { Pagination } from '@cogoport/components';

import Header from '../../../commons/CommonHeader';
import CreateConfigurationModal from '../../../commons/CreateConfigurationModal';
import PACKAGE_CONSTANTS from '../../../commons/packageConstants';
import StyledTable from '../../../commons/StyledTable';

import controls from './controls';
import styles from './styles.module.css';
import useCreateSquad from './useCreateSquad';
import useSquad from './useSquad';

const ADD_BUTTON_LABEL = 'Squad';
const TABLE_EMPTY_TEXT = 'No Squad created yet';

function Squad() {
	const {
		search, setSearch, columns, loading:listApiLoading, data, page, setPage, fetchList,
	} = useSquad();

	const { list = [], ...paginationData } = data || {};

	const { total_count, page_limit } = paginationData || {};

	const {
		showAddSquadModal, setShowAddSquadModal, control, errors,
		onClickSubmitButton,
		loading,
		handleSubmit,
	} = useCreateSquad({ fetchList });

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

export default Squad;
