import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useContext } from 'react';

import {
	BasicDetails,
	AssignedStakeholder,
	ShipmentIcon,
	CargoPills,
	DualLocation,
	Header,
	SingleLocation,
	Accordian,
} from '../../../common/ShipmentCard';
import CONSTANTS from '../../../config/constants.json';
import KamDeskContext from '../../../context/KamDeskContext';
import isSingleLocation from '../../../utils/checkSingleLocation';

import styles from './styles.module.css';

function Card({ data = {}, activeTab = '' }) {
	const router = useRouter();

	const { stepperTab } = useContext(KamDeskContext);

	let href = `${window.location.origin}/${router?.query?.partner_id}/shipments`;
	href += `/${data?.id}?${CONSTANTS.url_navigation_params}`;

	const handleCardClick = (e) => {
		const newUrl = e.currentTarget.href;
		window.sessionStorage.setItem('prev_nav', newUrl);
	};

	return (
		<>
			<a
				href={href}
				className={styles.container}
				onClick={handleCardClick}
			>
				<div className={styles.header}>
					<Header data={data} />
				</div>

				<div className={styles.body_container}>
					<div className={styles.details_container}>
						<BasicDetails data={data} />

						<AssignedStakeholder data={data} />
					</div>

					<div className={styles.divider} />

					<div className={styles.icon_container}>
						<ShipmentIcon shipment_type={stepperTab} />
					</div>

					<div className={styles.location_container}>
						{isSingleLocation(data?.shipment_type) ? (
							<SingleLocation data={data} />
						) : (
							<DualLocation data={data} />
						)}
					</div>

					<div className={styles.divider} />

					<div className={styles.pill_container}>
						<CargoPills data={data} />
						{data?.fm_rejection_reason && (
							<Tooltip
								content={(
									<div className={styles.rejection_tooltip}>
										{data?.fm_rejection_reason}
									</div>
								)}
								placement="top"
							>
								<div style={{ marginBlock: 'auto' }}>
									<IcMInfo
										width={15}
										height={15}
										style={{ marginBottom: '2px', color: 'red' }}
									/>
								</div>
							</Tooltip>
						)}
					</div>
				</div>
			</a>
			{(data?.shipment_type === 'rail_domestic_freight' && activeTab === 'eway_bill_extension') ? (
				<Accordian data={data} />
			) : null}
		</>
	);
}

export default Card;
