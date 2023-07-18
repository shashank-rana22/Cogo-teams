import { Button } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';

interface Props {
	id?: string;
	dropdown?: string[];
	setDropdown?: Function;
}

const POSITION_LIMIT = -1;

function RenderViewMore({ id, dropdown, setDropdown }:Props) {
	return 		(
		<div>
			{!dropdown.includes(id) ? (
				<Button
					themeType="secondary"
					onClick={() => setDropdown([...dropdown, id])}
				>
					View More
					{' '}
					<IcMArrowDown style={{ margin: '0px 4px' }} />
				</Button>
			)
				: (
					<Button
						themeType="secondary"
						onClick={() => {
							const index = dropdown.indexOf(id);
							if (index > POSITION_LIMIT) {
								dropdown.splice(index, 1);
							}
							setDropdown((prev: string[]) => [...prev]);
						}}
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
