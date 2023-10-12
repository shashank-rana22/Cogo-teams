import { TabPanel, Tabs, Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack, IcMEyeclose, IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import React, { useState, useRef, useEffect } from 'react';

import useGetFclFreightRateWorld from '../../../hooks/useGetQuickViewStatistics';
import FilterButton from '../Filters/FilterButton';

import styles from './styles.module.css';

const TABS = ['active_rates', 'public_searches'];

const BirdsEyeView = dynamic(() => import('./BirdsEyeView'), {
	ssr: false,
});

function Heading({
	backView = false, setView = () => {}, heading = '', showFilters = false, showFilterText = true, globalFilters = {},
	setGlobalFilters = () => {}, view = '',
}) {
	const [show, setShow] = useState(null);
	const [tradeType, setTradeType] = useState('import');
	const ref = useRef(null);
	const {
		countMapping = {},
		maxCount,
		minCount,
		loading,
	} = useGetFclFreightRateWorld({ activeTab: show, trade_type: tradeType, globalFilters });

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setShow(null);
		}
	};

	useEffect(() => {
		if (show) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			if (show) document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [show]);

	return (
		<div className={styles.heading_container}>
			<h1 className={styles.heading}>
				{backView && (
					<IcMArrowBack
						className={styles.back_icon}
						onClick={() => setView(backView)}
					/>
				)}
				{heading}
			</h1>

			{!backView
				&& <p className={styles.info}>from 1st September</p>}

			{showFilters ? (
				<div className={styles.right_container}>
					<FilterButton
						view={view}
						showText={showFilterText}
						globalFilters={globalFilters}
						setGlobalFilters={setGlobalFilters}
					/>
				</div>
			) : (
				<butto className={styles.counter}>
					Quick View
					{show
						? (
							<IcMEyeclose
								className={styles.redirect}
								onClick={() => setShow(null)}
							/>
						)
						: (
							<IcMEyeopen
								className={styles.redirect}
								onClick={() => setShow(TABS[GLOBAL_CONSTANTS.zeroth_index])}
							/>
						)}
					{show && (
						<div className={styles.popup} ref={ref}>
							<Tabs
								activeTab={show}
								defaultActiveTab={TABS[GLOBAL_CONSTANTS.zeroth_index]}
								themeType="primary"
								onChange={(val) => setShow(val)}
								size="xs"
							>
								{TABS.map((tabItem) => (
									<TabPanel key={tabItem} name={tabItem} title={startCase(tabItem)}>
										<BirdsEyeView
											countMapping={countMapping}
											maxCount={maxCount}
											minCount={minCount}
											loading={loading}
										/>
									</TabPanel>
								))}
							</Tabs>
							<Toggle
								name="trade"
								size="md"
								onLabel="import"
								offLabel="export"
								onChange={() => setTradeType((prev) => (prev === 'import' ? 'export' : 'import'))}
								checked={tradeType === 'import'}
							/>
						</div>

					)}
				</butto>
			)}
		</div>
	);
}

export default Heading;
