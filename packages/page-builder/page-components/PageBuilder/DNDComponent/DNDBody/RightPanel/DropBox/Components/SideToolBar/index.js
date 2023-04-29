import { Tooltip } from '@cogoport/components';
import { IcMCrossInCircle, IcMDuplicate, IcMPlusInCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function SideToolBar({
	rowData,
	pageConfiguration,
	handleAddSlides,
	handleCopy,
	handleDelete,
	component,
	type,
}) {
	return (
		<div className={styles.flex_column}>
			<IcMCrossInCircle
				height="24px"
				width="24px"
				cursor="pointer"
				onClick={(e) => handleDelete(e, rowData, pageConfiguration)}
			/>
			<IcMDuplicate
				height="24px"
				width="24px"
				cursor="pointer"
				onClick={(e) => handleCopy(e, rowData, component, pageConfiguration)}
			/>

			{type === 'carousel' && (
				<Tooltip content="Click here to add more slides" placement="bottom">
					<IcMPlusInCircle
						height="24px"
						width="24px"
						cursor="pointer"
						onClick={(e) => handleAddSlides(e, rowData, pageConfiguration)}
					/>
				</Tooltip>
			)}

		</div>
	);
}

export default SideToolBar;
