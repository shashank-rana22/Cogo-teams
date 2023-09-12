import { Button, Modal, Popover, Pagination } from '@cogoport/components';
import { IcMEyeopen, IcMFilter, IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import LeadTable from '../../commons/LeadTable';
// import log_controls from '../../configurations/log-controls';
import useGetLogs from '../../hooks/useGetLogs';

import getEnrichmentColumns from './getLogsColumns';
import PanLogs from './PanLogs';
import styles from './styles.module.css';

function Logs() {
	const [logId, setLogId] = useState(null);
	const [open, setOpen] = useState(false);
	const columns = getEnrichmentColumns({ setLogId });

	const {
		// loading,
		response,
		// control,
		// handleClick,
		// handleSubmit,
		reset,
		params,
		setParams,
	} = useGetLogs();

	const onClose = () => {
		setLogId(null);
	};

	const onClickOutside = () => {
		setOpen(false);
	};

	const onClickReset = () => {
		reset();
	};

	const onPageChange = (newPage) => {
		setParams({ ...params, page: newPage });
	};

	return (
		<div className={styles.container}>
			<div>
				<Popover
					interactive
					placement="bottom"
					visible={open}
					caret={false}
					onClickOutside={onClickOutside}
					render={open ? (
						'some filters here'
					) : null}
				>
					<div className={styles.filters}>
						<Button themeType="secondary" onClick={() => setOpen(!open)}>
							<IcMFilter className={styles.icmFilter} />
							Filters
						</Button>
						<Button themeType="secondary" onClick={onClickReset}>
							<IcMRefresh />
						</Button>
					</div>
				</Popover>
			</div>
			<div className={styles.logContainer}>

				<LeadTable columns={columns} data={response} loading={false} />

				<div className={styles.pagination}>
					<Pagination
						type="number"
						currentPage={params?.page}
						totalItems={1000}
						pageSize={params?.page_limit}
						onPageChange={onPageChange}
					/>
				</div>

				<Modal style={{ width: '70%' }} show={!isEmpty(logId)} onClose={onClose} placement="center">
					<Modal.Header title={(
						<>
							<IcMEyeopen className={styles.eye_icon} />
							<span>
								View Accounts
							</span>
						</>
					)}
					/>
					<Modal.Body className={styles.modal_body}>
						<PanLogs />
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={onClose}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
}

export default Logs;
