import { Button, DateRangepicker, Modal, MultiSelect, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useLedgerDownload from '../../../../../hooks/useLedgerDownload';

import styles from './styles.module.css';

const CHECK_SINGLE_VALUE = 1;

const ALL_ENTITIES = Object.keys(GLOBAL_CONSTANTS.cogoport_entities).map((entity) => ({
	label : `(${entity})${GLOBAL_CONSTANTS.cogoport_entities[entity].name}`,
	value : String(entity),
}));

function DownloadLedgerModal({ showLedgerModal = false, setShowLedgerModal = () => {}, item = {} }) {
	const [date, setDate] = useState({ startDate: null, endDate: new Date() });
	const [entities, setEntites] = useState([]);
	const [entityOptions, setEntityOptions] = useState(ALL_ENTITIES);

	const { downloadLedger, loading } = useLedgerDownload({
		date,
		entities,
		item,
		setShowLedgerModal,
	});

	const handleClick = () => {
		if (date?.startDate > date?.endDate) {
			Toast.error('Please select a Start Date that is earlier than the End Date');
			return;
		}
		downloadLedger();
	};
	const isEnabled = date?.startDate && date?.endDate && !isEmpty(entities)
		&& !loading;

	useEffect(() => {
		// functionality to select the entity combination of same country only
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

	const dateChangeHandler = (curr) => {
		setDate((prev) => ({
			...prev, startDate: curr?.startDate, endDate: (curr?.endDate === null) ? prev?.endDate : curr?.endDate,
		}));
	};

	return (
		<div>
			<Modal
				size="md"
				show={showLedgerModal}
				onClose={() => setShowLedgerModal(false)}
				className={styles.modal}
			>
				<Modal.Header title="Download Ledger" />
				<Modal.Body>
					<div className={styles.container}>
						<div className={styles.date}>
							<h5>Date Range*</h5>

							<DateRangepicker
								placeholder="Select Date Range"
								dateFormat="dd/MM/yyyy"
								name="date"
								onChange={dateChangeHandler}
								value={date}
								style={{ width: '100%' }}
								isPreviousDaysAllowed
								maxDate={new Date()}
							/>
						</div>

						<div className={styles.date}>
							<h5>Entity*</h5>

							<MultiSelect
								value={entities}
								onChange={setEntites}
								placeholder="Select Entity"
								options={entityOptions}
								isClearable
								style={{ width: '95%' }}
								prefix={() => {}}
							/>

						</div>
					</div>
					<div className={styles.download}>
						<Button onClick={handleClick} disabled={!isEnabled}>
							Download
						</Button>
					</div>
				</Modal.Body>
			</Modal>

		</div>
	);
}

export default DownloadLedgerModal;
