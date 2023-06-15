import { Button } from '@cogoport/components';

import styles from '../styles.module.css';

function PopoverOptions({ disableButton, assignButtonAction, assignLoading }) {
	return (
		<div className={styles.button_container}>
			<Button
				themeType="secondary"
				size="md"
				disabled={disableButton}
				className={styles.styled_buttons}
				onClick={() => assignButtonAction('stop_and_assign')}
				loading={assignLoading && disableButton === 'stop_and_assign'}
			>
				Assign to me
			</Button>
			<Button
				themeType="secondary"
				size="md"
				disabled={disableButton}
				className={styles.styled_buttons}
				onClick={() => assignButtonAction('auto_assign')}
				loading={assignLoading && disableButton === 'auto_assign'}
			>
				Auto Assign
			</Button>
			<Button
				themeType="secondary"
				size="md"
				disabled={disableButton}
				className={styles.styled_button}
				onClick={() => assignButtonAction('assign')}
				loading={assignLoading && disableButton === 'assign'}
			>
				Assign
			</Button>
		</div>
	);
}

export default PopoverOptions;
