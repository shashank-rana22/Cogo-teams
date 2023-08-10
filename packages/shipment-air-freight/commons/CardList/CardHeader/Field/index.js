import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMInfo, IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

const STYLES_COL = {
	display    : 'flex',
	flex       : 1,
	alignItems : 'center',
	padding    : '0 4px',
};

function Field({
	field = {},
	showCode = false,
	sort = {},
	setSort = () => {},
}) {
	const [show, setShow] = useState(false);

	const { name, sorting, label, key, hasStyle } = field;

	const renderHeaderText = () => {
		if (showCode && name) {
			return name;
		}
		return label;
	};

	const handleOnChange = () => {
		const fieldType = field.sorting?.name;

		setSort((prev) => ({
			[fieldType]: prev?.[fieldType] === 'Asc' ? 'Desc' : 'Asc',
		}));

		setShow((prev) => (!prev));
	};

	const sortingKey = sorting ? Object?.keys(sorting)?.[GLOBAL_CONSTANTS.zeroth_index] : null;

	const showSortingType =	sorting && sorting[sortingKey]
	&& sorting[sortingKey] === Object?.keys(sort)?.[GLOBAL_CONSTANTS.zeroth_index];

	return (
		<div
			style={hasStyle ? field.styles : STYLES_COL}
			key={key || label}
		>
			<div className={styles.card_title}>
				{field.tooltip ? (
					<Tooltip theme="light" content={field.tooltip} placement="top">
						<span>
							{label}
							<IcMInfo />
						</span>
					</Tooltip>
				) : (
					renderHeaderText()
				)}

				{sorting && (
					<IcMArrowRotateDown
						className={`${styles.caret} ${(showSortingType && show) ? styles.caret_up : ''}`}
						onClick={handleOnChange}
					/>
				)}
			</div>
		</div>
	);
}
export default Field;
