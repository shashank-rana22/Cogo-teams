import { Button, Input, Modal, Pagination } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../commons/EmptyState';
import LeadTable from '../../commons/LeadTable';
import EnrichmentInfo from '../EnrichmentLogs';
import ObjectiveInfo from '../ObjectiveInfo';

import getEnrichmentColumns from './getEnrichmentColumns';
import styles from './styles.module.css';

function LeadInfo({
	response = [], loading = false,
	paginationData = {},
	selectAll = false,
	setParams = () => {},
	onChangeTableHeadCheckbox = () => {},
	checkedRowsId = () => {},
	onChangeBodyCheckbox = () => {},
}) {
	const [leadId, setLeadId] = useState(null);
	const [objectiveLeadId, setObjectiveLeadId] = useState(null);
	const columns = getEnrichmentColumns({
		selectAll,
		onChangeTableHeadCheckbox,
		checkedRowsId,
		onChangeBodyCheckbox,
		setLeadId,
		setObjectiveLeadId,
	});

	const onClose = () => {
		setObjectiveLeadId(null);
	};

	const onCloseLogs = () => {
		setLeadId(null);
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
				<div className={styles.select}>
					<div className={styles.inputName}>
						Select first
					</div>
					<div className={styles.inputNum}>
						<Input size="sm" placeholder="00" type="number" />
						<Button size="md" themeType="accent">Ok</Button>
					</div>
				</div>
				<div className={styles.triggerButtons}>
					<Button size="md" themeType="primary">Send to Enrichment</Button>
					<Button size="md" themeType="primary">Send to Bounce Check</Button>
				</div>
			</div>

			<LeadTable columns={columns} data={response} loading={loading} />

			<div className={styles.pagination}>
				<Pagination
					type="number"
					currentPage={paginationData.page}
					totalItems={paginationData.count}
					pageSize={10}
					onPageChange={onPageChange}
				/>
			</div>

			<Modal style={{ width: '70%' }} show={objectiveLeadId} onClose={onClose} placement="center">
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
					<ObjectiveInfo objectiveLeadId={objectiveLeadId} />
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onClose}>Close</Button>
				</Modal.Footer>
			</Modal>
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
					<EnrichmentInfo />
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onCloseLogs}>Close</Button>
				</Modal.Footer>
			</Modal>

		</div>
	);
}

export default LeadInfo;
