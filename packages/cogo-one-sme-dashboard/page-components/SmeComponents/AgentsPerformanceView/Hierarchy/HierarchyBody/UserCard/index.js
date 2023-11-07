import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import { ICONS_MAPPING } from '../../../../../../constants';

import styles from './styles.module.css';

function UserCard({
	data = {},
	setHierarchyData = () => {},
	cardType = '',
	cardIndex = 0,
	isLastIndex = false,
	nextViewType = '',
}) {
	const CountriesFlag = ICONS_MAPPING?.[data?.country_code];

	if (cardType === 'shortForm') {
		return (
			<div
				role="presentation"
				className={cl`${styles.short_container} 
					${isLastIndex ? '' : styles.hover_short_container}`}
				onClick={() => {
					setHierarchyData(
						(prev) => {
							if (cardIndex !== prev.length - 1) {
								return prev?.slice(0, cardIndex + 1) || [];
							}
							return prev;
						},
					);
				}}
			>
				{CountriesFlag
					? <CountriesFlag className={styles.short_icon_flag} />
					: (
						<div className={styles.short_logo_container}>
							<Image
								src={data?.picture || GLOBAL_CONSTANTS?.image_url?.cogoport_short_logo}
								height={20}
								width={20}
								alt="logo"
							/>
						</div>
					)}

				<div className={cl`${styles.short_label} ${cl.ns('short_label')}`}>
					{data?.name}
				</div>
			</div>
		);
	}

	return (
		<div
			role="presentation"
			className={cl`${styles.container} 
				${isLastIndex ? '' : styles.hover_container}`}
			onClick={() => setHierarchyData(
				(prev) => ([...prev, {
					...data,
					hierarchyDataType: nextViewType,
				}]),
			)}
		>
			{CountriesFlag
				? <CountriesFlag className={styles.icon_flag} />
				: (
					<div className={styles.logo_container}>
						<Image
							src={GLOBAL_CONSTANTS?.image_url?.cogoport_short_logo}
							height={30}
							width={30}
							alt="logo"
						/>
					</div>
				)}

			<div className={cl`${styles.label} ${cl.ns('label')}`}>
				{data?.name}
			</div>
		</div>
	);
}

export default UserCard;
