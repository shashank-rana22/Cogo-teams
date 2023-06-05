import { Placeholder } from '@cogoport/components';
import { v4 as uuid } from 'uuid';

function LoadingState({ fields = [], isLast = false }) {
	const stylesCol = { padding: '0px 4px' };

	return (
		<div style={{ borderBottom: isLast ? 'none' : '1px solid #e0e0e0' }}>
			{fields.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}
				return (
					<div
						style={stylesCol}
						key={uuid()}
					>
						<Placeholder width="100%" height="20px" />
					</div>
				);
			})}
		</div>
	);
}

export default LoadingState;
