import { Avatar } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function FeedBackContent({ feedback, onClickEdit = () => {}, id, source = '' }) {
	const {
		suggested_answer = '',
		suggested_question_abstract = '',
		author = {},
		updated_at,
		remark = '',
	} = feedback || {};

	const { name = '' } = author?.[0] || {};

	const remarkContent = (remark || '').split('.');

	const formatdated = format(updated_at, 'dd MMM, yyyy hh:mm a');

	return (
		<div>
			<p className={styles.time_stamp}>{formatdated}</p>

			<div className={styles.card}>
				<div className={styles.card_header}>
					<Avatar
						src="https://www.w3schools.com/howto/img_avatar.png"
						alt="img"
						size="40px"
					/>
					<h3 className={styles.card_header_name}>
						{name}
						{' '}
						Said :
					</h3>
				</div>
				<div className={styles.card_body}>
					<div className={styles.question_container}>
						<div className={styles.body_heading}>Question</div>
						<div className={styles.question_abstract}>
							{suggested_question_abstract || '-'}

						</div>

					</div>

					<div className={styles.answer_container}>
						<div className={styles.body_heading}>Answer</div>
						<div className={styles.answer_content}>
							{suggested_answer ? <div dangerouslySetInnerHTML={{ __html: suggested_answer }} /> : '-'}

						</div>
						{suggested_answer
						&& source !== 'create' && (
							<div
								className={styles.anchor_text}
								role="presentation"
								onClick={() => onClickEdit(id)}
							>
								Edit Answer
							</div>
						)}

					</div>

					<div className={styles.answer_container}>
						<div className={styles.body_heading}>Remark</div>
						{remark ? <div className={styles.answer_content}>{remarkContent.pop()}</div> : '-'}
					</div>
				</div>
			</div>
		</div>
	);
}

export default FeedBackContent;
