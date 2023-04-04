/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, Datepicker, Textarea, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EmptyState from '../../../../common/EmptyState';
import useCreateCommunicationLog from '../../../../hooks/useCreateCommunication';
import useGetListCommunicationLog from '../../../../hooks/useGetListCommunicationLog';

import PreviousReminder from './PreviousReminder';
import styles from './styles.module.css';

function AgentReminder({ activeMessageCard, activeTab, activeVoiceCard, formattedMessageData, customerId }) {
	const [showReminder, setShowReminder] = useState(false);
	const { organization_id:messageOrgId = null, user_id: messageUserId = null } = formattedMessageData || {};
	const { organization_id:voiceOrgId = null, user_id: voiceUserId = null } = activeVoiceCard || {};
	const organizationId = activeTab === 'message' ? messageOrgId : voiceOrgId;
	const userId = activeTab === 'message' ? messageUserId : voiceUserId;

	const [inputValue, setInputValue] = useState({
		title       : '',
		description : '',
	});
	const [date, setDate] = useState(null);

	const {
		listData = {},
		fetchListLogApi = () => {},
		listLoading,
		firstLoading,
		handleScroll,
		resetList,
	} = useGetListCommunicationLog({ organizationId, userId });

	const { createLogApi, loading } = useCreateCommunicationLog({
		setInputValue,
		setDate,
		fetchListLogApi,
		activeMessageCard,
		activeTab,
		activeVoiceCard,
		resetList,
	});

	const { list = [] } = listData || {};

	const handleSubmit = async () => {
		if (((inputValue?.title) && (inputValue?.description) && date)) {
			await createLogApi({ inputValue, date });
		}
	};

	const handleReset = () => {
		setInputValue({
			title       : '',
			description : '',
		});
		setDate('');
	};

	useEffect(() => {
		if (showReminder) {
			setShowReminder(false);
		}
	}, [customerId]);

	const handleReminder = () => {
		setShowReminder(true);
	};

	const emptyCheck = !((inputValue?.title) && (inputValue?.description) && date);

	if (isEmpty(list) && !showReminder && !listLoading && !firstLoading && !organizationId) {
		return (
			<EmptyState
				type="reminder"
				handleReminder={handleReminder}
				userId={userId}
				organizationId={organizationId}
			/>
		);
	}

	return (
		(showReminder || organizationId)
			&& firstLoading ? (
				<div className={styles.loader_div}>
					<Loader
						themeType="primary"
						style={{ width: '50px', display: 'flex', justifyContent: 'center', alignItem: 'center' }}
					/>
				</div>
			) : (

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
								rows={3}
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
									disabled={emptyCheck}
									loading={loading}
								>
									Set reminder
								</Button>
							</div>
						</div>
						<PreviousReminder listData={listData} listLoading={listLoading} handleScroll={handleScroll} />
					</div>
				</div>
			)
	);
}
export default AgentReminder;
