import { cl, Tooltip, Tags } from '@cogoport/components';
import {
	IcATruck,
	IcAShipAmber,
	IcASurfaceFttRail,
} from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';
import VerticleLine from './VerticleLine';

const styleIcon = {
	height    : '20px',
	width     : '20px',
	marginTop : '30px',
	transform : 'rotateZ(90deg) rotateX(180deg)',
};
const Icon = {
	TRUCK  : <IcATruck style={styleIcon} />,
	VESSEL : <IcAShipAmber style={styleIcon} />,
	RAIL   : <IcASurfaceFttRail style={styleIcon} />,
};

function TrackingData({ data = [], shippingLine = {} }) {
	return (
		<div className={styles.container}>
			{data?.map((item, idx) => (
				<div className={styles.single_item}>
					{item?.transport_mode ? (
						Icon[item.transport_mode?.toUpperCase()]
					) : (
						<div className={styles.space} />
					)}

					<VerticleLine
						checked={item?.checked}
						zIndex={idx}
						isLast={data?.length === idx + 1}
					/>

					<div className={styles.main}>
						<Tooltip
							theme="light"
							content={<div className={styles.tooltip}>{item?.location || item?.station}</div>}
							maxWidth="none"
							placement="bottom"
							interactive
						>

							<div className={styles.heading}>
								{item?.location || item?.station || 'NA'}
							</div>
						</Tooltip>

						<div className={styles.gap}>
							{item?.milestone && (
								<Tags
									size="md"
									items={[{
										disabled : false,
										children : item?.milestone,
										color    : '#cdf7d4',
										tooltip  : false,
									}]}
								/>
							)}

							<div className={cl`${styles.info} ${styles.date}`}>
								{item?.event_date || item?.actual_date
									? format(
										item?.event_date || item?.actual_date,
										'dd MMM yyyy (hh:mm aa)',
										null,
										true,
									) : 'TBD'}
							</div>

							{item?.vessel_name && shippingLine?.business_name ? (
								<div className={styles.styled_text}>

									<img
										src={shippingLine?.logo_url}
										alt="logo"
										style={{
											marginRight : '10px',
											height      : '30px',
										}}
									/>

									{shippingLine?.business_name}
									{' '}
									-
									{item?.vessel_name}
								</div>
							) : null}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default TrackingData;
