import { useSelector } from '@cogoport/store';
import React from 'react';

import RevenueCardHeading from '../RevenueCardHeading';

import DesktopCard from './DesktopCard';
import MobileCard from './Mobilecard';
import styles from './styles.module.css';

function Card({
	borderLeftColor = '',
	title = '',
	data = [],
	months = [],
	currency,
	toolTipContent = '',
	selectedFilterTab,
}) {
	// const isMobile = useSelector((state) => (state.general || {}).isMobile);
	const isMobile = false;

	return (
		<>
			<RevenueCardHeading
				showIcon={false}
				title={title}
				toolTipContent={toolTipContent}
			/>
			<div className={styles.card}>
				<div className={styles.desktop}>
					<DesktopCard
						master={months}
						keys={data}
						selectedFilterTab={selectedFilterTab}
						currency={currency}
						borderLeftColor={borderLeftColor}
					/>
				</div>
				<div className={styles.mobile}>
					<MobileCard
						master={months}
						keys={data}
						selectedFilterTab={selectedFilterTab}
						currency={currency}
						borderLeftColor={borderLeftColor}
					/>
				</div>
			</div>
		</>
	);

	// return (
	// 	<>
	// 		<RevenueCardHeading
	// 			showIcon={false}
	// 			title={title}
	// 			toolTipContent={toolTipContent}
	// 		/>
	// 		<div className={styles.card}>
	// 			{isMobile ? (
	// 				<MobileCard
	// 					master={months}
	// 					keys={data}
	// 					selectedFilterTab={selectedFilterTab}
	// 					currency={currency}
	// 					borderLeftColor={borderLeftColor}
	// 				/>
	// 			) : (
	// 				<DesktopCard
	// 					master={months}
	// 					keys={data}
	// 					selectedFilterTab={selectedFilterTab}
	// 					currency={currency}
	// 					borderLeftColor={borderLeftColor}
	// 				/>
	// 			)}
	// 		</div>
	// 	</>
	// );
}

export default Card;
