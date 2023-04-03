import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { Image, useRouter } from '@cogoport/next';
import { useMemo } from 'react';

import styles from './styles.module.css';
import useCreateTestUserMapping from './useCreateTestUserMapping';

function Introduction({ setActiveState, testData = {} }) {
	const router = useRouter();

	const {
		set_data,
		case_study_questions,
		stand_alone_questions,
		test_duration,
		name,
		guidelines = [],
	} = testData || {};

	const { passStartTime } = useCreateTestUserMapping();

	const formatArrayValues = useMemo(
		() => {
			const formattedItem = set_data?.map((item) => item.topic);
			return formattedItem?.join(',  ') || '';
		},
		[set_data],
	);

	const handleStartExam = async () => {
		await passStartTime();

		setActiveState('ongoing');
		localStorage.setItem('visibilityChangeCount', 1);

		const elem = document.getElementById('maincontainer');

		if (elem?.requestFullscreen) {
			elem?.requestFullscreen();
		} else if (elem?.webkitRequestFullscreen) { /* Safari */
			elem?.webkitRequestFullscreen();
		} else if (elem?.msRequestFullscreen) { /* IE11 */
			elem?.msRequestFullscreen();
		}
	};

	const items = [
		'Exam can be only taken in full screen',
		'To Start test, please click on Begin Test',
		`Changing tabs is not allowed in between exam, If 
		you switch tabs more than 2 times, your exam will be submitted automatically`,
		'To submit the test, please click on submit test button',
		'click on cancel if you dont want to start exam now',
		'The timer will start once you start the exam',
	];

	return (
		<div className={styles.container}>
			<div className={styles.top_container}>
				<div className={styles.heading}>
					{name}
				</div>

				<div className={styles.content}>
					<div className={styles.content_container}>
						<Image
							width={18}
							height={22}
							className={styles.image}
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/document-svg.svg"
							alt=""
						/>

						<div className={styles.content_text}>
							<div className={styles.label}>Topics Covered</div>
							<div className={styles.value}>{formatArrayValues}</div>
						</div>
					</div>

					<div className={`${styles.right_content} ${styles.content_container}`}>
						<div className={styles.content_text}>
							<div className={styles.label}>No. of questions</div>
							<div className={styles.value}>
								{case_study_questions}
								{' '}
								Case Study Questions,
								{stand_alone_questions}
								{' '}
								Standalone Questions
							</div>
						</div>
						<div className={styles.content_container}>
							<Image
								width={18}
								height={22}
								className={styles.image}
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/timer-icon1.svg"
								alt=""
							/>

							<div className={styles.content_text}>
								<div className={styles.label}>Duration</div>
								<div className={styles.value}>
									{test_duration}
									{' '}
									min
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.instructions_container}>
				<div className={styles.title}>Test Instructions</div>
				<div>
					Please read all the instructions carefully before clicking on Begin Test.
					The timer will start once you click on Begin test
				</div>

				<ol className={styles.list}>
					{[...items, ...guidelines].map((item, index) => (
						<li key={item} className={`${styles.list} ${styles[`list_${index}`]}`}>
							{item}
						</li>
					))}
				</ol>
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					size="md"
					type="button"
					onClick={() => router.push('/learning/tests/dashboard')}
				>
					Go Back
				</Button>

				<Button type="button" size="md" onClick={() => handleStartExam()}>
					Begin test
					<IcMArrowRight />
				</Button>
			</div>
		</div>
	);
}

export default Introduction;
