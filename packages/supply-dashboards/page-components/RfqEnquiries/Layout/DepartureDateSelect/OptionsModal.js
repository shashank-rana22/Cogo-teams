import { Modal, Button, Chips } from '@cogoport/components';
import { isSameDay } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import createOptions from './createOptions';
import styles from './styles.module.css';

const INITIAL_WEEK = 0;
const INCREMENT_AMOUNT = 1;

function ModalContent({
	show, onClose, isMobile, datePair, multiSelected, setMultiSelected, onChange,
}) {
	const [currentWeek, setCurrentWeek] = useState(INITIAL_WEEK);
	const [allOptions, setAllOptions] = useState(createOptions(datePair));
	const options = allOptions[currentWeek];

	const handleSave = () => {
		if (multiSelected) {
			onChange(multiSelected);
			onClose();
		}
	};

	useEffect(() => {
		setAllOptions(createOptions(datePair));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(datePair)]);

	return (
		<Modal show={show} onClose={onClose} fullscreen={isMobile} width="60%" styles={{ marginLeft: '4px' }}>
			<div style={{ padding: '10px' }}>
				<div className={styles.heading}>Please tell us the departure dates</div>
				<div className={styles.container}>
					{allOptions.map((week, i) => {
						const weekValues = week.filter((item) => (
							!!(multiSelected || []).filter((element) => isSameDay(element, item.key))
								.length
						));

						return (
							<div
								role="presentation"
								key={week[INITIAL_WEEK]?.key}
								className={weekValues.length ? styles.item_active : styles.item_inactive}
								onClick={() => setCurrentWeek(i)}
							>
								{`Week ${i + INCREMENT_AMOUNT}`}
								{(!!weekValues.length && <> &#10003;</>) || ''}
							</div>
						);
					})}
				</div>
				<div className={styles.date}>
					Select Dates
					<div className={styles.divider} />
					<div>
						<Chips
							id={currentWeek}
							items={options}
							enableMultiSelect
							selectedItems={multiSelected}
							onItemChange={setMultiSelected}
							size="md"
							style={{ flexWrap: 'wrap' }}
						/>

					</div>

				</div>
				<div className={styles.button}>
					<div className={styles.info}>
						{`${(multiSelected || []).length} date selected from ${allOptions.length} weeks`}
					</div>
					<Button onClick={handleSave}>Save</Button>
				</div>

			</div>

		</Modal>

	);
}

export default ModalContent;
