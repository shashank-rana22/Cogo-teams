import { format } from '@cogoport/utils';
import { useRouter } from 'next/router';

import ClickableDiv from '../ClickableDiv';

import styles from './styles.module.css';

function ShipmentBreif({ item }) {
	const router = useRouter();

	const handleV1Redirect = () => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${item?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	const handleV2Redirect = () => {
		router.push('/booking/fcl/[shipment_id]', `/booking/fcl/${item.id}`);
	};

	return (
		<div className={styles.container}>
			<ClickableDiv>
				SID #
				{' '}
				{item?.serial_id}
			</ClickableDiv>

			<div className={styles.created_at}>
				Created On
				{ ' '}
				{format(item?.created_at, 'dd MMM yyyy', {}, false)}
			</div>

		</div>
	);
}

export default ShipmentBreif;
