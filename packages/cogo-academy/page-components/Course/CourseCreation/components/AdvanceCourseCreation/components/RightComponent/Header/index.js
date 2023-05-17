import { Tags, Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import useUpdateCourse from '../../../hooks/useUpdateCourse';

import MAPPING from './MAPPING';
import styles from './styles.module.css';

function Header({
	activeTab,
	id,
	childRef,
	getCogoAcademyCourse,
	data,
	setActiveTab,
}) {
	const { name, status = 'draft' } = data || {};

	const { title, text } = MAPPING[activeTab] || {};

	const { loading, updateCourse } = useUpdateCourse({ getCogoAcademyCourse, setActiveTab, activeTab });

	const handleSubmitForm = () => {
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
					<div className={styles.title}>{name}</div>

					<Tags
						size="md"
						items={[{
							disabled : false,
							children : status,
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
