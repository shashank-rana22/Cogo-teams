import React, { useState } from 'react';
import Priority from '../../../../RevenueDesk/BookingOption/PriorityNumber';
import controls from './flashRatesControls';
import styles from './styles.module.css'

const FlashRateCard = (allprops) => {
	const {
		type,
		data,
		prefrence_key,
		prefrences,
		setPrefrences = () => {},
		expanded,
		loading,
		unit = 'Container',
	} = allprops || {};
	const [showAll, setShowAll] = useState(expanded);

	const currentData = data;
	const inceremt = 4;
	const min = currentData?.length > inceremt ? inceremt : currentData?.length;
	const len = showAll ? currentData?.length : min;
	const sliceLength = expanded ? currentData?.length : len;
	const currentDataRows = currentData?.slice(0, sliceLength);

	const handlePrefrence = (row_id) => {
		const foundItem = (prefrences || []).find((obj) => obj?.id === row_id);
		if (foundItem) {
			const oldItems = prefrences;
			const newRows = oldItems.filter((val) => val?.id !== row_id);

			if (newRows.length) {
				setPrefrences([...newRows]);
			} else {
				setPrefrences([]);
			}
		} else {
			const newList = prefrences;
			newList.push({
				id: row_id,
				key: prefrence_key,
			});
			setPrefrences([...newList]);
		}
	};
	const showData = (val) => {
		return val || '';
	};

	const { column_names } = controls.flash_rates;

	// if (loading) {
	// 	return (
	// 		<Loader>
	// 			<CustomSkeleton />
	// 			<CustomSkeleton />
	// 			<CustomSkeleton />
	// 		</Loader>
	// 	);
	// }

	return currentDataRows?.length ? (
		<div className= {styles.container}>
			<div className={styles.description}>{type}</div>

			<table className={styles.table}>
				<tr className={styles.tr}>
					<th className={styles.th}>{'     '}</th>
					{column_names.map((label) => {
						if (label === 'Buy Rate') {
							return (
								<th className={styles.th}>
									{label} / {unit}
								</th>
							);
						}
						return <th className={styles.th}>{label}</th>;
					})}
				</tr>

				{(currentDataRows || []).map((elememt) => (
					<tr
                        className={styles.tr}
						id={elememt?.id}
						style={{ cursor: 'pointer' }}
						onClick={() => handlePrefrence(elememt?.id)}
					>
						<td className={styles.td}>
							<Priority data={prefrences} id={elememt?.id} showPriority />
						</td>
						<td className={styles.td}>{showData(elememt?.rowData?.shipping_line)}</td>
						<td className={styles.td}>
							{showData(elememt?.rowData?.service_provider)}
							{elememt?.rowData?.via_route && (
								<span style={{ color: 'blue' }}>
									{` Via (${elememt?.rowData?.via_route})`}
								</span>
							)}
							{elememt?.rowData?.schedule_type ? (
								<span style={{ color: '#5936f0' }}>
									{` (${elememt?.rowData?.schedule_type})`}
								</span>
							) : null}
						</td>
						<td className={styles.td}>
							{`${showData(elememt?.rowData?.currency)} ${showData(
								elememt?.rowData?.buy_price,
							)}`}
							{elememt?.rowData?.is_rate_expired ? (
								<span style={{ color: 'red' }}> (This Rate is Expired)</span>
							) : null}
						</td>
						<td className={styles.td}>{showData(elememt?.rowData?.allocation_ratio)}</td>
						<td className={styles.td}>{showData(elememt?.rowData?.allocation_ratio)}</td>
						<td className={styles.td}>{showData(elememt?.rowData?.reliability_ratio)}</td>
					</tr>
				))}
			</table>

			<div className = {styles.addMore} onClick={() => setShowAll(!showAll)}>
				{currentData?.length > min && !expanded ? (
					<>{showAll && currentData?.length ? 'See Less' : 'See More'}</>
				) : null}
			</div>
		</div>
	) : null;
};

export default FlashRateCard;