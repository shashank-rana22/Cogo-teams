import { Avatar, Input, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMFtick } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';
import useCreateFaqQuestionAlias from './useCreateFaqQuestionAlias';

const DEFAULT_IMG = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/img_avatar.png';

function FeedBackContent({
	feedback,
	onClickEdit = () => {},
	source = '',
	fetchListFaqFeedback = () => {},
	fetchQuestion,

}) {
	const general = useSelector((state) => state.general || {});
	const { feedbackId: id = '' } = general.query || {};

	const {
		suggested_answer = '',
		suggested_question_abstract = '',
		author = {},
		updated_at,
		remark,
		id:feedbackId = '',
		is_suggestion_accepted = false,
	} = feedback || {};

	const {
		onClickAddAlias,
		showAliasInput,
		setShowAliasInput,
		inputAlias,
		setInputAlias,
		loading,
	} = useCreateFaqQuestionAlias({
		suggested_question_abstract,
		fetchListFaqFeedback,
		feedbackId,
		fetchQuestion,
	});

	const { name = '', picture = '' } = author?.[0] || {};

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
						src={picture || DEFAULT_IMG}
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

					{suggested_question_abstract
					&& (
						<div
							className={styles.anchor_text}
							role="presentation"
							style={{ cursor: !is_suggestion_accepted ? 'pointer' : 'default' }}
							onClick={() => (!is_suggestion_accepted ? setShowAliasInput(true) : null)}
						>
							{is_suggestion_accepted
								? (
									<div className={styles.updated_alias}>
										<div className={styles.icon_wrapper}>
											<IcMFtick width={24} height={24} fill="#028a0f" />
										</div>
										Suggested question has been successfully added as an alias.
									</div>
								) : 'Add as an Alias'}
						</div>
					)}

					{showAliasInput && (
						<div
							className={styles.alias_input}
							style={{ width: source === 'create' ? '100%' : '80%' }}
						>
							<Input
								size="sm"
								value={inputAlias}
								onChange={(value) => setInputAlias(value)}
							/>

							<div className={styles.button_wrapper}>
								<Button
									size="md"
									themeType="tertiary"
									onClick={() => setShowAliasInput(false)}
									disabled={loading}
									type="button"
								>
									Cancel
								</Button>
								<Button
									size="md"
									themeType="primary"
									onClick={onClickAddAlias}
									loading={loading}
									type="submit"

								>
									Submit
								</Button>
							</div>
						</div>
					)}

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
						{remark ? <div className={styles.answer_content}>{remark}</div> : '-'}
					</div>
				</div>
			</div>
		</div>
	);
}

export default FeedBackContent;
