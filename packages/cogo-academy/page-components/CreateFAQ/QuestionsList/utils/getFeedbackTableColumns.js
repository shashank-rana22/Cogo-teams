import { Pill, Button } from '@cogoport/components';
import { IcMLiveChat } from '@cogoport/icons-react';

// import styles from '../styles.module.css';

const tags = ['one', 'two', 'three', 'four'];

const tagsToDisplay = tags.map((tag) => ({
	label : tag,
	size  : 'md',
}));

const finalTagsToDisplay = tagsToDisplay.length > 3 ? [...tagsToDisplay.slice(0, 3), {
	label : `+${tagsToDisplay.length - 3} more`,
	size  : 'md',
}] : tagsToDisplay;

const columns = ({
	onClickEditButton = () => {},
	onClickViewButton = () => {},
}) => [
	{
		Header   : 'QUESTIONS',
		accessor : () => (
			<h3>
				Questions
			</h3>
		),
	},
	{
		Header   : 'TOPICS',
		accessor : () => (
			<div className={styles.pills}>
				{(finalTagsToDisplay || []).map((item) => (
					<Pill
						className={styles.questions_tag}
						key={item.label}
						size="sm"
						color="white"
					>
						{item.label}
					</Pill>
				))}
			</div>
		),
	},
	{
		Header   : 'Feedbacks',
		accessor : () => (
			<div className={styles.feedback_count_space}>
				<IcMLiveChat height={20} width={20} />
				<b className={styles.feedback_count}>5</b>
			</div>
		),
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
				{/* {!['inactive', 'draft'].includes(activeList)
					? ( */}
				<Button
					type="button"
					themeType="primary"
					size="sm"
					style={{ marginRight: 8 }}
					onClick={() => onClickViewButton(item?.id)}
				>
					VIEW
				</Button>
				{/* )
					: null} */}
			</div>
		),
	},
];

export default columns;
