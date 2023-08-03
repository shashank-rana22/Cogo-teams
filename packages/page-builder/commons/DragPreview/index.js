import DRAG_PREVIEW_ICON_MAPPING from '../../configurations/drag-preview-icon-mapping';

import styles from './styles.module.css';

function DragPreview({ type, showBackDrop = true }) {
	const dragData = DRAG_PREVIEW_ICON_MAPPING[type];

	const { icon, text } = dragData || {};

	return (
		<div
			role="presentation"
			className={styles.text_drop}
		>
			<div className={showBackDrop ? styles.backdrop : styles.flex_drag}>
				{icon}
			</div>
			<div className={styles.drop_text}>{text}</div>
		</div>
	);
}

export default DragPreview;
