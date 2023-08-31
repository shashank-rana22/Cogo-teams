import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const PLACE_HOLDER_WIDTH = ['100px', '300px', '100px', '300px', '200px', '200px'];

function HeaderLoading() {
	return (
		<div className={styles.container}>
			{PLACE_HOLDER_WIDTH.map((width) => (
				<Placeholder
					key={width}
					height="25px"
					width={width}
					margin="10px 4px"
				/>
			))}
		</div>
	);
}

export default HeaderLoading;
