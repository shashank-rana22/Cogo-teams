import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

function FeedBackContent({ feedback, onClickEdit = () => {}, source = '' }) {
	const { general } = useSelector((state) => state);
	const { feedbackId:id = '' } = general.query || {};

	const {
		suggested_answer = '',
		suggested_question_abstract = '',
		author = {},
		updated_at,
		remark,
		id:feedbackId = '',
	} = feedback || {};

	const { name = '', picture = '' } = author?.[0] || {};

	const remarkContent = (remark || '').split('.') || [];

	return (
		<div>
			<div className={styles.time_stamp}>
				{formatDate({
					date       : updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'date',
				})}
				,
				{' '}
				{formatDate({
					date       : updated_at,
					timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
					formatType : 'time',

				})}

			</div>

			<div
				className={styles.card}
				style={{ borderColor: feedbackId === id ? 'red' : '#ddd' }}
			>
				<div className={styles.card_header}>
					<Avatar
						src={picture || 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/img_avatar.png'}
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
							{suggested_answer || '-'}

						</div>
						{suggested_answer
						&& source !== 'create' && (
							<div
								className={styles.anchor_text}
								role="presentation"
								onClick={() => onClickEdit(feedbackId)}
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
