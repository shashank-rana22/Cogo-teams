import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const PLACE_HOLDER_WIDTH = ['100px', '300px', '100px', '300px', '200px', '200px'];

function HeaderLoading() {
	return (
		<div className={styles.container}>
			{[...Array(PLACE_HOLDER_WIDTH.length).keys()].map((i) => (
				<Placeholder
					key={i}
					height="25px"
					width={PLACE_HOLDER_WIDTH[i]}
					margin="10px 4px"
				/>
			))}
		</div>
	);
}

export default HeaderLoading;
