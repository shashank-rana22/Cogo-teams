import { IcMFfcl, IcMFlocalCharges, IcMFcustoms } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import CardFooter from './CardFooter';
import CardHeader from './CardHeader';
import CargoPills from './CargoPills';
import DualLocation from './PortDetails/DualLocation';
import SingleLocation from './PortDetails/SingleLocation';
import ShipmentInfo from './ShipmentInfo';
import styles from './styles.module.css';

const iconMapping = {
	fcl_freight       : { Icon: IcMFfcl, text: 'FCL' },
	fcl_freight_local : { Icon: IcMFlocalCharges, text: 'FCL Local' },
	fcl_customs       : { Icon: IcMFcustoms, text: 'FCL Customs' },
};

export default function Card({ item = {} }) {
	const router = useRouter();

	const clickCard = () => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${item?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	const iconProps = iconMapping[item?.shipment_type];

	return (
		<div
			role="button"
			tabIndex={0}
			className={`${styles.card}`}
			onClick={clickCard}
		>
			<CardHeader item={item} />

			<div className={styles.card_body}>
				<ShipmentInfo item={item} />

				<div className={styles.separator} />

				{item?.shipment_type === 'fcl_freight' ? <DualLocation data={item} icon={iconProps} />
					: <SingleLocation data={item} icon={iconProps} />}

				<div className={styles.separator} />

				<CargoPills item={item} />
			</div>

			<CardFooter item={item} />
		</div>
	);
}
