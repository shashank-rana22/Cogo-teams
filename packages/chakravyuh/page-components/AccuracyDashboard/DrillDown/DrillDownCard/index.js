import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { formatBigNumbers } from '../../../../utils/formatBigNumbers';

import styles from './styles.module.css';

const CONSTANT_HUNDRED = 100;
const CONSTANT_TWENTY = 20;

function DrillDownCard({
	data = {}, cardIndex = 1, delay = 2, handleClick = () => {}, animate = false,
	isAtTop = false, parentAction = 'Search',
}) {
	const isMainCard = !cardIndex;
	const action_text = parentAction.split('_').join(' ');

	return (
		<div
			style={{ animationDelay: `${delay}s` }}
			className={cl`${styles.container} ${(isAtTop || isMainCard) ? styles.main_card : styles.secondary_card}
			${isAtTop ? styles.custom_card : ''} ${styles[data.parent]} ${animate ? styles.animate : ''}`}
		>
			{
				isAtTop && (
					<div
						style={{ height: `${CONSTANT_HUNDRED - cardIndex * CONSTANT_TWENTY}px` }}
						className={cl`${styles.indicator} ${styles[data.parent]}`}
					/>
				)
			}
			<div className={styles.flex_between}>
				<p className={styles.card_name}>{startCase(data?.action_type)}</p>
				{(isAtTop || isMainCard) && (
					<h3 className={styles.rate_amount}>
						{formatBigNumbers(data?.rates_count)}
					</h3>
				)}
			</div>
			<div className={styles.flex_between}>
				<p className={styles.drop_off_text}>
					{`${formatBigNumbers(data?.drop || GLOBAL_CONSTANTS.zeroth_index)}%`}
				</p>
				{isAtTop && (
					<p className={styles.parent_action_text}>{`from ${action_text}`}</p>
				)}
				{!isAtTop
				&& (isMainCard
					? <Button themeType="linkUi" onClick={() => handleClick(data.parent)}>View Dropoff</Button>
					: <h3 className={styles.rate_amount}>{formatBigNumbers(data?.rates_count)}</h3>
				)}
			</div>
		</div>
	);
}

export default DrillDownCard;
