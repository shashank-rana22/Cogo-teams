import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';

import ClickableDiv from '../ClickableDiv';

import styles from './styles.module.css';

function ShipmentBreif({ item, service, redirectable = false }) {
	const router = useRouter();

	const redirectToDetailPage = () => {
		if (service === 'fcl_freight') {
			router.push('/booking/fcl/[shipment_id]', `/booking/fcl/${item.id}`);
			document.querySelector('.authority_desk').style.cursor = 'progress';
		} else {
			const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${item?.id}`;

			window.sessionStorage.setItem('prev_nav', newUrl);
			window.location.href = newUrl;
			document.querySelector('.authority_desk').style.cursor = 'progress';
		}
	};

	return (
		<div className={styles.container}>
			<ClickableDiv
				className={cl`${styles.serial_id} ${redirectable ? styles.clickable : ''}`}
				onClick={redirectable ? redirectToDetailPage : null}
			>
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
