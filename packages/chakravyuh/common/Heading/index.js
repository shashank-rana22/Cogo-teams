import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import FilterButton from '../../page-components/AccuracyDashboard/Filters/FilterButton';

import styles from './styles.module.css';

function Heading({
	backView = false, setView = () => {}, heading = '', showFilters = true, showFilterText = true, globalFilters = {},
	setGlobalFilters = () => {},
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
			{showFilters && (
				<FilterButton
					showText={showFilterText}
					globalFilters={globalFilters}
					setGlobalFilters={setGlobalFilters}
				/>
			)}
		</div>
	);
}

export default Heading;
