import { Button } from '@cogoport/components';
import { IcMArrowRight, IcMArrowLeft } from '@cogoport/icons-react';
import { forwardRef } from 'react';

function ScrollBar({ rightOffSet, leftOffSet }, ref) {
	const scrollHorizontal = (scrollOffset, re) => {
		const referance = re;
		const tableRootElement =			referance.current.querySelector('.tableRootSelector');
		tableRootElement.scrollLeft += scrollOffset;
		referance.current.scrollLeft += scrollOffset;
	};

	return (
		<div style={{ marginTop: '4.25%' }}>
			{/* <Button
				themeType="teritary"
				className="secondary sm"
				onClick={() => scrollHorizontal(leftOffSet, ref)}
			>
				<IcMArrowLeft width={20} height={20} fill="#ffffff" />
			</Button> */}

			{/* SCROLL */}

			<Button
				themeType="teritary"
				onClick={() => scrollHorizontal(rightOffSet, ref)}
			>
				<IcMArrowRight width={20} height={20} fill="#ffffff" />
			</Button>
		</div>
	);
}

export default forwardRef(ScrollBar);
