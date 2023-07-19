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

const Icon = {
	IcMAscending  : <IcMAscending style={STYLES_ICON} />,
	IcMDescending : <IcMDescending style={STYLES_ICON} />,
};

function Filters() {
	const { filters = {}, setFilters = () => {}, tabState = {} } = useContext(IGMDeskContext);

	const { q = '', fileType, current_filter } = filters || {};

	const [showArrivalDesc, setShowArrivalDesc] = useState(true);
	const [showDepartureDesc, setShowDepartureDesc] = useState(true);
	const [showCurrentFilter, setShowCurrentFilter] = useState(current_filter || 'schedule_arrival');

	const handleSortState = (state, setState, sort_by) => {
		let sort_type;
		if (sort_by === 'schedule_arrival') {
			sort_type = showArrivalDesc ? 'asc' : 'desc';
		}
		if (sort_by === 'schedule_departure') {
			sort_type = showDepartureDesc ? 'asc' : 'desc';
		}

		setState(!state);
		setShowCurrentFilter(sort_by);
		setFilters({
			...filters,
			sort_by,
			sort_type,
			current_filter: showCurrentFilter,
		});
	};

	function ButtonFilter(state, setState, sort_by, btn_text) {
		return (
			<div className={styles.btn_div}>
				<Button
					onClick={() => handleSortState(state, setState, sort_by)}
					size="md"
					themeType="secondary"
					className={styles.button_div}
				>
					{btn_text}
					{' '}
					{state ? (
						Icon.IcMDescending
					) : (
						Icon.IcMAscending
					)}
				</Button>
				{sort_by === showCurrentFilter ? <div className={styles.circle} /> : null}
			</div>
		);
	}
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
						{ButtonFilter(showDepartureDesc, setShowDepartureDesc, 'schedule_departure', 'Departure')}
						{ButtonFilter(showArrivalDesc, setShowArrivalDesc, 'schedule_arrival', 'Arrival')}
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
					onChange={(val) => setFilters({ ...filters, q: val, page: 1 })}
				/>
			</div>
		</div>
	);
}
export default Filters;
