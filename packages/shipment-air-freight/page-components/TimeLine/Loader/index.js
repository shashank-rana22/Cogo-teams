import { Placeholder } from '@cogoport/components';
import React from 'react';

import { container, circle } from './styles.module.css';

const LOADER_COUNT = 8;

export default function Loader() {
	return (
		<div className={container}>
			<Placeholder className={circle} />
			{Array.from(Array(LOADER_COUNT).keys()).map((key) => (
				<React.Fragment key={key}>
					<Placeholder height="2px" style={{ flex: 1 }} />
					<Placeholder className={circle} />
				</React.Fragment>
			))}
		</div>
	);
}
