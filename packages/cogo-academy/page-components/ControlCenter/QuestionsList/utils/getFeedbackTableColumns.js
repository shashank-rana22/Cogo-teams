import { Pill, Button, Tooltip } from '@cogoport/components';
import { IcMLiveChat } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import styles from '../styles.module.css';

const finalTagsToDisplay = (tags) => {
	const tagsToDisplay = tags.map((tag) => ({
		label : tag,
		size  : 'md',
	}));
	return tagsToDisplay.length > 3 ? [...tagsToDisplay.slice(0, 3), {
		label : `+${tagsToDisplay.length - 3} more`,
		size  : 'md',
	}] : tagsToDisplay;
};
const truncate = (str) => (str?.length > 38 ? `${startCase(str.substring(0, 36))}...` : startCase(str));

const columns = ({
	onClickEditButton = () => {},
	onClickViewButton = () => {},
}) => [
	{
		Header   : 'QUESTIONS',
		accessor : (item) => (
			<Tooltip content={item?.question_abstract} placement="right">
				<div>{truncate(item?.question_abstract)}</div>
			</Tooltip>

		),
	},
	{
		Header   : 'TOPICS',
		accessor : (item) => {
			const tags = [];
			(item.faq_topics
				|| []).map((ele) => {
				const { display_name } = ele || {};
				tags.push(display_name);
				return tags;
			});
			return (
				<div className={styles.pills}>

					{(finalTagsToDisplay(tags) || []).map((ele) => (
						<Pill
							className={styles.questions_tag}
							key={ele.label}
							size="sm"
							color="white"
						>
							{ele.label}
						</Pill>
					))}
				</div>
			);
		},
	},
	{
		Header   : 'Feedbacks',
		accessor : (item) => (
			<div className={styles.feedback_count_space}>
				<IcMLiveChat height={20} width={20} />
				<b className={styles.feedback_count}>{item?.total_downvote_count}</b>
			</div>
		),
	},
	{
		id     : 'LAST UPDATED AT',
		Header : (
			<div role="presentation" className={styles.sort_title}>
				LAST UPDATED AT
			</div>
		),
		accessor: (items) => {
			const formatDate = format(items?.last_updated_feedback?.last_feedback_at
				|| items?.created_at, 'dd MMM yyyy hh:mm a');
			return (
				<div>
					{formatDate}
				</div>
			);
		},
	},
	{
		Header   : 'ACTIONS',
		accessor : (item) => (
			<div className={styles.button_container}>
				<Button
					type="button"
					themeType="secondary"
					size="sm"
					style={{ marginRight: 8 }}
					onClick={() => onClickEditButton(item?.id)}
				>
					EDIT
				</Button>

				<Button
					type="button"
					themeType="primary"
					size="sm"
					style={{ marginRight: 8 }}
					onClick={() => onClickViewButton(item?.id)}
				>
					VIEW
				</Button>

			</div>
		),
	},
];

export default columns;
