import { Button } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';

function RenderViewMore({ id = '', dropdown = '', setDropdown = () => {} }) {
	const handleViewExecutions = () => {
		setDropdown(id);
	};
	return 		(
		<div>
			{dropdown !== id ? (
				<Button
					themeType="secondary"
					onClick={handleViewExecutions}
				>
					View Executions
					{' '}
					<IcMArrowDown style={{ margin: '0px 4px' }} />
				</Button>
			)
				: (
					<Button
						themeType="secondary"
						onClick={() => {
							setDropdown(null);
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
