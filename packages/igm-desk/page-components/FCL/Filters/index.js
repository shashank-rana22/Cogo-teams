import { Input, Button, Toggle } from '@cogoport/components';
import { IcMSearchlight, IcMDescending, IcMAscending } from '@cogoport/icons-react';
import { useState, useContext } from 'react';

import IGMDeskContext from '../../../context/IGMDeskContext';

import styles from './styles.module.css';

const STYLES_ICON = {
	height     : '20px',
	width      : '20px',
	marginLeft : '8px',
};

const ICON = {
	IcMAscending  : <IcMAscending style={STYLES_ICON} />,
	IcMDescending : <IcMDescending style={STYLES_ICON} />,
};

const handleSortState = (state, setState, sort_by, showCurrentFilter, setShowCurrentFilter, setFilters) => {
	let sort_type;
	if (sort_by === 'schedule_arrival') {
		sort_type = state ? 'asc' : 'desc';
	}
	if (sort_by === 'schedule_departure') {
		sort_type = state ? 'asc' : 'desc';
	}

	setState(!state);
	setShowCurrentFilter(sort_by);
	setFilters((prev) => ({
		...prev,
		sort_by,
		sort_type,
		current_filter: showCurrentFilter,
	}));
};

function ButtonFilter({
	value = false, setState = () => {}, sort_by = '', btn_text = '',
	showCurrentFilter = '', setShowCurrentFilter = () => {}, setFilters = () => {},
}) {
	return (
		<div className={styles.btn_div}>
			<Button
				onClick={(val) => handleSortState(
					val,
					setState,
					sort_by,
					showCurrentFilter,
					setShowCurrentFilter,
					setFilters,
				)}
				size="md"
				themeType="secondary"
				className={styles.button_div}
			>
				{btn_text}
				{' '}
				{value ? (
					ICON.IcMDescending
				) : (
					ICON.IcMAscending
				)}
			</Button>
			{sort_by === showCurrentFilter ? <div className={styles.circle} /> : null}
		</div>
	);
}

function Filters() {
	const { filters = {}, setFilters = () => {}, tabState = {} } = useContext(IGMDeskContext);

	const { q = '', fileType, current_filter } = filters || {};

	const [showArrivalDesc, setShowArrivalDesc] = useState(true);
	const [showDepartureDesc, setShowDepartureDesc] = useState(true);
	const [showCurrentFilter, setShowCurrentFilter] = useState(current_filter || 'schedule_arrival');

	return (
		<div className={styles.container}>

			{tabState?.activeTab === 'daily_report' ? (
				null
			) : (
				<div className={styles.filter_row_container}>
					<Toggle
						size="md"
						offLabel="Draft"
						onLabel="Pre-alert"
						checked={fileType}
						onChange={() => setFilters({ ...filters, fileType: !fileType, page: 1 })}
					/>
					<div className={styles.filter_container}>
						<ButtonFilter
							value={showDepartureDesc}
							setState={setShowDepartureDesc}
							sort_by="schedule_departure"
							btn_text="Departure"
							showCurrentFilter={showCurrentFilter}
							setShowCurrentFilter={setShowCurrentFilter}
							setFilters={setFilters}
						/>
						<ButtonFilter
							value={showArrivalDesc}
							setState={setShowArrivalDesc}
							sort_by="schedule_arrival"
							btn_text="Arrival"
							showCurrentFilter={showCurrentFilter}
							setShowCurrentFilter={setShowCurrentFilter}
							setFilters={setFilters}
						/>
					</div>
				</div>
			) }

			<div className={styles.input_container}>
				<Input
					placeholder="Search SID, MBL and HBL"
					type="search"
					size="sm"
					suffix={<IcMSearchlight />}
					value={q}
					onChange={(val) => setFilters((prev) => ({ ...prev, q: val, page: 1 }))}
				/>
			</div>
		</div>
	);
}
export default Filters;
