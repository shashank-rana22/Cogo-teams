import { Button, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import RenderCardHeader from '../RenderCardHeader';
import MyResponsiveBar from '../ResponsiveBar';

import styles from './styles.module.css';

const KEY_MAPPINGS = {
	'Operational Profitability' : 'Profitability',
	Revenue                     : 'Revenue',
	Expense                     : 'Cost',
};

const DEFAULT_LENGTH = 1;
const DEFAULT_WIDTH = 80;

const LABEL_MAPPING = {
	Financially   : 'actual',
	Operationally : 'operational',
};

function SingleGraphCard({
	heading = '',
	setActiveBar = () => { },
	isViewDetailsVisible = false,
	onViewDetails = () => { },
	taxType = '',
	type = '',
	serviceLevelData = [],
	serviceLevelLoading = false,
}) {
	const isLastView = isViewDetailsVisible; // last view of graph cards

	const onBarClick = (e) => {
		if (!isLastView) { setActiveBar(e?.indexValue); }
	};

	if (!isEmpty(serviceLevelData)) {
		// formatting bottom axis labels
		serviceLevelData.forEach((item) => {
			const singleItem = item;
			const { serviceName } = singleItem || {};
			singleItem.serviceName = serviceName.replaceAll('_', ' ');
		});
	}

	return (
		<div className={styles.container}>
			<div className={styles.flexhead}>
				<RenderCardHeader title={heading} />
				{isViewDetailsVisible && (
					<Button
						themeType="secondary"
						onClick={onViewDetails}
					>
						View Details

					</Button>
				)}
			</div>

			<div
				style={{
					minWidth: `${(serviceLevelData?.length || DEFAULT_LENGTH) * DEFAULT_WIDTH}px`,

				}}
				className={styles.graph}
			>
				{!serviceLevelLoading ? (
					<MyResponsiveBar
						data={serviceLevelData}
						keys={[
							`estimated${KEY_MAPPINGS?.[heading]}${taxType}`,
							`${LABEL_MAPPING[type]}${KEY_MAPPINGS?.[heading]}${taxType}`,
						]}
						legendX=""
						legendY=""
						width="100%"
						height="300px"
						colors={['#cfeaed', '#6fa5ab']}
						colorBy="id"
						indexBy="serviceName"
						enableGridY
						legends={false}
						onClick={onBarClick}
						margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
						axisLeft={{
							tickSize       : 0,
							tickPadding    : 0,
							tickRotation   : 0,
							legend         : 'Percentage',
							legendPosition : 'middle',
							legendOffset   : -40,
							ariaHidden     : true,
						}}
						axisBottomRotation={isLastView ? '20' : '0'}
					/>
				) : (
					<div>
						<Placeholder height={380} width="100%" />
					</div>
				)}
			</div>

		</div>
	);
}
export default SingleGraphCard;
