import { Toast, cl, Modal, Textarea, Button } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';

function MarkAsClosed() {
	const [selectPill, setSelectPill] = useState('');
	const [inputValue, setInputValue] = useState('');

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
	};

	const handleSubmit = async () => {
		if (!isEmpty(selectPill) && !isEmpty(inputValue)) {
			// await communicationLogApi();
		} else {
			Toast.error('Enter details');
		}
	};

	const handleReset = () => {
		setInputValue('');
		setSelectPill('');
	};

	return (
		<div className={styles.feed_div}>

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
						<Button size="md" themeType="tertiary" onClick={handleReset}>Reset</Button>
						<Button
							size="md"
							themeType="accent"
								// disabled={loading}
							onClick={handleSubmit}
						>
							Submit

						</Button>
					</div>
				</div>
			</Modal.Body>

		</div>
	);
}
export default MarkAsClosed;
