import { cl, Tabs, TabPanel } from '@cogoport/components';
import { IcMCross, IcMExpand } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { section_container, bottom_label } from '../styles.module.css';

import Deviation from './Deviation';
import RateAccuracy from './RateAccuracy';
import styles from './styles.module.css';
import Trend from './Trend';

const TIME_LIMIT = 200;

const ALL_TABS_LIST = [
	{
		key       : 'deviation',
		name      : 'deviation',
		title     : 'Deviation',
		Component : Deviation,
		heading   : 'Rate Deviation with Price (USD)',
	},
	{
		key       : 'trend',
		name      : 'trend',
		title     : 'Trend',
		Component : Trend,
		heading   : 'Rate Trend with Time (USD)',
	},
	{
		key       : 'accuracy',
		name      : 'accuracy',
		title     : 'Accuracy',
		Component : RateAccuracy,
		heading   : 'Rate Accuracy with Time',
	},
];

function ScallableAccuracy(props) {
	const {
		setIsHighlighted = () => {},
		isHighlighted = false,
		globalFilters = {},
		setGlobalFilters = () => {},
		dateString = '',
	} = props;
	const { chart_type = 'trend', service_type } = globalFilters;
	const [isAnimating, setIsAnimating] = useState(false);

	const onChange = (val) => {
		setGlobalFilters((prev) => ({ ...prev, chart_type: val }));
	};

	useEffect(() => {
		setIsAnimating(true);
		const timeOut = setTimeout(() => {
			setIsAnimating(false);
		}, TIME_LIMIT);

		return () => {
			clearTimeout(timeOut);
		};
	}, [isHighlighted]);

	const TABS_LIST = service_type === 'fcl' ? ALL_TABS_LIST : ALL_TABS_LIST.filter(({ key }) => key === 'trend');

	return (
		<div className={cl`${section_container} ${styles.container} 
		${service_type === 'air' ? styles.expand_icon_hidden : ''}`}
		>
			{isHighlighted ? (
				<IcMCross
					className={styles.expand_icon}
					onClick={() => setIsHighlighted((prev) => !prev)}
				/>
			) : (
				<IcMExpand
					className={styles.expand_icon}
					onClick={() => setIsHighlighted((prev) => !prev)}
				/>
			)}
			<Tabs
				activeTab={chart_type}
				themeType="primary"
				onChange={onChange}
				size="sm"
			>
				{TABS_LIST.map((tabItem) => {
					const { key = '', name = '', title = '', Component, heading = '' } = tabItem;
					if (Component) {
						return (
							<TabPanel key={key} name={name} title={title}>
								<h2 className={styles.tab_title}>{heading}</h2>
								<Component {...props} isAnimating={isAnimating} isHighlighted={isHighlighted} />
								<h5 className={cl`${styles.bottom_label} ${bottom_label}`}>
									{dateString}
								</h5>
							</TabPanel>
						);
					}
					return (
						<TabPanel key={key} name={name} title={title}>
							<span>Tab not found</span>
						</TabPanel>
					);
				})}
			</Tabs>

		</div>

	);
}

export default ScallableAccuracy;
