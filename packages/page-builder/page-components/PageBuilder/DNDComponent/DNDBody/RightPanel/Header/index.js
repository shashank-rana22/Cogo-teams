import { Button, ButtonIcon } from '@cogoport/components';
import { IcMArrowBack, IcMDesktop, IcMMobile, IcMRedo, IcMUndo } from '@cogoport/icons-react';

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
		setPreviewMode,
		isMobile,
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
						setPreviewMode('desktop');
					}}
					type="button"
					size="md"
					themeType="secondary"
				>
					{modeType === 'edit' ? 'Preview' : <IcMArrowBack />}

				</Button>

			</div>

			<div className={styles.preview_icons}>
				{modeType === 'preview' && !isMobile && (

					<div>
						<ButtonIcon
							size="lg"
							className={styles.ui_buttonicon_container}
							icon={<IcMMobile />}
							onClick={() => setPreviewMode('mobile')}
							style={{ marginRight: '8px' }}
							themeType="primary"
						/>
						<ButtonIcon
							size="lg"
							className={styles.ui_buttonicon_container}
							onClick={() => setPreviewMode('desktop')}
							icon={<IcMDesktop />}
							themeType="primary"
						/>
					</div>

				)}

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
