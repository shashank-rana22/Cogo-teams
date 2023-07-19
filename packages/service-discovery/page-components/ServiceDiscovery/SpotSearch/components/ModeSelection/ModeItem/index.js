import { Pill, cl } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

const SET_TIMEOUT_DURATION = 1500;
const MEDIUM_FONT_WEIGHT = 500;
const SEMIBOLD_FONT_WEIGHT = 600;

function ModeItem({
	data = {},
	selectedMode = {},
	setSelectedMode = () => {},
	setSelectedService = () => {},
	setLocation = () => {},
}) {
	const [bouncing, setBouncing] = useState(false);

	const { label, value, icon, is_available } = data;

	const handleClick = () => {
		if (!is_available) {
			setBouncing(true);

			setTimeout(() => {
				setBouncing(false);
			}, SET_TIMEOUT_DURATION);
			return;
		}
		if (selectedMode.mode_value === value) setSelectedMode({});
		else setSelectedMode({ mode_label: label, mode_value: value });
		setSelectedService(null);
		setLocation(null);
	};

	return (
		<div
			className={styles.mode_item}
			style={{
				background: selectedMode.mode_value === value ? '#FCDC00' : '#FFFFFF',
			}}
			key={value}
			onClick={handleClick}
			role="presentation"
		>
			<div className={styles.img_container}>
				{selectedMode.mode_value === value ? null : (
					<div className={styles.yellow_circle} />
				)}

				<img
					src={icon}
					width={34}
					height={34}
					alt="mode-icon"
					className={cl`${styles.icon} ${selectedMode.mode_value !== value && styles.icon_hover}`}
				/>
			</div>

			<div
				className={styles.label}
				style={{ fontWeight: selectedMode.mode_value === value ? SEMIBOLD_FONT_WEIGHT : MEDIUM_FONT_WEIGHT }}
			>
				{label}
			</div>

			{!is_available ? (
				<div
					className={cl`${styles.pill} ${bouncing ? styles.bounce : {}}`}
				>
					<Pill size="sm" color="yellow">Coming Soon</Pill>
				</div>
			) : null}
		</div>
	);
}

export default ModeItem;
