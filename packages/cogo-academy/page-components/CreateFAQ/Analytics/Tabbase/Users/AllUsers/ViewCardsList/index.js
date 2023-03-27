import { Tooltip } from '@cogoport/components';
import { IcMLike, IcMEyeopen } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ViewCardsList({ state = '', cardHeading = '', contentQuestion = [{}] }) {
	const truncate = (str) => (str?.length > 28 ? `${str.substring(0, 26)}...` : str);
	return (

		<div className={styles.primary_right}>
			<div className={styles.active_users}>
				<div className={styles.right_stat_label}>
					{cardHeading}
				</div>

				<div className={styles.sub_heading}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>

						<div style={{ marginLeft: '-9px' }}>
							<Tooltip content={contentQuestion[0]?.question_abstract} placement="right">
								<div>
									1.
									{truncate(contentQuestion[0]?.question_abstract)}
								</div>
							</Tooltip>

						</div>
						<div style={{ display: 'flex' }}>
							<div style={{ marginRight: '0.25rem' }}>
								{state === 'Viewed_Question'
									? contentQuestion[0]?.view_count : contentQuestion[0]?.upvote_count}

							</div>
							{state === 'Viewed_Question'
								? <IcMEyeopen style={{ marginTop: '0.15rem' }} />
								: <IcMLike style={{ marginTop: '0.15rem' }} />}
							{' '}

						</div>

					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>

						<div style={{ marginLeft: '-9px' }}>

							<Tooltip content={contentQuestion[1]?.question_abstract} placement="right">
								<div>
									2.
									{truncate(contentQuestion[1]?.question_abstract)}
								</div>
							</Tooltip>
						</div>
						<div style={{ display: 'flex' }}>
							<div style={{ marginRight: '0.25rem' }}>
								{state === 'Viewed_Question'
									? contentQuestion[1]?.view_count : contentQuestion[1]?.upvote_count}

							</div>
							{state === 'Viewed_Question'
								? <IcMEyeopen style={{ marginTop: '0.15rem' }} />
								: <IcMLike style={{ marginTop: '0.15rem' }} />}
							{' '}

						</div>

					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>

						<div style={{ marginLeft: '-9px' }}>
							<Tooltip content={contentQuestion[2]?.question_abstract} placement="right">
								<div>
									3.
									{truncate(contentQuestion[2]?.question_abstract)}
								</div>
							</Tooltip>

						</div>
						<div style={{ display: 'flex' }}>
							<div style={{ marginRight: '0.25rem' }}>

								{state === 'Viewed_Question'
									? contentQuestion[2]?.view_count : contentQuestion[2]?.upvote_count}
							</div>
							{state === 'Viewed_Question'
								? <IcMEyeopen style={{ marginTop: '0.15rem' }} />
								: <IcMLike style={{ marginTop: '0.15rem' }} />}
							{' '}

						</div>

					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>

						<div style={{ marginLeft: '-9px' }}>
							<Tooltip content={contentQuestion[3]?.question_abstract} placement="right">
								<div>
									4.
									{truncate(contentQuestion[3]?.question_abstract)}
								</div>
							</Tooltip>

						</div>
						<div style={{ display: 'flex' }}>
							<div style={{ marginRight: '0.25rem' }}>

								{state === 'Viewed_Question'
									? contentQuestion[3]?.view_count : contentQuestion[3]?.upvote_count}
							</div>
							{state === 'Viewed_Question'
								? <IcMEyeopen style={{ marginTop: '0.15rem' }} />
								: <IcMLike style={{ marginTop: '0.15rem' }} />}
						</div>

					</div>

				</div>

			</div>
		</div>

	);
}

export default ViewCardsList;
