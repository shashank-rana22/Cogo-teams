import { Button } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';

interface Props {
	id?: string;
	dropdown?: string;
	setDropdown?: Function;
}

function RenderViewMore({ id, dropdown, setDropdown }:Props) {
	return 		(
		<div>
			{dropdown !== id ? (
				<Button
					themeType="secondary"
					onClick={() => setDropdown(id)}
				>
					View More
					{' '}
					<IcMArrowDown style={{ margin: '0px 4px' }} />
				</Button>
			)
				: (
					<Button
						themeType="secondary"
						onClick={() => setDropdown('')}
					>
						View Less
						{' '}
						<IcMArrowUp style={{ margin: '0px 4px' }} />
					</Button>
				)}
		</div>
	);
}

export default RenderViewMore;
