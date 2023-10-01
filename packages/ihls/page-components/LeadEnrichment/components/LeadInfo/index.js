import { Button, Pagination, Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../commons/EmptyState';
import LeadTable from '../../commons/LeadTable';
import ActionModal from '../ActionModal';

import getLeadInfoColumns from './getLeadInfoColumns';
import LeadEnrichmentLogs from './LeadEnrichmentLogs';
import ObjectiveInfo from './ObjectiveInfo';
import styles from './styles.module.css';

function LeadInfo({
	response = [],
	loading = false,
	paginationData = {},
	selectAll = false,
	params = {},
	checkedRowsId = [],
	setParams = () => {},
	onChangeTableHeadCheckbox = () => {},
	onChangeBodyCheckbox = () => {},
}) {
	const [showRequestModal, setShowRequestModal] = useState('');
	const [visible, setVisible] = useState(false);
	const [leadId, setLeadId] = useState(null);
	const [allocationLeadId, setAllocationLeadId] = useState(null);
	const columns = getLeadInfoColumns({
		selectAll,
		onChangeTableHeadCheckbox,
		checkedRowsId,
		onChangeBodyCheckbox,
		setLeadId,
		setAllocationLeadId,
	});

	const onPageChange = (pageNumber) => setParams((p) => ({ ...p, page: pageNumber }));

	if (!loading && isEmpty(response)) {
		return (
			<div className={styles.container}>
				<EmptyState height={350} width={520} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.triggerButtons}>
				<Popover
					onClickOutside={() => setVisible(false)}
					placement="bottom"
					caret={false}
					render={(
						<>
							<Button
								className={styles.popover_buttons}
								size="md"
								themeType="primary"
								onClick={() => { setShowRequestModal('enrichment'); setVisible(false); }}
							>
								Send to Enrichment

							</Button>
							<Button
								className={styles.popover_buttons}
								size="md"
								themeType="primary"
								onClick={() => { setShowRequestModal('ingestion'); setVisible(false); }}
							>
								Push to CRM

							</Button>

						</>
					)}
					visible={visible}
				>
					<Button themeType="secondary" onClick={() => setVisible(!visible)}>Action</Button>
				</Popover>
			</div>

			<LeadTable columns={columns} data={response} loading={loading} />

			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={paginationData.page}
					totalItems={paginationData.count}
					pageSize={10}
					onPageChange={onPageChange}
				/>
			</div>

			{allocationLeadId ? (
				<ObjectiveInfo
					allocationLeadId={allocationLeadId}
					setAllocationLeadId={setAllocationLeadId}
				/>
			) : null}

			{leadId ? <LeadEnrichmentLogs leadId={leadId} setLeadId={setLeadId} /> : null}

			<ActionModal
				checkedRowsId={checkedRowsId}
				params={params}
				showModal={showRequestModal}
				setShowRequestModal={setShowRequestModal}
				lead_count={paginationData.count}
			/>
		</div>
	);
}

export default LeadInfo;
