import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { ALL_STEPPER_CONFIGS_OBJ } from '../../utils/stepperConfigs';
import Accordion from '../Accordion';

import styles from './styles.module.css';

function PopContent({
	setVisible = () => {},
	selectedFiles = new Set(),
	docItem = {},
	setInitFormattedData = () => {},
	visible = '',
	setSelectedFiles = () => {},
}) {
	const [checkRadio, setCheckRadio] = useState('');
	const handleMove = () => {
		const fromKey = docItem.key;
		const toKey = checkRadio;
		const finalFiles = Array.from(selectedFiles);

		setInitFormattedData((prev) => {
			const { fromArray, toArray } = prev[fromKey].reduce(
				(acc, item) => {
					if (finalFiles.includes(item.id)) {
						acc.toArray.push(item);
					} else {
						acc.fromArray.push(item);
					}
					return acc;
				},
				{ fromArray: [], toArray: [] },
			);
			return {
				...prev,
				[fromKey] : fromArray,
				[toKey]   : [...(prev[toKey] || []), ...toArray],
			};
		});
		setSelectedFiles(new Set());
		setVisible(false);
	};

	return (
		<div>
			<div style={{ maxHeight: '500px', overflow: 'auto' }}>
				{Object.entries(ALL_STEPPER_CONFIGS_OBJ).map(([key, value]) => (
					<Accordion
						key={key}
						header={key}
						keyOptions={value}
						checkRadio={checkRadio}
						setCheckRadio={setCheckRadio}
						visible={visible}
						docItem={docItem}
					/>
				))}
			</div>

			<div className={styles.button_pop}>
				<Button
					themeType="secondary"
					size="sm"
					style={{ marginRight: '10px' }}
					onClick={() => setVisible(false)}
				>
					Cancel
				</Button>
				<Button
					themeType="accent"
					size="sm"
					onClick={handleMove}
					disabled={isEmpty(selectedFiles.size) || isEmpty(checkRadio)}
				>
					Move
				</Button>
			</div>
		</div>
	);
}

export default PopContent;
