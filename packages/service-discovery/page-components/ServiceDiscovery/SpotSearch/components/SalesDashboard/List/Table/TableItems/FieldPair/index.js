import { Popover, Tooltip } from '@cogoport/components';
import React, { useState } from 'react';

import getValue from '../../../../../../utils/getValue';

import styles from './styles.module.css';

const SUFFIX = { rates_count: 'Rates AVAILABLE' };

function FieldPair({ item = {}, field = {} }) {
	const [show, setShow] = useState(false);
	const { popoverKey, withPopover } = field?.lowerKey || {};

	const goTo = (href) => {
		if (typeof window !== 'undefined') {
			window.open(href);
		}
	};
	const renderBody = () => {
		const popoverData = item[popoverKey];

		const userItem = (userData) => (
			<div className={styles.card} role="presentation" onClick={(e) => e.stopPropagation()}>
				<div className={styles.option_label} style={{ width: '33%' }}>{userData?.name}</div>
				<div
					className={`${styles.option_label} ${styles.clickable}`}
					role="presentation"
					style={{ width: '30%' }}
					onClick={(e) => {
						e.stopPropagation();
						goTo(
							`tel:${
								userData?.mobile_number || userData?.mobile_number_eformat
							}`,
						);
					}}
				>
					{userData?.mobile_country_code
						? `${userData?.mobile_country_code} ${userData?.mobile_number}`
						: userData?.mobile_number_eformat}
				</div>
				<div
					className={`${styles.option_label} ${styles.clickable}`}
					role="presentation"
					style={{ width: '37%', marginLeft: 10 }}
					onClick={(e) => {
						e.stopPropagation();
						goTo(`mailto:${userData?.email}`);
					}}
				>
					{userData?.email}
				</div>
			</div>
		);
		return Array.isArray(popoverData)
			? popoverData.map((userData) => userItem(userData))
			: userItem(popoverData);
	};
	const handleClick = (e) => {
		e.stopPropagation();
		setShow(true);
	};

	const renderLowerText = withPopover ? (
		<Popover
			visible={show}
			placement="bottom"
			trigger="click"
			onClickOutside={() => setShow(false)}
			render={renderBody()}
		>
			<div role="presentation" onClick={handleClick}>
				{getValue(item, field?.lowerKey)}
				{' '}
				{SUFFIX[field?.lowerKey?.key]}
				{Array.isArray(item[popoverKey]) && item[popoverKey].length > 1
					? `+ ${item[popoverKey].length - 1}`
					: ''}
			</div>
		</Popover>
	) : (
		<span>
			{getValue(item, field?.lowerKey)}
			{' '}
			{SUFFIX[field?.lowerKey?.key]}
		</span>
	);
	return (
		<div className={styles.container}>
			<strong>
				<Tooltip
					content={(
						<div className={styles.container}>
							<strong>{getValue(item, field?.topKey)}</strong>
						</div>
					)}
					placement="top"
				>
					<div className={styles.upper_name}>{getValue(item, field?.topKey)}</div>
				</Tooltip>
			</strong>
			{field?.lowerKey ? renderLowerText : null}
		</div>
	);
}
export default FieldPair;
