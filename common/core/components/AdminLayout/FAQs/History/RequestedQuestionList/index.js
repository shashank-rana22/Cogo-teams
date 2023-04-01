import { Pill, Tooltip } from '@cogoport/components';
import { isEmpty, format } from '@cogoport/utils';
import { useEffect, useMemo } from 'react';

import Loader from '../../Loader';

import styles from './styles.module.css';

const STATE_MAPPING = {
	published : 'Answered',
	requested : 'Requested',
	draft     : 'Requested',
};

function RequestedQuestionList({
	setQuestion,
	question,
	list,
	getUserFaqs,
	loading,
}) {
	useEffect(() => {
		if (!question?.id) {
			getUserFaqs();
		}
	}, [getUserFaqs, question?.id]);

	const today = new Date();
	const formatToday = format(today, 'dd MMMM');
	const yesterday = new Date(today.getTime() - 86400000); // 86400000 is the number of milliseconds in a day
	const formatYesterday = format(yesterday, 'dd MMMM');

	const filteredObject = useMemo(() => {
		const modifiedFilteredObject = {};

		(list || []).forEach((listItem) => {
			const { created_at, question_abstract, state, is_viewed, id } = listItem || {};
			if (!created_at || !question_abstract) return;

			const date = format(created_at, 'dd MMMM');
			const time = format(created_at, 'hh:mm aa');

			if (!modifiedFilteredObject[date]) modifiedFilteredObject[date] = [];

			modifiedFilteredObject[date].push({
				requestedQuestion: question_abstract,
				time,
				state,
				is_viewed,
				id,
			});
		});

		return modifiedFilteredObject;
	}, [list]);

	const sortedDates = Object.keys(filteredObject || {})
		.map((item) => item)
		.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

	function handleBackgroundColor({ state, is_viewed }) {
		if (state !== 'published') {
			return '#FEF199';
		}

		if (is_viewed) {
			return '#F7FAEF';
		}

		return '#C4DC91';
	}

	const DAY_MAPPING = {
		[formatToday]     : 'Today',
		[formatYesterday] : 'Yesterday',
	};

	const renderText = () => (
		<div style={{ color: '#000' }}>
			Answer is not available
		</div>
	);

	if (loading) return <Loader />;

	if (isEmpty(list)) {
		return <div className={styles.empty_state_wrapper}>No Requested Question Found</div>;
	}

	return (
		<div className={styles.container}>
			{sortedDates.map((ele) => (

				<div className={styles.question_division}>

					<div className={styles.header}>{DAY_MAPPING[ele] || ele}</div>

					{(filteredObject[ele] || []).map((a) => {
						const { requestedQuestion, time, state, is_viewed, id } = a || {};
						const selectedQuestion = (list || []).find(
							(element) => element.id === id,
						);
						return state === 'requested' ? (
							<Tooltip
								theme="light-border"
								content={renderText()}
								interactive
							>
								<div
									className={styles.question_time_container}
									style={{
										backgroundColor : !is_viewed ? '#fdfbf6' : '#ffffff',
										cursor          : 'not-allowed',
									}}

								>
									<div
										className={styles.pills_question_wrapper}

									>
										<Pill
											color={handleBackgroundColor({ state, is_viewed })}
										>
											{STATE_MAPPING[state]}
										</Pill>
										<div className={styles.question_wrapper}>
											{requestedQuestion}
										</div>
									</div>

									<div className={styles.time_wrapper}>{time}</div>
								</div>
							</Tooltip>
						) : (
							<div
								role="presentation"
								className={styles.question_time_container}
								style={{ backgroundColor: !is_viewed ? '#fdfbf6' : '#ffffff', cursor: 'pointer' }}
								onClick={() => setQuestion(selectedQuestion)}
							>
								<div className={styles.pills_question_wrapper}>
									<Pill
										color={handleBackgroundColor({ state, is_viewed })}
									>
										{STATE_MAPPING[state]}
									</Pill>
									<div className={styles.question_wrapper}>{requestedQuestion}</div>
								</div>

								<div className={styles.time_wrapper}>{time}</div>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}

export default RequestedQuestionList;
