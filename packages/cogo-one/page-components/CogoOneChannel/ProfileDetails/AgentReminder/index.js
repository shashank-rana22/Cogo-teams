import { Toast, Button, Input, Datepicker, Textarea } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';
import useCreateCommunicationLog from '../../../../hooks/useCreateCommunication';
import useGetListCommunicationLog from '../../../../hooks/useGetListCommunicationLog';

import PreviousReminder from './PreviousReminder';
import styles from './styles.module.css';

function AgentReminder({ activeMessageCard, activeTab, activeVoiceCard, FormattedMessageData }) {
	const { organization_id:messageOrgId = null } = FormattedMessageData || {};
	const { organization_id:voiceOrgId = null } = activeVoiceCard || {};
	const organizationId = activeTab === 'message' ? messageOrgId : voiceOrgId;
	const [inputValue, setInputValue] = useState({
		title       : '',
		description : '',
	});
	const [date, setDate] = useState('');

	const {
		listData = {},
		fetchListLogApi = () => {},
		listLoading,
	} = useGetListCommunicationLog({ organizationId });
	const { createLogApi, loading } = useCreateCommunicationLog({
		setInputValue,
		setDate,
		fetchListLogApi,
		activeMessageCard,
		activeTab,
		activeVoiceCard,
	});

	const handleSubmit = async () => {
		if (!isEmpty(inputValue) || !isEmpty(date)) {
			await createLogApi({ inputValue, date });
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
	};

	if (!organizationId) {
		return <EmptyState type="reminder" />;
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
					dateFormat="MM/dd/yyyy hh:mm a"
					showTimeSelect
					name="date"
					onChange={setDate}
					value={date}
					use12hourformat={false}
				/>
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
