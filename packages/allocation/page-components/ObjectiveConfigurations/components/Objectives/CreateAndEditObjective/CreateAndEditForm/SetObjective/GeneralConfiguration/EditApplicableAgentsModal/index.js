import { Button, Modal, Pagination, Table } from '@cogoport/components';

import SearchInput from '../../../../../../../../../common/SearchInput';

import getListColumns from './get-list-columns';
import styles from './styles.module.css';
import useEditApplicableAgents from './useEditApplicableAgents';

function EditApplicableAgentsModal(props) {
	const { showEditAgents, setShowEditAgents, roles } = props;

	const {
		list,
		loading,
		getNextPage,
		paginationData,
		debounceQuery,
		searchValue,
		setSearchValue,
	} = useEditApplicableAgents({ roles });

	const { LIST_COLUMNS } = getListColumns();

	const { page = 1, total_count = 0, page_limit = 10 } = paginationData || {};

	return (
		<Modal
			size="md"
			show={showEditAgents}
			onClose={() => setShowEditAgents(false)}
			showCloseIcon
			animate
		>
			<Modal.Header title={<h4 className={styles.title}>Edit Applicable Agents</h4>} />

			<Modal.Body>
				<p className={styles.description}>
					Select from Agents for whom this objective will be applied.
					By default All agents in the Selected Role will be selected. You may edit it from here.
				</p>

				<SearchInput
					size="md"
					placeholder="Search by Agent"
					value={searchValue}
					setGlobalSearch={setSearchValue}
					debounceQuery={debounceQuery}
				/>

				<Table columns={LIST_COLUMNS} data={list} loading={loading} />

				<div className={styles.pagination_container}>
					<Pagination
						type="compact"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={getNextPage}
					/>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					themeType="tertiary"
					style={{ marginRight: '8px' }}
					onClick={() => setShowEditAgents(false)}
				>
					Cancel
				</Button>

				<Button
					type="button"
					themeType="accent"
				>
					Apply Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditApplicableAgentsModal;
