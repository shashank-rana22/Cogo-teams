import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import ComingSoon from '../../../common/ComingSoonTag';

import styles from './styles.module.css';

const SET_TIMEOUT_DURATION = 1500;
const MEDIUM_FONT_WEIGHT = 500;
const SEMIBOLD_FONT_WEIGHT = 600;

function ModeItem({
	data = {},
	selectedMode = '',
	setSelectedMode = () => {},
	setSelectedService = () => {},
	setLocation = () => {},
}) {
	const [bouncing, setBouncing] = useState(false);

	const { label, value, icon } = data;

	const is_available = GLOBAL_CONSTANTS.new_search_supported_services.includes(value)
	|| GLOBAL_CONSTANTS.new_search_supported_services.find((service) => service.includes(value));

	const handleClick = () => {
		if (!is_available) {
			setBouncing(true);

			setTimeout(() => {
				setBouncing(false);
			}, SET_TIMEOUT_DURATION);
			return;
		}
		if (selectedMode === value) setSelectedMode('');
		else setSelectedMode(value);
		setSelectedService(null);
		setLocation(null);
	};

	const isSelected = selectedMode === value;

	return (
		<div
			className={styles.mode_item}
			style={{
				background: isSelected ? '#FCDC00' : '#FFFFFF',
			}}
			key={value}
			onClick={handleClick}
			role="presentation"
		>
			<div className={styles.img_container}>
				{isSelected ? null : (
					<div className={styles.yellow_circle} />
				)}

				<img
					src={icon}
					width={34}
					height={34}
					alt="mode-icon"
					className={cl`${styles.icon} ${!isSelected && styles.icon_hover}`}
				/>
			</div>

			<div
				className={styles.label}
				style={{ fontWeight: isSelected ? SEMIBOLD_FONT_WEIGHT : MEDIUM_FONT_WEIGHT }}
			>
				{label}
			</div>

			{!is_available ? (
				<ComingSoon bouncing={bouncing} />
			) : null}
		</div>
	);
}

export default ModeItem;
