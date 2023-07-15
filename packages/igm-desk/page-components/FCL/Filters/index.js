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
	const { filters = {}, setFilters = () => {} } = useContext(IGMDeskContext);

	const { q = '', fileType } = filters || {};

	const [showArrivalDesc, setShowArrivalDesc] = useState(true);
	const [showDepartureDesc, setShowDepartureDesc] = useState(true);

	const handleSortState = (state, setState, sort_by) => {
		let sort_type;
		if (sort_by === 'selected_schedule_arrival') {
			sort_type = showArrivalDesc ? 'asc' : 'desc';
		}
		if (sort_by === 'selected_schedule_departure') {
			sort_type = showDepartureDesc ? 'asc' : 'desc';
		}

		setState(!state);
		setFilters({
			...filters,
			sort_by,
			sort_type,
		});
	};

	function ButtonFilter(state, setState, sort_type, btn_text) {
		return (
			<Button
				onClick={() => handleSortState(state, setState, sort_type)}
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
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.toggle_container}>
				<Toggle
					size="md"
					offLabel="Draft"
					onLabel="Pre-alert"
					checked={fileType}
					onChange={() => setFilters({ ...filters, fileType: !fileType, page: 1 })}
				/>
			</div>

			<div className={styles.filter_container}>
				{ButtonFilter(showArrivalDesc, setShowArrivalDesc, 'selected_schedule_arrival', 'Arrival')}
				{ButtonFilter(showDepartureDesc, setShowDepartureDesc, 'selected_schedule_departure', 'Departure')}
			</div>

			<div className={styles.input_container}>
				<Input
					placeholder="Search Shipments"
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
