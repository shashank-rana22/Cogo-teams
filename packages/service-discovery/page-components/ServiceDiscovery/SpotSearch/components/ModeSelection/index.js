import React from 'react';

import MODES from '../../configurations/modes.json';

import ModeItem from './ModeItem';
import styles from './styles.module.css';

function ModeSelection({
	selectedMode = {},
	setSelectedMode = () => {},
	setSelectedService = () => {},
	setLocation = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Pick from Logistics Services</div>

			<div className={styles.modes_container}>
				{MODES.map((mode_item) => (
					<ModeItem
						data={mode_item}
						key={mode_item.value}
						selectedMode={selectedMode}
						setSelectedMode={setSelectedMode}
						setSelectedService={setSelectedService}
						setLocation={setLocation}
					/>
				))}
			</div>
		</div>
	);
}

export default ModeSelection;