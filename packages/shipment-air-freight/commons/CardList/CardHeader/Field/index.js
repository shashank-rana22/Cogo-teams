import { Tooltip } from '@cogoport/components';
import { IcMInfo, IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import ZEROTH_INDEX from '../../../../constants/CONSTANTS';

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

	const handleOnchange = (item) => {
		const fieldType = item?.sorting.name;

		setSort((prev) => ({
			[fieldType]: prev?.[fieldType] === 'Asc' ? 'Desc' : 'Asc',
		}));

		setShow((prev) => (!prev));
	};

	const sortingKey = sorting ? Object?.keys(sorting)?.[ZEROTH_INDEX] : null;

	const showSortingType =	sorting && sorting[sortingKey]
	&& sorting[sortingKey] === Object?.keys(sort)?.[ZEROTH_INDEX];

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
						onClick={() => handleOnchange(field)}
					/>
				)}
			</div>
		</div>
	);
}
export default Field;
