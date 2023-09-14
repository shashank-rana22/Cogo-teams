import { Button } from '@cogoport/components';
import { IcMArrowRight, IcMArrowLeft } from '@cogoport/icons-react';
import { forwardRef } from 'react';

import styles from './styles.module.css';

const scrollHorizontal = (scrollOffset, ref) => {
	const tableRootElement = ref.current.querySelector('.overlay_section');
	tableRootElement.scrollLeft += scrollOffset;
};
function ScrollBar({ rightOffSet = 0, leftOffSet = 0 }, ref) {
	return (
		<div className={styles.arrow_container}>
			<Button
				className="secondary sm"
				onClick={() => scrollHorizontal(leftOffSet, ref)}
			>
				<IcMArrowLeft width={20} height={20} fill="#ffffff" />
			</Button>

			<div className={styles.scroll_text}>SCROLL</div>

			<Button
				className="secondary sm"
				onClick={() => scrollHorizontal(rightOffSet, ref)}
			>
				<IcMArrowRight width={20} height={20} fill="#ffffff" />
			</Button>
		</div>
	);
}

export default forwardRef(ScrollBar);
