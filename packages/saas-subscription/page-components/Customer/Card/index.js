import { FluidContainer } from '@cogoport/components';

import styles from './styles.module.css';

function Card() {
	return (
		<div>
			<FluidContainer className={styles.count_card}>
				<div>Active Count</div>
				<div>Total Count</div>
			</FluidContainer>
		</div>
	);
}
export default Card;
