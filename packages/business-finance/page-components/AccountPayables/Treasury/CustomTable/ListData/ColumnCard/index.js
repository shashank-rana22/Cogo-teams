import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetEntityReport from '../../../hooks/useGetEntityReport';

import Details from './Details';
import styles from './styles.module.css';

const ONE = 1;

function ColumnCard({
	item = {}, filters = {},
	setFilters = () => {},
}) {
	const [showDetails, setShowDetails] = useState(false);
	const [activeEntityCode, setActiveEntityCode] = useState('301');

	const Icon = showDetails ? IcMArrowRotateUp : IcMArrowRotateDown;

	const {
		date = '',
		month = '',
		year = '',
	} = item;

	const { reportCurrency = '' } = filters || {};

	const {
		data,
		loading,
		getHistoryChild,
	} = useGetEntityReport({
		showDetails,
		activeEntityCode,
		reportCurrency,
		date,
		month,
		year,
	});

	const handleClickIcon = () => {
		if (!showDetails) { getHistoryChild(item); }
		setShowDetails(!showDetails);
	};

	return (
		<div className={styles.column}>
			<div className={styles.flex}>
				<div className={styles.date}>
					{item?.date
						? formatDate({
							date       : item?.date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
							formatType : 'date',
						})
						: `${GLOBAL_CONSTANTS.months[month - ONE]} ${year}`}
				</div>
				<div className={styles.alloted}>
					{	getFormattedPrice(
						item?.allocatedAmount,
						item?.currency,
					)}
				</div>
				<div className={styles.utilized}>
					{	getFormattedPrice(
						item?.utilizedAmount,
						item?.currency,
					)}
				</div>
				<div className={styles.prcessing}>
					{	getFormattedPrice(
						item?.processingAmount,
						item?.currency,
					)}
				</div>
				<div className={styles.settled}>
					{	getFormattedPrice(
						item?.settledAmount,
						item?.currency,
					)}
				</div>
				<div className={styles.flush}>
					{	getFormattedPrice(
						item?.flush,
						item?.currency,
					)}
					(
					{item?.flushPercentage}
					)
				</div>
				<div className={styles.accord}>
					<Icon
						className={styles.icon}
						onClick={handleClickIcon}
					/>
				</div>
			</div>
			{showDetails ? (
				<Details
					item={item}
					data={data}
					loading={loading}
					filters={filters}
					setFilters={setFilters}
					activeEntityCode={activeEntityCode}
					setActiveEntityCode={setActiveEntityCode}
					monthName={GLOBAL_CONSTANTS.months[month - ONE]}
				/>
			) : null}
		</div>
	);
}

export default ColumnCard;
