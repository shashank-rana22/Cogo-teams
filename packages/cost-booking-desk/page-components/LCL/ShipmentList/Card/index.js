import { IcCFlclCustoms, IcMFlcl } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import CardHeader from '../../../../common/Card/CardHeader';
import LineItems from '../../../../common/Card/LineItems';
import ShipmentInfo from '../../../../common/Card/ShipmentInfo';

import CargoDetails from './CargoDetails';
import DualPort from './PortDetails/DualLocation';
import SinglePort from './PortDetails/SingleLocation';
import styles from './styles.module.css';

const SHIPMENT_ICON = {
	lcl_customs: {
		Icon : IcCFlclCustoms,
		text : 'LCL Customs',
	},
	lcl_freight: {
		Icon : IcMFlcl,
		text : 'LCL',
	},
};

function Card({ item = {} }) {
	const router = useRouter();

	const clickCard = () => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${item?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	const iconProps = SHIPMENT_ICON[item?.shipment_type] || SHIPMENT_ICON.lcl_freight;

	const isSingleLocation = item?.shipment_type === 'lcl_customs';

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
					{isSingleLocation
						? <SinglePort data={item} icon={iconProps} />
						: <DualPort data={item} icon={iconProps} />}
				</div>

				<div className={styles.separator} />

				<div className={styles.line_item}>
					<LineItems item={item} />
				</div>

				<div className={styles.separator} />

				<div className={styles.cargo}>
					<CargoDetails item={item} />
				</div>
			</div>
		</div>
	);
}
export default Card;
