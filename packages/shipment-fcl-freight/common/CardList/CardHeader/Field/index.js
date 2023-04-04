import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

const stylesCol = {
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

	const sortingKey = field.sorting ? Object?.keys(field.sorting)?.[0] : null;

	const showSortingType =	field.sorting && field.sorting[sortingKey]
	&& field.sorting[sortingKey] === Object?.keys(sort)?.[0];

	return (
		<div
			style={field.hasStyle ? field.styles : stylesCol}
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
					<div
						className={styles.caret}
						sortType={showSortingType && show}
						onClick={() => handleOnchange(field)}
						role="button"
						tabIndex={0}
					/>
				)}
			</div>
		</div>
	);
}
export default Field;
