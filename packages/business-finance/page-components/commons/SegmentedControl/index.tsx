import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

interface Props{
	options:{label:string ,value:string, icon?: JSX.Element ,badge?:number}[];
	activeTab:string;
	setActiveTab:Function;
	color?: string;
	background?:string;
}

function SegmentedControl(props:Props) {
	const {
		options: optionsProp,
		activeTab,
		setActiveTab,
		color="#356EFD",
		background="#F2F6FF",
	} = props;

	const options = !optionsProp ? [] : optionsProp;

	const [isMounted, setIsMounted] = useState<boolean>(false);

	useEffect(() => {
		if (isMounted) {
			return;
		}

		setActiveTab(activeTab || (options[0] || {}).value || '');
		setIsMounted(true);
	}, [isMounted]);

	return (
		<div className={styles.segmented_control}>
			<div className={styles.segmented_container}>
				{options.map((tabOption) => {
					const { label, value, icon ,badge} = tabOption;

					const isActive = activeTab === value;

					return (
						<div
							key={value}
							className={`${styles.segmented_option} ${isActive?styles.activeoption:""}`}
							style={{ '--background': background} as React.CSSProperties}
							onClick={() => setActiveTab(value)}
						>
							{icon && (
								<div className={`${styles.segmented_icon} ${isActive?styles.active:""}`} style={{ '--color': color} as React.CSSProperties}>
									{icon}
								</div>
							)}
							<div className={`${styles.segmented_label} ${isActive?styles.active:""}`} style={{ '--color': color} as React.CSSProperties}>
								{label}
							</div>
							{badge && (
								<div className={`${styles.segmented_badge} ${isActive?styles.activebadge:""}`}  style={{ '--color': color} as React.CSSProperties}>
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
