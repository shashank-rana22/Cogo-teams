import { RadioGroup, Button, SingleDateRange } from '@cogoport/components';
import React, { useEffect } from 'react';

import { DATE_RANGES } from '../../../../../constants/date-range';
import useOutsideClick from '../../../../../constants/handle-outside-click';
import getDateMapping from '../../../../../Utils/dates-mapping';

import styles from './styles.module.css';

function DatesFilterContent({
	applyFilters = () => {},
	setOpen = () => {},
	date = {},
	setDate = () => {},
	range = '',
	setRange = () => {},
}) {
	const handleClick = () => {
		applyFilters();
		setOpen(false);
	};
	const ref = useOutsideClick(() => setOpen(false));
	useEffect(() => {
		const min_max = getDateMapping(range);
		setDate({ ...min_max });
	}, [range, setDate]);

	return (
		<div className={styles.date_container} ref={ref}>
			<div className={styles.button_wrap}>
				<Button
					onClick={() => setOpen(false)}
					id="cancel_button"
					size="sm"
					themeType="secondary"
					style={{ marginRight: '10px' }}
				>
					CANCEL
				</Button>

				<Button
					onClick={handleClick}
					id="apply_button"
					size="sm"
					themeType="primary"
				>
					APPLY
				</Button>
			</div>
			<div className={styles.styled_controls}>
				<div className={styles.radio_group_container}>
					<RadioGroup
						options={DATE_RANGES}
						value={range}
						onChange={(item) => {
							setRange(item);
						}}
						className={styles.radio_container}
					/>
				</div>
				{range === 'custom' ? (
					<>
						<div className={styles.vertical_line} />
						<div className={styles.date_range_picker_container}>
							<SingleDateRange
								value={date}
								onChange={(val) => setDate(val)}
								withPopover={false}
							/>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
}
export default DatesFilterContent;
