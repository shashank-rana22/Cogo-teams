import { Button, RadioGroup, DateRangepicker } from '@cogoport/components';
import React, { useEffect } from 'react';

import DateRanges from '../../constants/date-ranges-filter';

import datesMapping from './dates-mapping';
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

	useEffect(() => {
		const min_max = datesMapping(range);
		setDate({ ...min_max });
	}, [range]);

	return (
		<div>
			<div>
				<div className={styles.radio_container}>
					<RadioGroup
						options={DateRanges}
						value={range}
						onChange={(item) => {
							setRange(item);
						}}
					/>
				</div>

				{range === 'custom' ? (
					<div>
						<DateRangepicker
							value={date}
							onChange={(val) => setDate(val)}
						/>
					</div>
				) : null}
			</div>

			<div
				className={styles.button_wrap}
				style={{
					padding        : '12px 28px 12px 0px',
					display        : 'flex',
					justifyContent : 'flex-end',
				}}
			>
				<Button
					style={{ marginLeft: '14px' }}
					onClick={() => setOpen(false)}
					id="cancel_button"
				>
					CANCEL
				</Button>

				<Button
					onClick={() => handleClick()}
					id="apply_button"
					style={{
						background : '#000000',
						color      : '#ffffff',
						marginLeft : '14px',
					}}
				>
					APPLY
				</Button>
			</div>
		</div>
	);
}
export default DatesFilterContent;
