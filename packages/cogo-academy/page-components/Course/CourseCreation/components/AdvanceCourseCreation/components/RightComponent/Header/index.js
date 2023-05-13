import { Tags, Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import useUpdateCourse from '../useUpdateCourse';

import CURRENT_TO_NEXT_MAPPING from './CURRENT_TO_NEXT_MAPPING';
import MAPPING from './MAPPING';
import styles from './styles.module.css';

function Header({
	activeTab,
	handleSubmit = () => {},
	setActiveTab,
	id,
}) {
	const { title, text } = MAPPING[activeTab];

	const { loading, updateCourse } = useUpdateCourse();

	const onSubmit = (values) => {
		updateCourse({ activeTab, values, id });
		setActiveTab(CURRENT_TO_NEXT_MAPPING[activeTab]);
	};

	return (
		<>
			<div className={styles.top_container}>
				<div className={styles.left_part}>
					<div className={styles.title}>Course Trial ABC</div>

					<Tags
						size="md"
						items={[{
							disabled : false,
							children : 'draft',
							color    : '#FEF199',
							tooltip  : false,
						}]}
					/>
				</div>

				<div className={styles.right_part}>
					<Button
						type="button"
						themeType="accent"
						className={styles.button}
						onClick={(activeTab === 'overview'
							? () => { setActiveTab(CURRENT_TO_NEXT_MAPPING[activeTab]); } : handleSubmit(onSubmit))}
						loading={loading}
					>
						Next
						{' '}
						<IcMArrowRight width={16} height={16} />
					</Button>
				</div>
			</div>

			<div className={styles.bottom_container}>
				<div className={styles.title}>{title}</div>
				<div className={styles.text}>{text}</div>
			</div>
		</>
	);
}

export default Header;
