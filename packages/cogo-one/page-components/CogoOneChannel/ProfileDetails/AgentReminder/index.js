import { Toast, Button, Timepicker, Input, Datepicker, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateCommunicationLog from '../../../../hooks/useCreateCommunication';
import useGetListCommunicationLog from '../../../../hooks/useGetListCommunicationLog';
import FormatData from '../../../../utils/formatData';

import PreviousReminder from './PreviousReminder';
import styles from './styles.module.css';

function AgentReminder({ activeMessageCard, activeTab, activeVoiceCard }) {
	const {
		orgId = '',
	} = FormatData({ activeMessageCard, activeTab, activeVoiceCard });

	const [inputValue, setInputValue] = useState({
		title       : '',
		description : '',
	});
	const [date, setDate] = useState('');
	const [time, setTime] = useState({
		start_time : '',
		end_time   : '',
	});

	const {
		listData = {},
		fetchListLogApi = () => {},
		listLoading,
	} = useGetListCommunicationLog({ activeMessageCard, activeVoiceCard });
	const { createLogApi, loading } = useCreateCommunicationLog({
		setInputValue,
		setDate,
		setTime,
		fetchListLogApi,
		activeMessageCard,
		activeTab,
		activeVoiceCard,
	});

	const handleSubmit = async () => {
		if (!isEmpty(inputValue) || !isEmpty(date) || !isEmpty(time)) {
			await createLogApi({ inputValue, date, time });
		} else {
			Toast.error('Enter details');
		}
	};

	const handleReset = () => {
		setInputValue({
			title       : '',
			description : '',
		});
		setDate('');
		setTime({
			start_time : '',
			end_time   : '',
		});
	};

	if (orgId === '') {
		return (
			<div className={styles.empty_container}>No Data Found...</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>Set Reminder</div>
			<div className={styles.wrapper}>
				<div className={styles.label}>Title</div>
				<Input
					size="md"
					placeholder="Type here..."
					required
					value={inputValue?.title}
					onChange={(val) => setInputValue((q) => ({ ...q, title: val }))}
				/>
			</div>
			<div className={styles.date_wrapper}>
				<div className={styles.label}>Select a date</div>
				<Datepicker
					placeholder="Enter Date"
					dateFormat="MM/dd/yyyy"
					showTimeSelect={false}
					name="date"
					onChange={setDate}
					value={date}
				/>
				<div className={styles.time_container}>
					<div className={styles.start_time}>
						<div className={styles.time_title}>Start Time</div>
						<div className={styles.wrap_start}>
							<Timepicker
								name="date"
								timeIntervals={1}
								value={time?.start_time}
								isClearable
								onChange={(a) => setTime((p) => ({ ...p, start_time: a }))}
							/>
						</div>
					</div>
					<div className={styles.end_time}>
						<div className={styles.time_title}>End Time</div>
						<div className={styles.wrap_end}>
							<Timepicker
								name="date"
								timeIntervals={1}
								value={time?.end_time}
								className="input_time"
								onChange={(a) => setTime((p) => ({ ...p, end_time: a }))}
							/>
						</div>
					</div>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.label}>Summary</div>
					<Textarea
						name="a5"
						size="md"
						placeholder="Description"
						value={inputValue?.description}
						onChange={(val) => setInputValue((q) => ({ ...q, description: val }))}
					/>
				</div>

				<div className={styles.button_container}>
					<div
						role="presentation"
						className={styles.reset_button}
						onClick={handleReset}
					>
						Reset
					</div>
					<div className={styles.set_button}>
						<Button
							size="md"
							themeType="primary"
							onClick={handleSubmit}
							disabled={loading}
						>
							Set reminder
						</Button>
					</div>
				</div>
				<PreviousReminder listData={listData} listLoading={listLoading} />
			</div>
		</div>
	);
}
export default AgentReminder;
