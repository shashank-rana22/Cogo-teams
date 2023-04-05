import { Pill, Button } from '@cogoport/components';
import { IcMLiveChat, IcMArrowNext } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

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

const columns = ({
	onClickEditButton = () => {},
	onClickViewButton = () => {},
}) => [
	{
		Header   : 'QUESTIONS',
		accessor : (item) => (
			<div>
				{item?.question_abstract}
			</div>
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
			<div role="presentation" className={styles.sort_title} onClick={() => setSortType((prev) => !prev)}>
				LAST UPDATED AT
				<IcMArrowNext
					height={14}
					width={14}
					className={styles.sort_arrow}
					style={{ transform: true ? 'rotate(270deg)' : '' }}
				/>
			</div>
		),
		accessor: (items) => {
			const formatDate = format(items?.updated_at || items?.created_at, 'dd MMM yyyy hh:mm a');
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
