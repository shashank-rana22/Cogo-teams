import { Placeholder } from '@cogoport/components';
import { v4 as uuid } from 'uuid';

import { container, big_circle, small_circle } from './styles.module.css';

function rendomBoolean() {
	return Math.random() >= 0.5;
}

export default function Loader() {
	return (
		<div className={container}>
			<Placeholder className={big_circle} />
			{Array(16).fill(null).map(() => (
				<>
					<Placeholder height="2px" style={{ flex: 1 }} key={uuid()} />
					<Placeholder className={rendomBoolean() ? big_circle : small_circle} key={uuid()} />
				</>
			))}
		</div>
	);
}
