import { IcMArrowRight, IcMArrowLeft } from '@cogoport/icons-react';
import { forwardRef } from 'react';

import styles from './styles.module.css';

const scrollHorizontal = (scrollOffset, ref) => {
	const tableRootElement = ref.current.querySelector('.overlay_section');
	tableRootElement.scrollLeft += scrollOffset;
};
function ScrollBar({ rightOffSet = 0, leftOffSet = 0, left = true, right = true }, ref) {
	return (
		<div className={styles.container}>
			{left && (
				<div
					onClick={() => scrollHorizontal(leftOffSet, ref)}
					role="presentation"
					className={styles.scroll_left}
				>
					<IcMArrowLeft
						width={20}
						height={20}
					/>
				</div>
			)}
			{right && (
				<div
					onClick={() => scrollHorizontal(rightOffSet, ref)}
					role="presentation"
					className={styles.scroll_right}
				>
					<IcMArrowRight
						width={20}
						height={20}
					/>
				</div>
			)}
		</div>
	);
}

export default forwardRef(ScrollBar);
