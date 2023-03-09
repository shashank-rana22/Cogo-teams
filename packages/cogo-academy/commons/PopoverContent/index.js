import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function PopOverContent({
	source = '',
	onCLickYesButton = () => {},
	onClickNoButton = () => {},
	loading = false,
}) {
	return (
		<div className={styles.container}>

			<div className={styles.header}>
				Confirm your action
			</div>

			<div className={styles.text_wrapper}>
				Are you sure want to delete this
				{' '}
				{source}
			</div>

			<div className={styles.button_container}>
				<div style={{ marginRight: '8px' }}>
					<Button
						size="sm"
						themeType="tertiary"
						onClick={onClickNoButton}
						disabled={loading}
					>
						NO

					</Button>
				</div>

				<Button
					size="sm"
					themeType="primary"
					onClick={onCLickYesButton}
					loading={loading}
				>
					YES

				</Button>

			</div>

		</div>
	);
}

export default PopOverContent;
