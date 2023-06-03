import { cl } from '@cogoport/components';
import { format } from '@cogoport/utils';

import useRedirectToShipmentDetailPage from '../../hooks/useRedirectToShipmentDetailPage';
import ClickableDiv from '../ClickableDiv';

import styles from './styles.module.css';

function ShipmentBreif({ item, service, redirectable = false }) {
	const { redirect } = useRedirectToShipmentDetailPage();

	return (
		<div className={styles.container}>
			<ClickableDiv
				className={cl`${styles.serial_id} ${redirectable ? styles.clickable : ''}`}
				onClick={redirectable ? () => redirect({ service, shipment: item }) : null}
			>
				SID #
				&nbsp;
				{item?.serial_id}
			</ClickableDiv>

			<div className={styles.created_at}>
				Created On:
				&nbsp;
				{format(item?.created_at, 'dd MMM yyyy', {}, false)}
			</div>

		</div>
	);
}

export default ShipmentBreif;
