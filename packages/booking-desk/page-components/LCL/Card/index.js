import { IcCFlcl } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import CardHeader from '../../../commons/Card/CardHeader';
import PortDetails from '../../../commons/Card/PortDetails/DualLocation';
import ShipmentInfo from '../../../commons/Card/ShipmentInfo';
import isCardCritical from '../../../helpers/isCardCritical';

import CargoDetails from './CargoDetails';
import { card, card_body, separator, critical_card } from './styles.module.css';

export default function Card({ item = {}, couldBeCardsCritical = false }) {
	const router = useRouter();
	const handleCardClick = () => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${item?.id}`;

		window.sessionStorage.setItem('prev_nav', newUrl);
		window.location.href = newUrl;
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={handleCardClick}
			className={`${card} ${couldBeCardsCritical && isCardCritical({ item }) ? critical_card : ''}`}
		>
			<CardHeader item={item} />

			<div className={card_body}>
				<ShipmentInfo item={item} />

				<div className={separator} />

				<PortDetails data={item} icon={{ Icon: IcCFlcl, text: 'LCL' }} />

				<div className={separator} />

				<CargoDetails cargo_details={item} />
			</div>
		</div>
	);
}
