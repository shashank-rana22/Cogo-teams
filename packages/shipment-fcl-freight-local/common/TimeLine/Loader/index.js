import { Placeholder } from '@cogoport/components';

import { container, big_circle, small_circle } from './styles.module.css';

const RANDOM_BOOLEAN_DECIDER = 0.5;

const NUMBER_OF_LOADERS = 16;

function rendomBoolean() {
	return Math.random() >= RANDOM_BOOLEAN_DECIDER;
}

export default function Loader() {
	return (
		<div className={container}>
			<Placeholder className={big_circle} />
			{Array(NUMBER_OF_LOADERS).fill(null).map(() => (
				<>
					<Placeholder height="2px" style={{ flex: 1 }} />
					<Placeholder className={rendomBoolean() ? big_circle : small_circle} />
				</>
			))}
		</div>
	);
}
