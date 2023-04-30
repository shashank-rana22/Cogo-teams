import { Button } from '@cogoport/components';

import useUpdateDynamicPage from '../../../../../../hooks/useUpdateDynamicPage';

import styles from './styles.module.css';

function Header(props) {
	const {
		modeType,
		setMode,
		handleUnselectItem,
		pageConfiguration,
	} = props;

	const { handleSave } = useUpdateDynamicPage();

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
					onClick={() => handleSave(pageConfiguration, 'save')}
					type="button"
					size="md"
					themeType="secondary"
				>
					Save

				</Button>
				<Button
					type="button"
					onClick={() => handleSave(pageConfiguration, 'close')}
					size="md"
				>
					Save & Close

				</Button>
			</div>
		</section>
	);
}

export default Header;
