import { Placeholder } from '@cogoport/components';
import { useMemo } from 'react';

function LoadingState({ fields = [], isLast = false }) {
	const stylesCol = { padding: '0px 4px' };

	const keysForFields = useMemo(
		() => Array(fields.length).fill(null).map(() => Math.random()),
		[fields.length],
	);
	return (
		<div style={{ borderBottom: isLast ? 'none' : '1px solid #e0e0e0' }}>
			{fields.map((singleItem, index) => {
				if (singleItem?.show === false) {
					return null;
				}
				return (
					<div
						style={stylesCol}
						key={keysForFields[index]}
					>
						<Placeholder width="100%" height="20px" />
					</div>
				);
			})}
		</div>
	);
}

export default LoadingState;
