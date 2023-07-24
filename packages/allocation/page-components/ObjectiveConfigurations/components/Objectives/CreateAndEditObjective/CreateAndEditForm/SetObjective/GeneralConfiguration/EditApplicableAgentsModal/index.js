import { Button, Modal, Pagination, RadioGroup, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import SearchInput from '../../../../../../../../../common/SearchInput';
import EDIT_AGENTS_RADIO_OPTIONS from '../../../../../../../configurations/edit-agent-select-type-radio-options';
import SELECT_AGENTS_KEYS_MAPPING from '../../../../../../../constants/select-agents-keys-mapping';

import getListColumns from './get-list-columns';
import styles from './styles.module.css';
import useEditApplicableAgents from './useEditApplicableAgents';

const { SELECT_ALL } = SELECT_AGENTS_KEYS_MAPPING;

function EditApplicableAgentsModal(props) {
	const { showEditAgentsModal, setShowEditAgentsModal, watchRoles, formValues, setFormValues } = props;

	const {
		list,
		loading,
		getNextPage,
		paginationData,
		debounceQuery,
		searchValue,
		setSearchValue,
		selectMode,
		setSelectMode,
		selectedAgentIds,
		setSelectedAgentIds,
		onApplyChanges,
	} = useEditApplicableAgents({ watchRoles, formValues, setFormValues, setShowEditAgentsModal });

	const { LIST_COLUMNS } = getListColumns({ selectMode, selectedAgentIds, setSelectedAgentIds });

	const { page = 1, total_count = 0, page_limit = 10 } = paginationData || {};

	return (
		<Modal
			size="lg"
			show={showEditAgentsModal}
			onClose={() => setShowEditAgentsModal(false)}
			showCloseIcon
			animate
		>
			<Modal.Header title={<h4 className={styles.title}>Edit Applicable Agents</h4>} />

			<Modal.Body>
				<p className={styles.description}>
					Select from Agents for whom this objective will be applied.
					By default All agents in the Selected Role will be selected. You may edit it from here.
				</p>

				<RadioGroup
					className={styles.radio_group}
					options={EDIT_AGENTS_RADIO_OPTIONS}
					value={selectMode}
					onChange={setSelectMode}
				/>

				<SearchInput
					size="md"
					placeholder="Search by Agent"
					value={searchValue}
					setGlobalSearch={setSearchValue}
					debounceQuery={debounceQuery}
				/>

				<Table
					className={styles.table}
					columns={LIST_COLUMNS}
					data={list}
					loading={loading}
				/>

				<div className={styles.pagination_container}>
					<Pagination
						type="table"
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
					onClick={() => setShowEditAgentsModal(false)}
				>
					Cancel
				</Button>

				<Button
					type="button"
					themeType="accent"
					onClick={onApplyChanges}
					disabled={loading || (selectMode !== SELECT_ALL && isEmpty(selectedAgentIds))}
				>
					Apply Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditApplicableAgentsModal;
