import { Button } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';

function RenderViewMore({ id, dropdown, setDropdown }) {
	return 		(
		<div>
			{dropdown !== id ? (
				<Button
					themeType="secondary"
					onClick={() => setDropdown(id)}
				>
					View More
					{' '}
					<IcMArrowDown />
				</Button>
			)
				: (
					<Button
						themeType="secondary"
						onClick={() => setDropdown('')}
					>
						View Less
						{' '}
						<IcMArrowUp />
					</Button>
				)}
		</div>
	);
}

export default RenderViewMore;
