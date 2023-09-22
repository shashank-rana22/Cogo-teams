import { Button, cl, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { formatBigNumbers } from '../../../../utils/formatBigNumbers';

import styles from './styles.module.css';

const NORMALISED_PERCENTAGE = 90;

function DrillDownCard({
	data = {}, cardIndex = 1, delay = 2, handleClick = () => {}, animate = false,
	isAtTop = false, parentAction = 'Search', parent = null, parentCount = 0,
}) {
	const { drop, rates_count, action_type } = data;
	const isMainCard = !cardIndex;
	const action_text = parentAction.split('_').join(' ');
	const indicatorHeight = !cardIndex
		? NORMALISED_PERCENTAGE : (rates_count / parentCount) * NORMALISED_PERCENTAGE;

	return (
		<div
			style={{ animationDelay: `${delay}s` }}
			className={cl`${styles.container} ${(isAtTop || isMainCard) ? styles.main_card : styles.secondary_card}
			${isAtTop ? styles.custom_card : ''} ${styles[parent]} ${animate ? styles.animate : ''}`}
		>

			<div
				style={{ height: isAtTop ? `${indicatorHeight}px` : '0px' }}
				className={cl`${styles.indicator} ${styles[parent]}`}
			/>

			<div className={styles.flex_between}>
				<p className={styles.card_name}>{`${startCase(action_type)}`}</p>
				{(isAtTop || isMainCard) && (
					<h3 className={styles.rate_amount}>
						<Tooltip
							content={<span>{rates_count || GLOBAL_CONSTANTS.zeroth_index}</span>}
							placement="bottom"
						>
							{formatBigNumbers(rates_count || GLOBAL_CONSTANTS.zeroth_index)}
						</Tooltip>
					</h3>
				)}
			</div>
			<div className={cl`${styles.flex_between} ${styles.single_line_text}`}>
				{
					drop || drop === GLOBAL_CONSTANTS.zeroth_index
						? (
							<p className={styles.drop_off_text}>
								<img
									src={GLOBAL_CONSTANTS.image_url.drop_down_red}
									alt="drop"
									className={styles.drop_icon}
								/>
								{`${formatBigNumbers(drop || GLOBAL_CONSTANTS.zeroth_index)}%`}
							</p>
						)
						: <p> </p>
				}
				{isAtTop && (
					<p className={styles.parent_action_text}>{`from ${action_text}`}</p>
				)}
				{!isAtTop
				&& (isMainCard
					? <Button themeType="linkUi" onClick={() => handleClick(parent)}>View Dropoff</Button>
					: (
						<h3 className={styles.rate_amount}>
							<Tooltip
								content={<span>{rates_count || GLOBAL_CONSTANTS.zeroth_index}</span>}
								placement="bottom"
							>
								{formatBigNumbers(rates_count || GLOBAL_CONSTANTS.zeroth_index)}
							</Tooltip>
						</h3>
					)
				)}
			</div>
		</div>
	);
}

export default DrillDownCard;
