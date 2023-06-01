import { Pill, Tooltip } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function CategoriesCard({ data, setCurrentCategory }) {
	const router = useRouter();

	const allpills = (item) => (
		<div key={item?.topic_id}>
			{item?.map((tag, i) => (i >= 1 ? (
				<Pill>{tag?.topic_name}</Pill>
			) : null))}
		</div>
	);

	return (
		<div
			className={styles.container}
			role="button"
			tabIndex="0"
			onClick={() => {
				setCurrentCategory(data?.id);
				router.push('/learning/course?viewType=all_courses');
			}}

		>
			<div className={styles.title}>{data?.display_name}</div>

			<div className={styles.details}>

				<div className={styles.image_box} />
				<div>
					<div className={styles.pill_box}>
						{data?.topics?.slice(0, 1).map((item) => (
							<Pill size="md" className={styles.pill}>
								{item?.topic_name}
							</Pill>
						))}

						{data?.topics?.length > 2 ? (
							<Tooltip
								content={allpills(data?.topics)}
								placement="right"
								theme="light"
								styles={{ marginBottom: '24px' }}
							>
								<Pill>
									+
									{data.topics.length - 1}
									{' '}
									Topics
								</Pill>
							</Tooltip>
						)
							:						null}
					</div>
					<div className={styles.courses}>
						{data?.course_count}
						{' '}
						Courses
					</div>
				</div>

			</div>

		</div>
	);
}

export default CategoriesCard;
