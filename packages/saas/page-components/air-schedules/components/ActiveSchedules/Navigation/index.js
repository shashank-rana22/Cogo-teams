import { Button } from '@cogoport/components';
import { useState } from 'react';

import AirlineFilter from './AirlineFilter';
import ArrivalFilter from './ArrivalFilter';
import DepartureFilter from './DepartureFilter';
import SortByFilter from './SortByFIlter';
import styles from './styles.module.css';
import TransitDurationFilter from './TransitDurationFilter';

function Navigation({
	departureDate = {},
	setDepartureDate = () => {},
	arrivalDate = [],
	setArrivalDate = () => {},
	carrierList = [],
	handleCheckList = () => {},
	durationValue = 0,
	onChange = () => {},
	clearAllHandler = () => {},
	setSortBy = () => {},
}) {
	const [isOpen, setIsOpen] = useState([]);

	const arrayRemove = (arr, value) => arr.filter((ele) => ele !== value);

	const handleNav = (id) => {
		setIsOpen(
			(isOpen || []).includes(id) ? arrayRemove(isOpen, id) : [...isOpen, id],
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.filter}>
				<Button className={styles.clear_all} role="presentation" onClick={clearAllHandler}>
					Clear All
				</Button>
			</div>

			<AirlineFilter
				handleCheckList={handleCheckList}
				handleNav={handleNav}
				isOpen={isOpen}
				carrierList={carrierList}
			/>
			<ArrivalFilter
				handleNav={handleNav}
				isOpen={isOpen}
				arrivalDate={arrivalDate}
				setArrivalDate={setArrivalDate}
			/>
			<DepartureFilter
				handleNav={handleNav}
				isOpen={isOpen}
				departureDate={departureDate}
				setDepartureDate={setDepartureDate}
			/>
			<TransitDurationFilter
				handleNav={handleNav}
				isOpen={isOpen}
				durationValue={durationValue}
				onChange={onChange}
			/>
			<SortByFilter
				setSortBy={setSortBy}
				handleNav={handleNav}
				isOpen={isOpen}
				durationValue={durationValue}
				onChange={onChange}
			/>

		</div>
	);
}

export default Navigation;
