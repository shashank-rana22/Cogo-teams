import { ToolTip, Grid } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

// const { Col } = Grid;

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

	const showSortingType =		field.sorting
		&& field.sorting[sortingKey]
		&& field.sorting[sortingKey] === Object?.keys(sort)?.[0];

	return (
		<Col
			xs={field.span}
			sm={field.span}
			md={field.span}
			lg={field.span}
			style={field.hasStyle ? field.styles : stylesCol}
			key={field?.key || field?.label}
		>
			<CardTitle className="card-list-header-title">
				{field.tooltip ? (
					<ToolTip theme="light" content={field.tooltip} placement="top">
						<span>
							{field.label}
							<IcMInfo />
						</span>
					</ToolTip>
				) : (
					renderHeaderText()
				)}

				{field.sorting && (
					<Caret
						sortType={showSortingType && show}
						onClick={() => handleOnchange(field)}
					/>
				)}
			</CardTitle>
		</Col>
	);
}
export default Field;
