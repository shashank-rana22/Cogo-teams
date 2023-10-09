import { Popover } from '@cogoport/components';
import {
	IcMOverflowDot,
	IcMPin, IcCPin,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

const getIconMapping = ({ updatePinnedChats = () => {}, isPinned = false }) => [
	{
		name    : 'pin',
		label   : isPinned ? 'Unpin' : 'Pin',
		onClick : (e) => {
			updatePinnedChats(e, isPinned ? 'unpin' : 'pin');
		},
		icon: isPinned ? IcCPin : IcMPin,
	},
];

function ListOptions({ isPinned = false, updatePinnedChats = () => {} }) {
	const iconMapping = getIconMapping({ isPinned, updatePinnedChats });

	return (
		<div className={styles.list_div}>
			{
				iconMapping?.map((eachItem) => {
					const { icon:Icon, onClick = () => {} } = eachItem || {};
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
