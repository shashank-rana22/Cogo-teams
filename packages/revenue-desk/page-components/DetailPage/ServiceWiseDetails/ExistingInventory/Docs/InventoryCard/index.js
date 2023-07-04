import { useState } from 'react';

import { DEFAULT_INDEX, VALUE_ONE, VALUE_ZERO } from '../../../../../constants';

import getRows from './getRows';
import PriorityNumber from './PriorityNumber';
import styles from './styles.module.css';

const columns = [
	'Shipping Line',
	'Total Containers',
	'Total Buy Rate',
	'BN Expiry Date',
	'Sailing Date',
	'Booking Party',
];
function InventoryCard({ type, data: details, preferences, setPreferences, serviceId }) {
	const key = type[VALUE_ONE];
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
	const [showAll, setShowAll] = useState(false);
	const currentData = rowKeyMapping[key];
	const INCEREMT = 4;
	const currentDataRows = showAll ? currentData : currentData?.slice(VALUE_ZERO, INCEREMT);
	const expandable = currentData?.length > INCEREMT;

	const renderSingle = key === 'single_booking_notes';
	const showData = (val) => val || '';
	const getAllIds = (id, istype) => {
		let ids = [];
		if (istype === 'other') {
			const foundRow = (rowKeyMapping[key] || []).find((obj) => obj.id === id);
			if (foundRow) {
				ids = [...foundRow.allid];
			}
		} else {
			ids = [id];
		}
		return ids;
	};

	const handlePreference = (row_id, istype) => {
		const allIds = getAllIds(row_id, istype);
		if ((preferences?.[serviceId] || []).length) {
			const foundItem = (preferences?.[serviceId] || []).find((obj) => obj?.id === row_id);
			if (foundItem) {
				const oldItems = preferences?.[serviceId];
				const NEW_ITEMS = [];
				oldItems.forEach((item) => {
					if (item?.id !== row_id) {
						NEW_ITEMS.push(item);
					}
				});
				if (NEW_ITEMS.length) {
					setPreferences({ ...preferences, [serviceId]: [...NEW_ITEMS] });
				} else {
					setPreferences({ ...preferences, [serviceId]: [] });
				}
			} else {
				const newList = preferences?.[serviceId] || [];
				newList.push({
					id    : row_id,
					type  : istype,
					allid : allIds,
				});
				setPreferences({ ...preferences, [serviceId]: [...newList] });
			}
		} else {
			const newList = preferences?.[serviceId] || [];
			newList.push({
				id    : row_id,
				type  : istype,
				allid : allIds,
			});
			setPreferences({ ...preferences, [serviceId]: [...newList] });
		}
	};

	const SingleRender = (currentDataRows || []).map((element) => (
		<div
			className={styles.tr}
			style={{ cursor: 'pointer' }}
			id={element?.id}
			key={element?.id}
			role="presentation"
			onClick={() => handlePreference(element?.id, key)}
		>
			<div className={styles.td_priority}>
				<PriorityNumber data={preferences?.[serviceId]} id={element?.id} showPriority={false} />
			</div>

			{(element?.rowData || []).map((value) => (
				<div className={styles.td} key={value}>{showData(value)}</div>
			))}
		</div>
	));

	const otherRenders = (currentDataRows || []).map((element) => (
		<div
			className={styles.tr}
			style={{ cursor: 'pointer' }}
			id={element?.id}
			key={element?.id}
			role="presentation"
			onClick={() => handlePreference(element?.id, key)}
		>
			<div className={styles.select_container}>
				<PriorityNumber
					data={preferences?.[serviceId]}
					id={element?.id}
				/>
			</div>

			{element?.childrens?.[DEFAULT_INDEX].map((childval) => (
				<div className={styles.td} key={childval}>{showData(childval)}</div>
			))}
		</div>
	));
	return (
		<div className={styles.big_container}>
			{currentDataRows?.length ? (
				<div className={styles.ratescontainer}>
					<div className={styles.description}>{type[DEFAULT_INDEX]}</div>
					<div className={styles.table}>
						<div className={styles.tr}>
							<div className={styles.select_heading}>{' '}</div>
							{columns.map((label) => (
								<div className={styles.th} key={label}>{label}</div>
							))}
						</div>
						{renderSingle ? SingleRender : otherRenders}
					</div>

					<div className={styles.addmore} role="presentation" onClick={() => setShowAll(!showAll)}>
						{currentData?.length > INCEREMT && expandable ? (
							<div className={styles.show_container}>
								{showAll && currentData?.length ? (
									'See Less'
								) : (
									'See More'
								)}
							</div>
						) : null}
					</div>
				</div>
			) : null}
		</div>
	);
}
export default InventoryCard;
