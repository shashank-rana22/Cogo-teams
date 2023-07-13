import { Button, Modal, MultiSelect, SingleDateRange } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useLedgerDownload from '../../../../hooks/useLedgerDownload';

import styles from './styles.module.css';

const ENTITY_OPTIONS = Object.keys(GLOBAL_CONSTANTS.cogoport_entities).map((entity) => ({
	label : entity,
	value : String(entity),
}));

function DownloadLedgerModal({ showLedgerModal = false, setShowLedgerModal = () => {}, item = {} }) {
	const [date, setDate] = useState(null);
	const [entities, setEntites] = useState([]);

	const { downloadLedger, loading } = useLedgerDownload({
		date,
		entities,
		item,
		setShowLedgerModal,
	});

	const handleClick = () => {
		downloadLedger();
	};
	const isEnabled = date?.startDate && date?.endDate && !isEmpty(entities)
	&& !loading;

	return (
		<div>
			<Modal size="md" show={showLedgerModal} onClose={() => setShowLedgerModal(false)}>
				<Modal.Header title="Download Ledger" />
				<Modal.Body>
					<div className={styles.container}>
						<div>
							<h5>Date Range*</h5>
							<SingleDateRange
								placeholder="Select Date Range"
								dateFormat="dd/MM/yyyy"
								name="date"
								onChange={setDate}
								value={date}
								style={{ width: '80%' }}
								isPreviousDaysAllowed
							/>

						</div>
						<div>
							<h5>Entity*</h5>
							<MultiSelect
								value={entities}
								onChange={setEntites}
								placeholder="Select Entity"
								options={ENTITY_OPTIONS}
								isClearable
								style={{ width: '250px' }}
								prefix={() => {}}
							/>

						</div>
					</div>
					<div className={styles.download}>
						<Button onClick={handleClick} disabled={!isEnabled}>
							Download
							<IcMDownload className={styles.download_icon} />
						</Button>
					</div>
				</Modal.Body>
			</Modal>

		</div>
	);
}

export default DownloadLedgerModal;
