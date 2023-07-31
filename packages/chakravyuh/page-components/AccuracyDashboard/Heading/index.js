import { Tooltip } from '@cogoport/components';
import { IcMArrowBack, IcMEyeopen } from '@cogoport/icons-react';
import React from 'react';

import { formatBigNumbers } from '../../../utils/formatBigNumbers';
import FilterButton from '../Filters/FilterButton';

import styles from './styles.module.css';

function Heading({
	backView = false, setView = () => {}, heading = '', showFilters = false, showFilterText = true, globalFilters = {},
	setGlobalFilters = () => {}, view = '',
}) {
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
					{formatBigNumbers(parseFloat('11252324154'))}

					<span>Total Rates</span>
					<Tooltip content="Birds eye view" placement="bottom-start">
						<IcMEyeopen className={styles.redirect} />
					</Tooltip>
				</h1>
			)}
		</div>
	);
}

export default Heading;
