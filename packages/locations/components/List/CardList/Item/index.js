import { ToolTip, Button } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

import cl from '../../../../utils/classname-processor';
import getValue from '../../../../utils/getValue';
import { renderStatus } from '../Functions';

import styles from './styles.module.css';

function Item({
	item,
	fields,
	setActiveCard,
	activeCard,
	setViewToShow,
	functions: functionsProp,
	isMobile,
	onCardClick = null,
	currentTab,
	id,
}) {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (activeCard?.id === item?.id) {
			setIsActive(true);
		}
		if (activeCard?.id !== item?.id) {
			setIsActive(false);
		}
	}, [activeCard?.id]);

	useEffect(() => {
		if (activeCard?.id !== item?.id) {
			setIsActive(false);
		}
	}, [currentTab]);

	const functions = {
		...(functionsProp || {}),
		renderStatus,
	};

	const dataField = (singleItem) => {
		// console.log(getValue(item, singleItem, false, functions), 'hjbhfbh');
		//  console.log(item, 'item');
		if (singleItem.tooltip && !isMobile) {
			return (
				<ToolTip
					placement="bottom"
					containerProps={{
						style: { width: '100%', display: 'flex', alignItems: 'center' },
					}}
					content={(
						<p style={{ minWidth: 124, margin: 0 }}>
							{getValue(item, singleItem, false, functions)}

						</p>
					)}
				>
					<div className={styles.titleblack}>
						{getValue(item, singleItem, false, functions)}
					</div>
				</ToolTip>
			);
		}
		return (
			<div className={styles.titleblack}>{getValue(item, singleItem, false, functions)}</div>

		);
	};

	const handleClick = () => {
		if (onCardClick) {
			onCardClick(item);
			// setViewToShow('details');
		} else {
			setActiveCard(item);
			setViewToShow('details');
		}
	};

	return isMobile ? (
		<div>
			<Button
				className={isActive ? 'active' : 'inactive'}
				onClick={handleClick}
				id={id}
				tabIndex="0"
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleClick();
					}
				}}
			>
				{fields.map((singleItem) => (
					<div style={{ display: 'flex' }}>
						<div style={{ width: '40%' }}>
							{singleItem.label}
							{' '}
							:
							{' '}
						</div>
						<div className={styles.value} style={{ marginLeft: 15 }}>
							{getValue(item, singleItem, false, functions)}
						</div>
					</div>
				))}
			</Button>
		</div>
	) : (

		<div
			className={styles.row}
			id={id}
			// className={isActive ? 'active' : 'inactive'}
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleClick();
				}
			}}
			role="presentation"
		>
			{fields.map((singleItem) => (
				<div className={styles.column}>
					{singleItem.render ? singleItem.render(item) : dataField(singleItem)}
				</div>
			))}
		</div>
	);
}

export default Item;
