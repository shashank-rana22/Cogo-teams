import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter, Image } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

import useGetUserSubmissionStats from '../hooks/useGetUserSubmissionStats';

import styles from './styles.module.css';

function Completion() {
	const {
		query: { test_id },
		user: { id: user_id },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const { push } = useRouter();

	const { data } = useGetUserSubmissionStats({ id: test_id, user_id });

	const {
		answered,
		marked_for_review,
		not_answered,
		not_visited,
		time_taken,
		total_questions,
	} = data?.data || {};

	const hours = Math.floor(parseInt(time_taken, 10) / 60);

	const remainingMinutes = parseInt(time_taken, 10) % 60;

	const formattedTime = `${hours.toString().padStart(2, '0')} : ${remainingMinutes.toString().padStart(2, '0')} hr`;

	const STATS_MAPPING = {
		answered: {
			title : 'Answered',
			value : answered,
		},
		viewed: {
			title : 'Not Answered',
			value : not_answered,
		},
		marked_for_review: {
			title : 'Marked for review',
			value : marked_for_review,
		},
		not_visited: {
			title : 'Not Visited',
			value : not_visited,
		},
	};

	const handleGoToDashboard = () => {
		push('/learning/tests/dashboard', '/learning/tests/dashboard', '_blank');

		// document.getElementById('container').innerHTML = 'redirecting ...'; TODO
	};

	return (
		<div id="container" className={styles.container}>
			<div className={styles.header}>
				<Image
					className={styles.image}
					width={32}
					height={32}
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/confetti.svg"
					alt=""
				/>
				<h2>Congratulations!</h2>
			</div>

			<h2>You have completed the test!</h2>

			<div className={styles.stats_and_time}>
				<div className={styles.stats}>
					{Object.values(STATS_MAPPING).map((stats_data) => {
						const { title, value } = stats_data;

						return (
							<div className={styles.content}>
								<div className={styles.label}>
									{title}
								</div>
								<div className={styles.value}>
									:
									{' '}
									{value}
									/
									{total_questions}
								</div>
							</div>
						);
					})}
				</div>

				<div className={styles.stats}>
					<div className={styles.content}>
						<div className={styles.label}>
							Time Taken
						</div>
						<div className={styles.value}>
							:
							{' '}
							{formattedTime}
						</div>
					</div>
				</div>

			</div>

			<div className={styles.bottom_text}>Dashboard will be updated as soon as Results have been Published!</div>

			<div className={styles.button_container}>
				<Button type="button" onClick={handleGoToDashboard}>
					<IcMArrowBack style={{ marginRight: 4 }} />
					Dashboard
				</Button>
			</div>
		</div>
	);
}

export default Completion;
