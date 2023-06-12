import { Tags, Button } from '@cogoport/components';

import MAPPING from './MAPPING';
import ModalComponent from './ModalComponent';
import styles from './styles.module.css';
import useHandleHeader from './useHandleHeader';

function Header({
	activeTab,
	id,
	childRef,
	getCogoAcademyCourse,
	data,
	setActiveTab,
	mode,
}) {
	const { name, status = 'draft', state = '' } = data || {};

	const { title, text } = MAPPING[activeTab] || {};

	const {
		getState,
		BUTTON_MAPPING,
		onPublishCourse,
		loading,
		publishData,
		setPublishData,
	} = useHandleHeader({ childRef, activeTab, getCogoAcademyCourse, setActiveTab, data, id });

	const { state: currentState, color } = getState({ status, state });

	return (
		<>
			<div className={styles.top_container}>
				<div className={styles.left_part}>
					<div className={styles.title}>{name}</div>

					<Tags
						size="md"
						items={[{
							disabled : false,
							children : currentState,
							color,
							tooltip  : false,
						}]}
					/>
				</div>

				{mode !== 'view' ? (
					<div className={styles.right_part}>
						{(BUTTON_MAPPING[activeTab] || BUTTON_MAPPING.others).map((buttonControls) => {
							const {
								buttonText,
								icon: IconToUse,
								themeType,
								onClickFunction,
								funcProps = {},
							} = buttonControls || {};

							if (state === 'published' && buttonText === 'Publish') {
								return null;
							}

							return (
								<Button
									key={buttonText}
									type="button"
									themeType={themeType}
									className={styles.button}
									onClick={() => onClickFunction({ ...funcProps })}
									loading={loading}
								>
									{buttonText}
									{' '}
									{IconToUse ? <IconToUse width={16} height={16} /> : null}
								</Button>
							);
						})}
					</div>
				) : null}
			</div>

			<div className={styles.bottom_container}>
				<div className={styles.title}>{title}</div>
				<div className={styles.text}>{text}</div>
			</div>

			<ModalComponent
				publishData={publishData}
				setPublishData={setPublishData}
				onPublishCourse={onPublishCourse}
				id={id}
				loading={loading}
			/>
		</>
	);
}

export default Header;
