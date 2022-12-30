import React, { useState } from 'react';

import getRows from '../../../../../utils/revenueDeskUtils/getRows';
import Priority from '../../PriorityNumber';

import controls from './controls';
import styles from './styles.module.css';

function RateCard(allprops) {
	const {
		objectkey: key,
		details,
		type,
		prefrences,
		setPrefrences = () => {},
		expanded,
	} = allprops || {};
	const [showAll, setShowAll] = useState(false);

	const rowKeyMapping = {
		splitable_booking_notes: getRows({
			key,
			details,
		}).rows,
		single_booking_notes: getRows({
			key,
			details,
		}).rows,
		mergeable_booking_notes: getRows({
			key,
			details,
		}).rows,
	};

	const getAllIds = (id, istype) => {
		let ids = [];
		if (istype === 'other') {
			const foundRow = (rowKeyMapping[key] || []).find((obj) => obj.id === id);
			if (foundRow) {
				ids = [...(foundRow.allid || {})];
			}
		} else {
			ids = [id];
		}
		return ids;
	};

	const currentData = rowKeyMapping[key];
	const inceremt = 4;
	const min = currentData.length > inceremt ? inceremt : currentData.length;
	const len = showAll ? currentData.length : min;
	const sliceLength = expanded ? currentData.length : len;
	const currentDataRows = currentData.slice(0, sliceLength);

	const renderSingle = key === 'single_booking_notes';
	// const isExpandable = currentData?.length > min;
	const showData = (val) => val || '';

	const handlePreference = (row_id, istype) => {
		const allIds = getAllIds(row_id, istype);
		if (prefrences.length) {
			const foundItem = (prefrences || []).find((obj) => obj.id === row_id);
			if (foundItem) {
				const oldItems = prefrences;
				const newItems = [];
				oldItems.forEach((item) => {
					if (item.id !== row_id) {
						newItems.push(item);
					}
				});
				if (newItems.length) {
					setPrefrences([...newItems]);
				} else {
					setPrefrences([]);
				}
			} else {
				const newList = prefrences;
				prefrences.push({
					id    : row_id,
					type  : istype,
					allid : allIds,
				});
				setPrefrences([...newList]);
			}
		} else {
			const newList = prefrences;
			prefrences.push({
				id    : row_id,
				type  : istype,
				allid : allIds,
			});
			setPrefrences([...newList]);
		}
	};

	const { column_names } = controls.existing_rates;

	const SingleRender = (currentDataRows || []).map((elememt) => (
		<tr
			className={styles.tr}
			style={{ cursor: 'pointer' }}
			id={elememt.id}
			onClick={() => handlePreference(elememt.id, key)}
		>
			<td className={styles.td}>
				<Priority data={prefrences} id={elememt.id} showPriority={false} />
			</td>

			{(elememt.rowData || []).map((value) => (
				<td className={styles.td}>{showData(value)}</td>
			))}
		</tr>
	));

	const otherRenders = (currentDataRows || []).map((elememt) => (
		<tr
			className={styles.tr}
			style={{ cursor: 'pointer' }}
			id={elememt.id}
			onClick={() => handlePreference(elememt.id, key)}
		>
			<td className={styles.td}>
				<Priority data={prefrences} id={elememt.id} showPriority={false} />
			</td>

			{elememt.childrens?.[0].map((childval) => (
				<td className={styles.td}>{showData(childval)}</td>
			))}
		</tr>
	));

	return (
		<div className={styles.container}>
			{currentDataRows.length ? (
				<div className={styles.rates_container}>
					<div className={styles.description}>{type}</div>

					<table className={styles.table}>
						<tr className={styles.tr}>
							<th className={styles.th}>{'   '}</th>
							{column_names.map((label) => (
								<th className={styles.th}>{label}</th>
							))}
						</tr>

						{renderSingle ? SingleRender : otherRenders}
					</table>

					<div className={styles.add_more_container}>
						<button
							className={styles.add_more}
							onClick={() => setShowAll(!showAll)}
						>
							{currentData?.length > min && !expanded ? (
								<span>
									{showAll && currentData?.length
										? 'See Less' : 'See More'}

								</span>

							) : null}
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default RateCard;
