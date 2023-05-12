import { IcMCfs } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import CardHeader from '../../../../common/Card/CardHeader';
// import LineItems from '../../../../common/Card/LineItems';
import ShipmentInfo from '../../../../common/Card/ShipmentInfo';

import CargoDetails from './CargoDetails';
import PortDetails from './PortDetails';
import styles from './styles.module.css';

function Card({ item = {} }) {
	const router = useRouter();

	const clickCard = () => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${item?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	const iconProps = {
		Icon : IcMCfs,
		text : 'FCL CFS',
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={clickCard}
			className={styles.card}
		>
			<CardHeader item={item} />

			<div className={styles.card_body}>
				<div className={styles.shipment_info}>
					<ShipmentInfo item={item} />
				</div>

				<div className={styles.separator} />

				<div className={styles.port}>
					<PortDetails data={item} icon={iconProps} />

				</div>

				<div className={styles.separator} />

				{/* <div className={styles.line_item}>
					<LineItems item={item} />
				</div>

				<div className={styles.separator} /> */}

				<div className={styles.cargo}>
					<CargoDetails cargo_details={item?.cargo_details || []} item={item} />
				</div>
			</div>
		</div>
	);
}
export default Card;
