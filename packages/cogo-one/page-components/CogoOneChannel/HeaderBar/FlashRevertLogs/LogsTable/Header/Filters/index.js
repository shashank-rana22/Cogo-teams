import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Filters({
	filtersParams = {},
	setFilterParams = () => {},
}) {
	const reducedFilters = Object.keys(filtersParams).reduce(
		(prev, itm) => {
			if (filtersParams[itm]) {
				return {
					...prev,
					[itm]: filtersParams[itm],
				};
			}
			return prev;
		},
		{},
	);

	if (!Object.keys(reducedFilters).length) {
		return null;
	}

	return (
		<div className={styles.filters_view}>
			{Object.entries(reducedFilters).map(
				([key, value]) => (
					<Pill key={key} color="#FAD1A5">
						{key === 'flashed_at'
							? `Flashed after ${formatDate({
								date       : value,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
								separator  : ', ',
							})}`
							: startCase(value)}
						<IcMDelete
							className={styles.delete_icon}
							onClick={() => setFilterParams(
								(prev) => ({
									...prev,
									[key]: undefined,
								}),
							)}
						/>
					</Pill>
				),
			)}

			<Button
				size="sm"
				themeType="tertiary"
				className={styles.button_container}
				onClick={() => setFilterParams({})}
			>
				Clear All
			</Button>
		</div>

	);
}

export default Filters;
