import { Pill } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function ModeItem({ data = {}, selectedMode = {}, setSelectedMode, setSelectedService, setLocation }) {
	const [bouncing, setBouncing] = useState(false);

	const { label, value, icon, is_available } = data;

	const handleClick = () => {
		if (!is_available) {
			setBouncing(true);

			setTimeout(() => {
				setBouncing(false);
			}, 1500);
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
					className={`${styles.icon} ${selectedMode.mode_value !== value && styles.icon_hover}`}
				/>
			</div>

			<div
				className={styles.label}
				style={{ fontWeight: selectedMode.mode_value === value ? 600 : 500 }}
			>
				{label}
			</div>

			{!is_available ? (
				<div
					className={`${styles.pill} ${bouncing ? styles.bounce : {}}`}
				>
					<Pill size="sm" color="yellow">Coming Soon</Pill>
				</div>
			) : null}
		</div>
	);
}

export default ModeItem;
