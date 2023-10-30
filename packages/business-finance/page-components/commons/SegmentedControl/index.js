import React from 'react';

import styles from './styles.module.css';

function SegmentedControl(props) {
	const {
		options: optionsProp,
		activeTab,
		setActiveTab,
		color = '#356EFD',
		background = '#F2F6FF',
		style,
	} = props;

	const options = !optionsProp ? [] : optionsProp;

	return (
		<div className={styles.segmented_control} style={style}>
			<div className={styles.segmented_container}>
				{options.map((tabOption) => {
					const { label, value, icon, badge } = tabOption;

					const isActive = activeTab === value;

					return (
						<div
							key={value}
							className={`${styles.segmented_option} ${isActive ? styles.activeoption : ''}`}
							style={{ '--background': background }}
							onClick={() => setActiveTab(value)}
							role="presentation"
						>
							{icon && (
								<div
									className={`${styles.segmented_icon} ${isActive ? styles.active : ''}`}
									style={{ '--color': color }}
								>
									{icon}
								</div>
							)}
							<div
								className={`${styles.segmented_label} ${isActive ? styles.active : ''}`}
								style={{ '--color': color }}
							>
								{label}
							</div>
							{badge && (
								<div
									className={`${styles.segmented_badge}
									${isActive ? styles.activebadge : styles.atvbadge}`}
									style={{ '--color': color }}
								>
									{badge}
								</div>
							)}
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default SegmentedControl;
