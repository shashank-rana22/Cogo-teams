import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useContext, useEffect, useState } from 'react';

import CONSTANTS from '../../../../configs/constants.json';
import LastMileDeskContext from '../../../../context/LastMileDeskContext';
import getCriticalShipment from '../../../../helpers/getCriticalShipment';
import useGetShipmentTimeLine from '../../../../hooks/useGetShipmentTimeline';

import Accordion from './Accordion';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function Card({ item = {} }) {
	const [open, setOpen] = useState(false);

	const { activeTab } = useContext(LastMileDeskContext);
	const isShipmentCritical = getCriticalShipment({ tab: activeTab, shipment: item });

	const router = useRouter();

	const handleCardClick = () => {
		router.push('/booking/fcl/[shipment_id]', `/booking/fcl/${item.id}?${CONSTANTS.url_navigation_params}`);
	};

	const {
		shipmentTimelineData = [],
		shipmentTimelineLoading,
		getShipmentTimeline = () => {},
	} = useGetShipmentTimeLine({ item });

	useEffect(() => {
		if (open && item?.id) {
			getShipmentTimeline();
		}
	}, [getShipmentTimeline, open, item?.id]);

	return (
		<div
			className={cl`${styles.container} ${isShipmentCritical ? styles.animate_card : ''}`}
			role="button"
			tabIndex={0}
		>
			<Header item={item} />

			<Body item={item} open={open} setOpen={setOpen} handleCardClick={handleCardClick} />

			{open ? (
				<Accordion
					item={item}
					shipmentTimelineData={shipmentTimelineData}
					shipmentTimelineLoading={shipmentTimelineLoading}
				/>
			) : null}

			<Footer item={item} />
		</div>
	);
}

export default Card;
