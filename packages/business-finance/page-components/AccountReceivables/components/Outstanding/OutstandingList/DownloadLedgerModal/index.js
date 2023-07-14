import { Button, Modal, MultiSelect, SingleDateRange } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useLedgerDownload from '../../../../hooks/useLedgerDownload';

import styles from './styles.module.css';

const CHECK_SINGLE_VALUE = 1;

const ALL_ENTITIES = Object.keys(GLOBAL_CONSTANTS.cogoport_entities).map((entity) => ({
	label : `(${entity})${GLOBAL_CONSTANTS.cogoport_entities[entity].name}`,
	value : String(entity),
}));

function DownloadLedgerModal({ showLedgerModal = false, setShowLedgerModal, item = {} }) {
	const [date, setDate] = useState(null);
	const [entities, setEntites] = useState([]);
	const [entityOptions, setEntityOptions] = useState(ALL_ENTITIES);

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

	useEffect(() => {
		// functionality to select the combination of 101 & 301 only
		if (entities?.length === CHECK_SINGLE_VALUE) {
			const allowedEntites = ALL_ENTITIES
				.filter((singleEntity) => {
					const selectedCountryCode = GLOBAL_CONSTANTS.cogoport_entities[entities].country_code;
					const singleEntityValue = singleEntity?.value;
					const singleCountryCode = GLOBAL_CONSTANTS.cogoport_entities[+singleEntityValue].country_code;
					return singleCountryCode === selectedCountryCode;
				});
			setEntityOptions([...allowedEntites]);
		}
		if (isEmpty(entities)) {
			setEntityOptions([...ALL_ENTITIES]);
		}
	}, [entities]);

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
								options={entityOptions}
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
