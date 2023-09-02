import { Loader, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack, IcMEyeclose, IcMEyeopen } from '@cogoport/icons-react';
import dynamic from 'next/dynamic';
import React, { useState, useRef, useEffect } from 'react';

import useGetFclFreightRateWorld from '../../../hooks/getFclFreightRateStatisticsWorld';
import { formatBigNumbers } from '../../../utils/formatBigNumbers';
import FilterButton from '../Filters/FilterButton';

import styles from './styles.module.css';

const BirdsEyeView = dynamic(() => import('./BirdsEyeView'), {
	ssr: false,
});

function Heading({
	backView = false, setView = () => {}, heading = '', showFilters = false, showFilterText = true, globalFilters = {},
	setGlobalFilters = () => {}, view = '',
}) {
	const [show, setShow] = useState(false);
	const ref = useRef(null);
	const {
		data = {},
		countMapping = {},
		maxCount,
		minCount,
		loading,
	} = useGetFclFreightRateWorld({ flag: !showFilters, globalFilters });
	const { total_rates } = data;

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setShow(false);
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
				&& <h5>From 1st September</h5>}

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
				<h1 className={styles.counter}>
					{loading
						? <Loader /> : (
							<Tooltip
								content={(
									<span>
										{total_rates || GLOBAL_CONSTANTS.zeroth_index}
									</span>
								)}
								placement="bottom"
							>
								{formatBigNumbers(total_rates || 'NA')}
							</Tooltip>
						)}

					<span>Active Rates</span>
					{show
						? <IcMEyeclose className={styles.redirect} onClick={() => setShow(false)} />
						: <IcMEyeopen className={styles.redirect} onClick={() => setShow(true)} />}
					{show && (
						<div className={styles.popup} ref={ref}>
							<BirdsEyeView
								countMapping={countMapping}
								maxCount={maxCount}
								minCount={minCount}
							/>
						</div>
					)}
				</h1>
			)}
		</div>
	);
}

export default Heading;
