import { Placeholder } from '@cogoport/components';
import React from 'react';

import { container, big_circle, small_circle } from './styles.module.css';

function rendomBoolean() {
	return Math.random() >= 0.5;
}

export default function Loader() {
	const keysForMap = React.useMemo(() => Array(8).fill(null).map(() => Math.random()), []);

	return (
		<div className={container}>
			<Placeholder className={big_circle} />
			{keysForMap.map((key) => (
				<React.Fragment key={key}>
					<Placeholder height="2px" style={{ flex: 1 }} />
					<Placeholder className={rendomBoolean() ? big_circle : small_circle} />
				</React.Fragment>
			))}
		</div>
	);
}
