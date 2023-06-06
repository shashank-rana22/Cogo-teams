import { Tags, Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import useUpdateCourse from '../../../hooks/useUpdateCourse';

import MAPPING from './MAPPING';
import styles from './styles.module.css';

const getState = ({ state, status }) => {
	if (status === 'inactive') {
		return { state: 'Inactive', color: '#ff8888' };
	}

	if (state === 'published') {
		return { state: 'Active', color: '#CFEAEC' };
	}

	return { state: 'Draft', color: '#fdd1a7' };
};

function Header({
	activeTab,
	id,
	childRef,
	getCogoAcademyCourse,
	data,
	setActiveTab,
	mode,
}) {
	const router = useRouter();

	const { name, status = 'draft', state = '' } = data || {};

	const { title, text } = MAPPING[activeTab] || {};

	const { state: currentState, color } = getState({ status, state });

	const { loading, updateCourse } = useUpdateCourse({
		data,
		getCogoAcademyCourse,
		setActiveTab,
		activeTab,
		changeTab: true,
	});

	const handleSubmitForm = ({ buttonType = 'save', values: payloadValues }) => {
		childRef.current[activeTab]?.handleSubmit().then((res) => {
			if (!res.hasError) {
				updateCourse({
					values            : buttonType === 'publish' ? { ...res.values, ...payloadValues } : res.values,
					isRefetchRequired : true,
					buttonType,
				});
			}
		});
	};

	const handlePreviewCourse = () => {
		router.push(`/learning/course/preview?course_id=${id}`);
	};

	const BUTTON_MAPPING = {
		pre_publish: [
			{
				buttonText      : 'Preview',
				themeType       : 'secondary',
				onClickFunction : handlePreviewCourse,
				funcProps       : {},
			},
			{
				buttonText      : 'Save',
				themeType       : 'primary',
				onClickFunction : handleSubmitForm,
				funcProps       : {},
			},
			{
				buttonText      : 'Publish',
				themeType       : 'accent',
				onClickFunction : handleSubmitForm,
				funcProps       : {
					buttonType : 'publish',
					values     : {
						id,
						state: 'published',
					},
				},
			},
		],
		others: [
			{
				buttonText      : 'Preview',
				themeType       : 'secondary',
				onClickFunction : handlePreviewCourse,
				funcProps       : {},
			},
			{
				buttonText      : 'Next',
				icon            : IcMArrowRight,
				themeType       : 'accent',
				onClickFunction : handleSubmitForm,
				funcProps       : {},
			},
		],
	};

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
		</>
	);
}

export default Header;
