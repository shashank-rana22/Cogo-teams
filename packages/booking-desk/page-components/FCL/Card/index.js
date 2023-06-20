import { IcCFfcl } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';

import CardHeader from '../../../commons/Card/CardHeader';
import PortDetails from '../../../commons/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../commons/Card/ShipmentInfo';
import CONSTANTS from '../../../config/constants.json';
import isCardCritical from '../../../helpers/isCardCritical';
import CargoDetails from '../Export-Import/Card/CargoDetails';
import { card, card_body, card_footer, separator, critical_card } from '../styles.module.css';

export default function Card({ item = {}, couldBeCardsCritical = false, activeTab = '' }) {
	const router = useRouter();

	const clickCard = () => {
		router.push('/booking/fcl/[shipment_id]', `/booking/fcl/${item.id}?${CONSTANTS.url_navigation_params}`);
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={clickCard}
			className={`${card} ${
				couldBeCardsCritical && isCardCritical({ item, activeTab }) ? critical_card : ''
			}`}
		>
			<CardHeader item={item} />

			<div className={card_body}>
				<ShipmentInfo item={item} />

				<div className={separator} />

				<PortDetails data={item} icon={{ Icon: IcCFfcl, text: 'FCL' }} />

				<div className={separator} />

				<CargoDetails cargo_details={item?.cargo_details || []} activeTab={activeTab} item={item} />
			</div>

			{item?.approved_at ? (
				<div className={card_footer}>
					Approved by RD at:
					{' '}
					{format(item.approved_at, 'dd MMM yyyy | hh:mm aaa')}
				</div>
			) : null}
		</div>
	);
}