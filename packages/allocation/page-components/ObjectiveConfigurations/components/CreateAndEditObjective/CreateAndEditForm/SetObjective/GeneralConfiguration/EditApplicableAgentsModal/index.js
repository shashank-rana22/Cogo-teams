import { Button, Modal, Pagination, RadioGroup, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import AsyncSelect from '../../../../../../../../common/Form/components/Business/AsyncSelect';
import SearchInput from '../../../../../../../../common/SearchInput';
import getEditAgentRadioOptions from '../../../../../../configurations/edit-agent-select-type-radio-options';
import SELECT_AGENTS_KEYS_MAPPING from '../../../../../../constants/select-agents-keys-mapping';

import getListColumns from './get-list-columns';
import styles from './styles.module.css';
import useEditApplicableAgents from './useEditApplicableAgents';

const { SELECT_ALL } = SELECT_AGENTS_KEYS_MAPPING;

function EditApplicableAgentsModal(props) {
	const { t } = useTranslation(['allocation']);

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
		selectedRmIds,
		setSelectedRmIds,
	} = useEditApplicableAgents({ watchRoles, formValues, setFormValues, setShowEditAgentsModal });

	const { LIST_COLUMNS } = getListColumns({ selectMode, selectedAgentIds, setSelectedAgentIds, t });

	const editAgnetRadioOptions = getEditAgentRadioOptions({ t });

	const { page = 1, total_count = 0, page_limit = 10 } = paginationData || {};

	return (
		<Modal
			size="lg"
			show={showEditAgentsModal}
			onClose={() => setShowEditAgentsModal(false)}
			showCloseIcon
			animate
		>
			<Modal.Header title={<h4 className={styles.title}>{t('allocation:edit_applicable_agents_title')}</h4>} />

			<Modal.Body>
				<p className={styles.description}>
					{t('allocation:select_agents_description')}
				</p>

				<p><b>{t('allocation:note_blocked_agents')}</b></p>

				<RadioGroup
					className={styles.radio_group}
					options={editAgnetRadioOptions}
					value={selectMode}
					onChange={setSelectMode}
				/>

				<div className={styles.filters}>
					<div className={styles.control_container}>
						<SearchInput
							size="md"
							placeholder={t('allocation:search_agent_placeholder')}
							value={searchValue}
							setGlobalSearch={setSearchValue}
							debounceQuery={debounceQuery}
						/>
					</div>

					<div className={styles.control_container}>
						<AsyncSelect
							placeholder={t('allocation:select_reporting_manager_placeholder')}
							asyncKey="partner_users"
							valueKey="user_id"
							intialCall
							multiple
							isClearable
							params={{ page_limt: 20, filters: { partner_entity_types: ['cogoport'] } }}
							value={selectedRmIds}
							onChange={setSelectedRmIds}
						/>
					</div>
				</div>

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
					{t('allocation:cancel_button')}
				</Button>

				<Button
					type="button"
					themeType="accent"
					onClick={onApplyChanges}
					disabled={loading || (selectMode !== SELECT_ALL && isEmpty(selectedAgentIds))}
				>
					{t('allocation:apply_changes_button')}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditApplicableAgentsModal;
