import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

const SET_TIMEOUT_DURATION = 1500;
const MEDIUM_FONT_WEIGHT = 500;
const SEMIBOLD_FONT_WEIGHT = 600;

function ServiceItem({ data = {}, selectedService, setSelectedService, setSelectedMode }) {
	const [bouncing, setBouncing] = useState(false);

	const { label, value, icon: Icon, is_available } = data;

	const handleClick = () => {
		if (!is_available) {
			setBouncing(true);

			setTimeout(() => {
				setBouncing(false);
			}, SET_TIMEOUT_DURATION);
			return;
		}
		if (selectedService?.mode_value === value) setSelectedService(null);
		else setSelectedService({ mode_label: startCase(value), mode_value: value });
		setSelectedMode({});
	};

	return (
		<div
			className={`${styles.container} 
			${selectedService?.mode_value !== value && is_available && styles.top_border}`}
			style={{
				background: selectedService?.mode_value === value ? '#FCDC00' : '#FFFFFF',
			}}
			key={value}
			onClick={handleClick}
			role="presentation"
		>
			<div className={styles.img_container}>

				{selectedService?.mode_value === value ? null : (
					<div className={`${styles.yellow_circle}`} />
				)}

				<Icon
					className={`${styles.icon} ${selectedService?.mode_value !== value && styles.icon_hover}`}
				/>
			</div>
			<div
				className={styles.label}
				style={{
					fontWeight: selectedService?.mode_value === value
						? SEMIBOLD_FONT_WEIGHT : MEDIUM_FONT_WEIGHT,
				}}
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

export default ServiceItem;
