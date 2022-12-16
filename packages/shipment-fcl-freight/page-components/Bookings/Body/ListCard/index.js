import { Button } from '@cogoport/components';

import Header from './Header';
import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';

function ListCard() {
	return (
		<div className={styles.listcard_container}>
			<Button>
				<Header />
				<div>
					<ShipmentInfo />
				</div>
			</Button>
		</div>
	);
}
export default ListCard;
