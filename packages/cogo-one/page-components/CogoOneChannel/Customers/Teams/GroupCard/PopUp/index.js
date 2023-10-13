import { Popover } from '@cogoport/components';
import {
	IcMOverflowDot,
	IcMPin, IcCPin, IcMDelete,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

const getIconMapping = ({
	updatePinnedChats = () => {},
	isPinned = false, deleteDraft = () => {},
	isDraft = false,
}) => [
	{
		name    : 'pin',
		label   : isPinned ? 'Unpin' : 'Pin',
		onClick : (e) => {
			updatePinnedChats(e, isPinned ? 'unpin' : 'pin');
		},
		icon: isPinned ? IcCPin : IcMPin,
	},
	{
		name    : 'discard',
		label   : 'Discard',
		onClick : (e) => {
			e.stopPropagation();
			deleteDraft();
		},
		hide : !isDraft,
		icon : IcMDelete,
	},
];

function ListOptions({
	isPinned = false,
	updatePinnedChats = () => {}, deleteDraft = () => {}, isDraft = false,
}) {
	const iconMapping = getIconMapping({ isPinned, updatePinnedChats, deleteDraft, isDraft });

	return (
		<div className={styles.list_div}>
			{
				iconMapping?.map((eachItem) => {
					const { icon:Icon, onClick = () => {}, hide = false } = eachItem || {};

					if (hide) {
						return null;
					}

					return (
						<div
							key={eachItem?.name}
							className={styles.flex}
							onClick={onClick}
							role="presentation"
						>
							{Icon ? <Icon className={styles.icon} /> : null}
							<div className={styles.text_styles}>{eachItem.label}</div>
						</div>
					);
				})

			}
		</div>
	);
}

function PopUp({
	updatePinnedChats = () => {},
	isPinned = false,
	deleteDraft = () => {},
	isDraft = false,
}) {
	return (
		<div
			className={styles.container}
		>
			<Popover
				content={(
					<ListOptions
						updatePinnedChats={updatePinnedChats}
						isPinned={isPinned}
						deleteDraft={deleteDraft}
						isDraft={isDraft}
					/>
				)}
				caret={false}
			>
				<IcMOverflowDot
					onClick={(e) => {
						e.stopPropagation();
					}}
					className={styles.overflow_dot}
				/>
			</Popover>
		</div>
	);
}

export default PopUp;
