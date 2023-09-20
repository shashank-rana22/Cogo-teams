import { Button, Modal, Pagination, Popover } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../commons/EmptyState';
import LeadTable from '../../commons/LeadTable';
import EnrichmentRequestModal from '../EnrichmentRequestModal';
import LeadEnrichmentLogs from '../LeadEnrichmentLogs';
import ObjectiveInfo from '../ObjectiveInfo';

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
	const [showRequest, setShowRequest] = useState(false);
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

	const onClose = () => {
		setAllocationLeadId(null);
	};

	const onCloseLogs = () => {
		setLeadId(null);
	};

	const onCloseActions = () => {
		setVisible(false);
	};

	const onPageChange = (pageNumber) => {
		setParams((p) => ({ ...p, page: pageNumber }));
	};

	if (!loading && isEmpty(response)) {
		return (
			<div className={styles.container}>
				<EmptyState height={350} width={520} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.tableHeader}>
				<div className={styles.triggerButtons}>
					<Popover
						onClickOutside={() => onCloseActions()}
						placement="bottom"
						caret={false}
						render={(
							<>
								<Button
									className={styles.popover_buttons}
									size="md"
									themeType="primary"
									onClick={() => { setShowRequest(true); setVisible(false); }}
								>
									Send to Enrichment

								</Button>
								<Button
									className={styles.popover_buttons}
									size="md"
									themeType="primary"
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

			<Modal style={{ width: '70%' }} show={allocationLeadId} onClose={onClose} placement="center">
				<Modal.Header title={(
					<>
						<IcMEyeopen className={styles.eye_icon} />
						<span>
							View Objectives
						</span>
					</>
				)}
				/>
				<Modal.Body className={styles.modal_body}>
					<ObjectiveInfo allocationLeadId={allocationLeadId} />
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onClose}>Close</Button>
				</Modal.Footer>
			</Modal>
			{leadId
			&& (
				<Modal style={{ width: '60%' }} show={leadId} onClose={onCloseLogs} placement="center">
					<Modal.Header title={(
						<>
							<IcMEyeopen className={styles.eye_icon} />
							<span>
								Enrichment History
							</span>
						</>
					)}
					/>
					<Modal.Body>
						<LeadEnrichmentLogs lead_id={leadId} />
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={onCloseLogs}>Close</Button>
					</Modal.Footer>
				</Modal>
			)}

			<EnrichmentRequestModal
				checkedRowsId={checkedRowsId}
				params={params}
				showRequest={showRequest}
				setShowRequest={setShowRequest}
			/>

		</div>
	);
}

export default LeadInfo;
