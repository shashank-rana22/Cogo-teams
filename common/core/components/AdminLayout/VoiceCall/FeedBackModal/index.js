import { cl, Modal, Textarea, Button } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState } from 'react';

import useCreateCommunicationLog from '../hooks/useCreateCommunicationLog';

import styles from './styles.module.css';

function FeedbackModal() {
	const [selectPill, setSelectPill] = useState('');
	const [inputValue, setInputValue] = useState('');
	const dispatch = useDispatch();
	const profileData = useSelector(({ profile }) => profile);
	const showFeedbackModal = profileData?.voice_call?.showFeedbackModal || false;

	const { communicationLogApi, loading } = useCreateCommunicationLog({
		selectPill,
		setInputValue,
		setSelectPill,
		inputValue,
	});
	const DEFAULT_PILLS_ITEMS = [
		{
			label : 'Introductory',
			value : 'introductory',
		},
		{
			label : 'Sales',
			value : 'sales',
		},
		{
			label : 'Rate enquiry',
			value : 'rate_enquiry',
		},
		{
			label : 'Payment recovery',
			value : 'payment_recovery',
		},
		{
			label : 'Other',
			value : 'other',
		},
	];
	const handleSelect = (val) => {
		setSelectPill((prev) => {
			if (prev !== val) {
				return val;
			}
			return '';
		});
		// setActivePill(true);
	};

	const handleSubmit = async () => {
		await communicationLogApi();
		dispatch(
			setProfileState({
				...profileData,
				voice_call: {
					...profileData.voice_call,
					showFeedbackModal : false,
					inCall            : false,
					endCall           : false,
				},
			}),
		);
	};

	return (
		<div className={styles.feed_div}>
			<Modal show={showFeedbackModal} size="sm">
				<Modal.Body>
					<div className={styles.feed_content}>
						<div className={styles.feed_title}>Feedback</div>
						<div className={styles.feed_head}>Reason for contact ?</div>
						<div className={styles.pill_div}>
							{DEFAULT_PILLS_ITEMS.map((item) => {
								const { label, value } = item;
								return (
									<div
										role="presentation"
										className={cl`${styles.pills} ${(selectPill === value) ? styles.active_pill : ''}`}
										onClick={() => handleSelect(value)}
									>
										{(selectPill === value) && <IcMTick width={20} height={20} />}
										{label}
									</div>

								);
							})}
						</div>
						<div className={styles.feed_text_area}>
							<Textarea
								name="a5"
								size="md"
								placeholder="Enter Remark"
								value={inputValue}
								onChange={(val) => setInputValue(val)}
							/>
						</div>
						<div className={styles.button_container}>
							<Button size="md" themeType="tertiary">Cancel</Button>
							<Button
								size="md"
								themeType="accent"
								disabled={loading}
								onClick={handleSubmit}
							>
								Submit

							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default FeedbackModal;
