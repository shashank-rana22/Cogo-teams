import { cl, Tabs, TabPanel } from '@cogoport/components';
import { IcMCross, IcMExpand } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import { section_container } from '../styles.module.css';

import RateAccuracyChart from './RateAccuracyChart';
import styles from './styles.module.css';
import TrendChart from './TrendChart';

const TIME_LIMIT = 200;

const TABS_LIST = [
	{
		key       : 'trend',
		name      : 'trend',
		title     : 'Trend',
		Component : TrendChart,
		heading   : 'Rate Trend with Time (USD)',
	},
	{
		key       : 'accuracy',
		name      : 'accuracy',
		title     : 'Accuracy',
		Component : RateAccuracyChart,
		heading   : 'Rate Accuracy with Time',
	},
];

function ScallableAccuracy(props) {
	const {
		setIsHighlighted = () => {},
		isHighlighted = false,
		globalFilters = {},
		setGlobalFilters = () => {},
	} = props;
	const { chartType = 'trend' } = globalFilters;
	const [isAnimating, setIsAnimating] = useState(false);

	const onChange = (val) => {
		setGlobalFilters((prev) => ({ ...prev, chartType: val }));
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

	return (
		<div className={cl`${styles.container} ${section_container} `}>
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
				activeTab={chartType}
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
