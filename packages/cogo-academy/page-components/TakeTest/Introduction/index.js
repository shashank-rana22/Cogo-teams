import { Modal, Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Introduction({ setActiveState, testData = {} }) {
	const { set_data, case_study_questions, stand_alone_questions, test_duration, name } = testData || {};

	const [showModal, setShowModal] = useState(false);

	const formatArrayValues = (items) => {
		const formattedItem = items?.map((item) => item.topic);
		return formattedItem?.join(',  ') || '';
	};

	const CONTENT_MAPPING = {
		topics_covered: {
			title : 'Topics Covered',
			value : formatArrayValues(set_data),
			icon  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/document-svg.svg',
		},
		number_of_questions: {
			title : 'No. of questions',
			value : `${case_study_questions} Case Study Questions,
					${stand_alone_questions} Standalone Questions`,
		},
		duration: {
			title : 'Duration',
			value : `${test_duration} min`,
			icon  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/timer-icon1.svg',
		},
	};
	// const time = new Date();
	// setStartTiming(time);

	const handleStartExam = () => {
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
		'To Start test, please click on Start',
		// eslint-disable-next-line max-len
		'You will be redirected to dashboard if you switch tabs.If you switch tabs more than 2 times, your exam will be submitted automatically',
		'To submit the test, please click on submit test button',
		'click on cancel if you dont want to start exam now',
		'The timer will start once you start the exam',
	];

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{name}
			</div>

			<div className={styles.content}>
				{Object.values(CONTENT_MAPPING).map((content) => {
					const { icon, title, value } = content;

					return (
						<div className={styles.content_container}>
							{icon ? <img style={{ width: 18, height: 21, marginRight: 12 }} src={icon} alt="" /> : null}

							<div className={styles.content_text}>
								<div className={styles.label}>{title}</div>
								<div className={styles.value}>{value}</div>
							</div>
						</div>
					);
				})}
			</div>

			{showModal ? (
				<Modal size="md" show className={styles.modal_container}>
					<Modal.Header title="Instructions" />

					<Modal.Body>
						<ul className={styles.list}>
							{items.map((item, index) => (
								<li key={item} className={`${styles.list} ${styles[`list_${index}`]}`}>
									{item}
								</li>
							))}
						</ul>
					</Modal.Body>

					<Modal.Footer>
						<Button
							type="button"
							size="md"
							style={{ marginRight: 10 }}
							themeType="secondary"
							onClick={() => setShowModal(false)}
						>
							cancel
						</Button>

						<Button
							type="button"
							size="md"
							onClick={handleStartExam}
						>
							Start
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}

			<div className={styles.button_container}>
				<Button type="button" onClick={() => setShowModal(true)}>
					Start your test
					{' '}
					<IcMArrowRight />
				</Button>
			</div>
		</div>
	);
}

export default Introduction;
