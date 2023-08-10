import { Input, Button } from '@cogoport/components';

import styles from './styles.module.css';

function RejectPopoverContent({ id, onClickSubmitButton, inputValue, setInputValue, setShowRejectPopover }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Reason for Rejection
			</div>
			<Input
				size={200}
				value={inputValue}
				onChange={setInputValue}
			/>

			<div className={styles.button_wrapper}>
				<div style={{ paddingRight: 10 }}>
					<Button
						size="sm"
						themeType="secondary"
						onClick={() => setShowRejectPopover(null)}
					>
						Cancel
					</Button>
				</div>

				<Button
					type="submit"
					size="sm"
					themeType="primary"
					onClick={() => onClickSubmitButton(id)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default RejectPopoverContent;
