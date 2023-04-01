import { RadioGroup, Textarea } from '@cogoport/components';
import { addDays, isEmpty, format } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

function UpdatePip({
	item,
	setDisableNext = () => {},
	setItem = () => {},
}) {
	const { final_decision:value = '', comment = '' } = item;
	const extended_date = addDays(new Date(item.end_date), 30);

	const radioList = [
		{ name: 'R2', value: 'confirmed', label: 'Confirm' },
		{
			name  : 'R1',
			value : item?.log_type === 'pip' ? 'exited' : 'extended',
			label : item?.log_type === 'pip' ? 'Exit' : 'Extend',
		},
	];

	useEffect(() => {
		if (!value || ((value !== 'confirmed') && isEmpty(comment))) {
			setDisableNext(true);
		} else {
			setDisableNext(false);
		}
	}, [comment, value, setDisableNext]);

	return (
		<div className={styles.update_container}>
			<div className={styles.update_dates_container}>
				<div className={styles.update_dates}>
					<div className={styles.lable}>Start Date</div>

					<div style={{ fontWeight: 'bold' }}>{format(item?.start_date, 'dd-MMM-yyyy')}</div>
				</div>

				<div className={styles.update_dates}>
					<div className={styles.lable}>End Date</div>

					<div style={{ fontWeight: 'bold' }}>{format(item?.end_date, 'dd-MMM-yyyy')}</div>
				</div>
			</div>
			<RadioGroup
				className={styles.radio_btns}
				options={radioList}
				value={value}
				onChange={(val) => {
					setItem((pv) => ({
						...pv,
						final_decision : val || undefined,
						is_reviewed    : false,
					}));
				}}
			/>

			<div className={styles.dates}>
				{value === 'Extended' && (
					<div className={styles.extend_date}>
						<div className={styles.lable}>
							{` ( Will be Extended to : ${format(extended_date, 'dd-MMM-yyyy')} )`}
						</div>
					</div>
				)}
				<div className={styles.lable}>
					Reason
				</div>
				<Textarea
					size="lg"
					value={comment}
					onChange={(val) => {
						setItem((pv) => ({
							...pv,
							comment     : val || undefined,
							is_reviewed : false,
						}));
					}}
					placeholder="Type here ..."
				/>
			</div>
		</div>
	);
}

export default UpdatePip;
