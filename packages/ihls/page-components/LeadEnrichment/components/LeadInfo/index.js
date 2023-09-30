import { Button, Modal, Pagination, Popover } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
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
	const [showModal, setShowModal] = useState(null);
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

	const onClose = () => setAllocationLeadId(null);

	const onCloseLogs = () => setLeadId(null);

	const onPageChange = (pageNumber) => setParams((p) => ({ ...p, page: pageNumber }));

	const onCloseModal = () => setShowModal(null);

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

			{allocationLeadId

				? (
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
				) : null}
			{leadId
				? (
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
				) : null}

			<EnrichmentRequestModal
				checkedRowsId={checkedRowsId}
				params={params}
				showRequest={showModal === 'enrichment'}
				onCloseModal={onCloseModal}
				lead_count={paginationData.count}
			/>

			<PustToCrm
				checkedRowsId={checkedRowsId}
				params={params}
				showRequest={showModal === 'ingestion'}
				onCloseModal={onCloseModal}
				lead_count={paginationData.count}
			/>

		</div>
	);
}

export default LeadInfo;
