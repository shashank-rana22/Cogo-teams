import { Button } from '@cogoport/components';
import { IcMRedo, IcMUndo } from '@cogoport/icons-react';

import useUpdateDynamicPage from '../../../../../../hooks/useUpdateDynamicPage';

import styles from './styles.module.css';

function Header(props) {
	const {
		modeType,
		setMode,
		handleUnselectItem,
		pageConfiguration,
		redoUndoIndex,
		lastEventIndex,
		goBack,
		goForward,
	} = props;

	const { handleSave } = useUpdateDynamicPage();

	const canUndo = redoUndoIndex > 0;

	const canRedo = redoUndoIndex < lastEventIndex;

	return (
		<section className={styles.header}>
			<div className={styles.button_wrapper}>
				{modeType === 'edit' && (
					<div className={styles.button_flex}>
						<button
							className={styles.button_group}
							onClick={goBack}
							disabled={!canUndo}
						>
							<IcMUndo height="16px" width="16px" />
						</button>

						<button
							className={styles.button_group}
							onClick={goForward}
							disabled={!canRedo}
						>
							<IcMRedo height="16px" width="16px" />
						</button>
					</div>
				)}

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
