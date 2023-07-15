import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCFfcl } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import CardHeader from '../../../../commons/Card/CardHeader';
import PortDetails from '../../../../commons/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../../commons/Card/ShipmentInfo';
import CONSTANTS from '../../../../config/constants.json';
import { card, card_body, card_footer, separator } from '../../card.module.css';
import CargoDetails from '../CargoDetails';

export default function CardDetails({ item = {}, activeTab = '' }) {
	const router = useRouter();

	const clickCard = () => {
		router.push('/booking/fcl/[shipment_id]', `/booking/fcl/${item.id}?${CONSTANTS.url_navigation_params}`);
	};

	return (
		<div
			role="presentation"
			onClick={clickCard}
			className={`${card} ? critical_card : ''
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
					{formatDate({
						date       : item?.approved_at,
						formatType : 'dateTime',
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
					})}
				</div>
			) : null}
		</div>
	);
}
