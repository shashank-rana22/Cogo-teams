import CONSTANTS from '@cogoport/air-modules/constants/CONSTANTS';
import { Tooltip } from '@cogoport/components';
import { IcMInfo, IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

const STYLES_COL = {
	display    : 'flex',
	flex       : 1,
	alignItems : 'center',
	padding    : '0 4px',
};

const { ZEROTH_INDEX } = CONSTANTS;

function Field({
	field = {},
	showCode = false,
	sort = {},
	setSort = () => {},
}) {
	const [show, setShow] = useState(false);

	const renderHeaderText = () => {
		if (showCode && field.name) {
			return field.name;
		}
		return field.label;
	};

	const handleOnchange = (item) => {
		const fieldType = item?.sorting.name;

		setSort({
			[fieldType]: sort?.[fieldType] === 'Asc' ? 'Desc' : 'Asc',
		});

		setShow(!show);
	};

	const sortingKey = field.sorting ? Object?.keys(field.sorting)?.[ZEROTH_INDEX] : null;

	const showSortingType =	field.sorting && field.sorting[sortingKey]
	&& field.sorting[sortingKey] === Object?.keys(sort)?.[ZEROTH_INDEX];

	return (
		<div
			style={field.hasStyle ? field.styles : STYLES_COL}
			key={field?.key || field?.label}
		>
			<div className={styles.card_title}>
				{field.tooltip ? (
					<Tooltip theme="light" content={field.tooltip} placement="top">
						<span>
							{field.label}
							<IcMInfo />
						</span>
					</Tooltip>
				) : (
					renderHeaderText()
				)}

				{field.sorting && (
					<IcMArrowRotateDown
						className={(showSortingType && show) ? styles.caret_up : styles.caret_down}
						onClick={() => handleOnchange(field)}
					/>
				)}
			</div>
		</div>
	);
}
export default Field;
