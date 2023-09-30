import { Button, Pagination, Popover } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../commons/EmptyState';
import LeadTable from '../../commons/LeadTable';
import EnrichmentRequestModal from '../EnrichmentRequestModal';
import LeadEnrichmentLogs from '../LeadEnrichmentLogs';
import ObjectiveInfo from '../ObjectiveInfo';
import PustToCrm from '../PushToCrm';

import getLeadInfoColumns from './getLeadInfoColumns';
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
	const [showModal, setShowModal] = useState('');
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

	const onCloseModal = () => setShowModal(null);

	function ActionComponent() {
		if (showModal === 'enrichment') {
			return (
				<EnrichmentRequestModal
					checkedRowsId={checkedRowsId}
					params={params}
					showRequest={showModal === 'enrichment'}
					onCloseModal={onCloseModal}
					lead_count={paginationData.count}
				/>
			);
		}

		if (showModal === 'ingestion') {
			return (
				<PustToCrm
					checkedRowsId={checkedRowsId}
					params={params}
					showRequest={showModal === 'ingestion'}
					onCloseModal={onCloseModal}
					lead_count={paginationData.count}
				/>
			);
		}

		return null;
	}

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
								onClick={() => { setShowModal('enrichment'); setVisible(false); }}
							>
								Send to Enrichment

							</Button>
							<Button
								className={styles.popover_buttons}
								size="md"
								themeType="primary"
								onClick={() => { setShowModal('ingestion'); setVisible(false); }}
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

			<ActionComponent />
		</div>
	);
}

export default LeadInfo;
