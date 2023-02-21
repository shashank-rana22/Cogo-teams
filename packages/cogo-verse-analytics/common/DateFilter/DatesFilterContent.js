import { RadioGroup, Button, DateRangePicker } from '@cogoport/components';
import React, { useEffect } from 'react';

import { DATE_RANGES } from '../../constants/date-ranges';

import datesMapping from './dates-mapping';
import styles from './styles.module.css';

function DatesFilterContent({
	applyFilters = () => {},
	setOpen = () => {},
	date = {},
	setDate = () => {},
	range = '',
	setRange = () => {},
	setSelectDuration = () => {},
}) {
	const handleClick = () => {
		applyFilters();
		setOpen(false);
		setSelectDuration(range);
	};

	useEffect(() => {
		const min_max = datesMapping(range);
		setDate({ ...min_max });
	}, [range]);

	return (

		<div className={styles.date_container}>

			<div className={styles.controls}>
				{/* <Flex display="block" flex={1} padding="12px"> */}
				<RadioGroup
					options={DATE_RANGES}
					value={range}
					onChange={(item) => {
						setRange(item);
					}}
				/>
				{/* </Flex> */}

				{range === 'custom' && (
					<div className={styles.picker_container}>

						<DateRangePicker
							value={date}
							onChange={(val) => setDate(val)}
							withPopover={false}
						/>

					</div>
				)}
			</div>

			<div className={styles.button_wrapper}>
				<Button
					className="secondary md"
					onClick={() => setOpen(false)}
					id="cancel-button"
				>
					CANCEL
				</Button>

				<Button
					onClick={() => handleClick()}
					id="apply-button"
					className="primary md"
				>
					APPLY
				</Button>
			</div>

		</div>

	);
}
export default DatesFilterContent;
