import { useState } from 'react';

import PriorityNumber from '../../../RatesCard/Card/PriorityNumber';

import getRows from './getRows';

const columns = [
	'Shipping Line',
	'Total Containers',
	'Total Buy Rate',
	'BN Expiry Date',
	'Sailing Date',
	'Booking Party',
];
function InventoryCard({ type, data: details, preferences, setPreferences, expanded }) {
	const key = type[1];
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
	const inceremt = 4;
	const min = currentData?.length > inceremt ? inceremt : currentData?.length;
	const len = showAll ? currentData?.length : min;
	const sliceLength = expanded ? currentData?.length : len;
	const currentDataRows = currentData?.slice(0, sliceLength);

	const renderSingle = key === 'single_booking_notes';
	const showData = (val) => val || '';

	const getAllIds = (id, istype) => {
		let ids = [];
		if (istype === 'other') {
			const foundRow = (rowKeyMapping[key] || []).find((obj) => obj.id === id);
			if (foundRow) {
				ids = [...foundRow?.allid];
			}
		} else {
			ids = [id];
		}
		return ids;
	};

	const handlePreference = (row_id, istype) => {
		const allIds = getAllIds(row_id, istype);
		if (preferences.length) {
			const foundItem = (preferences || []).find((obj) => obj?.id === row_id);
			if (foundItem) {
				const oldItems = preferences;
				const newItems = [];
				oldItems.forEach((item) => {
					if (item?.id !== row_id) {
						newItems.push(item);
					}
				});
				if (newItems.length) {
					setPreferences([...newItems]);
				} else {
					setPreferences([]);
				}
			} else {
				const newList = preferences;
				preferences.push({
					id    : row_id,
					type  : istype,
					allid : allIds,
				});
				setPreferences([...newList]);
			}
		} else {
			const newList = preferences;
			preferences.push({
				id    : row_id,
				type  : istype,
				allid : allIds,
			});
			setPreferences([...newList]);
		}
	};

	const SingleRender = (currentDataRows || []).map((element) => (
		<div
			style={{ cursor: 'pointer' }}
			id={element?.id}
			key={element?.id}
			role="presentation"
			onClick={() => handlePreference(element?.id, key)}
		>
			<div>
				<PriorityNumber data={preferences} id={element?.id} showPriority={false} />
			</div>

			{(element?.rowData || []).map((value) => (
				<div>{showData(value)}</div>
			))}
		</div>
	));

	const otherRenders = (currentDataRows || []).map((element) => (
		<div
			style={{ cursor: 'pointer' }}
			id={element?.id}
			key={element?.id}
			role="presentation"
			onClick={() => handlePreference(element?.id, key)}
		>
			<div>
				<PriorityNumber data={preferences} id={element?.id} showPriority={false} />
			</div>

			{element?.childrens?.[0].map((childval) => (
				<div>{showData(childval)}</div>
			))}
		</div>
	));

	return (
		<div>
			{currentDataRows?.length ? (
				<div>
					<div>{type}</div>

					<div>
						<div>
							<div>{'   '}</div>
							{columns.map((label) => (
								<div key={label}>{label}</div>
							))}
						</div>

						{renderSingle ? SingleRender : otherRenders}
					</div>

					<div role="presentation" onClick={() => setShowAll(!showAll)}>
						{currentData?.length > min && !expanded ? (
							<div>{showAll && currentData?.length ? 'See Less' : 'See More'}</div>
						) : null}
					</div>
				</div>
			) : null}
		</div>
	);
}
export default InventoryCard;
