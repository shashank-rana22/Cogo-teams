import { IcCFfcl } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';

import CardHeader from '../../../commons/Card/CardHeader';
import PortDetails from '../../../commons/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../commons/Card/ShipmentInfo';
import isCardCritical from '../../../helpers/isCardCritical';

import CargoDetails from './CargoDetails';
import { card, card_body, card_footer, separator, critical_card } from './styles.module.css';

export default function Card({ item = {}, couldBeCardsCritical = false }) {
	const router = useRouter();

	const clickCard = () => {
		router.push('/booking/fcl/[shipment_id]', `/booking/fcl/${item.id}`);
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={clickCard}
			className={`${card} ${
				couldBeCardsCritical && isCardCritical({ item }) ? critical_card : ''
			}`}
		>
			<CardHeader item={item} />

			<div className={card_body}>
				<ShipmentInfo item={item} />

				<div className={separator} />

				<PortDetails data={item} icon={{ Icon: IcCFfcl, text: 'FCL' }} />

				<div className={separator} />

				<CargoDetails cargo_details={item?.cargo_details || []} />
			</div>

			{item?.approved_at ? (
				<div className={card_footer}>
					Approved by RD at:
					{' '}
					{format(item.approved_at, 'dd MMM yyyy | hh:mm aaa', null, true)}
				</div>
			) : null}
		</div>
	);
}
