import { Placeholder } from '@cogoport/components';
import React from 'react';

import { container, big_circle, small_circle } from './styles.module.css';

const RANDOM_CHECK = 0.5;
const ARRAY_COUNT = 8;

function rendomBoolean() {
	return Math.random() >= RANDOM_CHECK;
}

export default function Loader() {
	const keysForMap = React.useMemo(() => Array(ARRAY_COUNT).fill(null).map(() => Math.random()), []);

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
