import { RadioGroup, Textarea } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { addDays, isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

function UpdatePip({
	item = {},
	setDisableNext = () => {},
	setItem = () => {},
}) {
	const { final_decision:value = '', comment = '' } = item;
	const extended_date = addDays(new Date(item.end_date), 30);

	const radioList = [
		{ name: 'R2', value: 'confirmed', label: 'Confirm' },
		{
			name  : 'R1',
			value : item.log_type === 'pip' ? 'exited' : 'extended',
			label : item.log_type === 'pip' ? 'Exit' : 'Extend',
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
					<div className={styles.label}>{item.log_type === 'pip' ? 'Start Date' : 'Joining Date'}</div>

					<div style={{ fontWeight: 'bold' }}>
						{item.start_date ? formatDate({
							date       : item.start_date,
							formatType : 'date',
							dateFormat : 'dd MMM yyyy',
						})
							: '---'}

					</div>
				</div>

				<div className={styles.update_dates}>
					<div className={styles.label}>End Date</div>

					<div style={{ fontWeight: 'bold' }}>
						{item.end_date
							? formatDate({
								date       : item.end_date,
								formatType : 'date',
								dateFormat : 'dd MMM yyyy',
							}) : '---'}

					</div>
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
						extended_date  : val === 'extended' ? formatDate({
							date       : extended_date,
							formatType : 'date',
							dateFormat : 'dd MMM yyyy',
						}) : undefined,
					}));
				}}
			/>

			<div className={styles.dates}>
				{value === 'extended' && (
					<div className={styles.extend_date}>
						<div className={styles.label}>
							{` ( Will be Extended to : ${formatDate({
								date       : extended_date,
								formatType : 'date',
								dateFormat : 'dd MMM yyyy',
							})} )`}
						</div>
					</div>
				)}
				<div className={styles.label}>
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
