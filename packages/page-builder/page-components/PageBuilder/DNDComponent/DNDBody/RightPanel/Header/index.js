import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header({ modeType, setMode, handleUnselectItem }) {
	return (
		<section className={styles.header}>
			<div>
				<Button
					onClick={() => {
						setMode({ modeType: modeType === 'edit' ? 'preview' : 'edit' });
						handleUnselectItem();
					}}
					type="button"
					size="md"
					themeType="secondary"
				>
					{modeType === 'edit' ? 'Preview' : 'Back to editor'}

				</Button>
			</div>

			<div className={styles.button_container}>
				<Button
					style={{ marginRight: '8px' }}
					type="button"
					size="md"
					themeType="secondary"
				>
					Save

				</Button>
				<Button type="button" size="md">Save & Close</Button>
			</div>
		</section>
	);
}

export default Header;
