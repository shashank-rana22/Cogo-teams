import { Tags, Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import useUpdateCourse from '../../../hooks/useUpdateCourse';

import CURRENT_TO_NEXT_MAPPING from './CURRENT_TO_NEXT_MAPPING';
import MAPPING from './MAPPING';
import styles from './styles.module.css';

function Header({
	activeTab,
	setActiveTab,
	id,
	childRef,
	getCogoAcademyCourse,
}) {
	const { title, text } = MAPPING[activeTab];

	const { loading, updateCourse } = useUpdateCourse({ setActiveTab, activeTab, getCogoAcademyCourse });

	const handleSubmitForm = () => {
		if (activeTab === 'overview') {
			setActiveTab(CURRENT_TO_NEXT_MAPPING[activeTab]);
			return;
		}

		childRef.current[activeTab]?.handleSubmit().then((res) => {
			if (!res.hasError) {
				updateCourse({ activeTab, values: res.values, id });
			}
		});
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
						onClick={handleSubmitForm}
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
