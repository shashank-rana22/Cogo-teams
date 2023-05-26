import {
	IcATruck,
	IcAShipAmber,
	IcASurfaceFttRail,
} from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { Tooltip } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import VerticleLine from './VerticleLine';
import { cl } from '@cogoport/components';
import styles from './styles.module.css';

const styleIcon = {
	height: '20px',
	width: '20px',
	marginTop: '30px',
	transform: 'rotateZ(90deg) rotateX(180deg)',
};

const Icon = {
	TRUCK: <IcATruck style={styleIcon} />,
	VESSEL: <IcAShipAmber style={styleIcon} />,
	RAIL: <IcASurfaceFttRail style={styleIcon} />,
};

function TrackingInfo({ data = [], shippingLine = {}, tripInfo = {} }) {
	return (
		<div classname={styles.Container}>
			{data?.map((item, idx) => {
				return (
					<div className={styles.SingleItem}>
						{item?.transport_mode ? (
							Icon[item.transport_mode?.toUpperCase()]
						) : (
							<span className="space" />
						)}
						<VerticleLine
							checked={item?.checked}
							zIndex={idx}
							isLast={data?.length === idx + 1}
						/>
						<div className={styles.Main}>
							<Tooltip
								theme="light"
								content={
									<div className={cl `${styles.heading} ${styles.tooltip}`}>
										{item?.location || item?.station || item?.last_location}
									</div>
								}
								maxWidth="none"
							>
								<div className={styles.Heading}>
									{item?.location ||
										item?.station ||
										item?.last_location ||
										'NA'}
								</div>
							</Tooltip>
							<div className={styles.Gap}>
								{item?.milestone && (
									<div className={cl `${styles.StyledTag} ${styles.sm}`}>{item?.milestone}</div>
								)}
								{item?.flight_number && (
									<div className={styles.Info}>
										{item?.piece ? (
											<div className={cl `${styles.Info} ${styles.piece}`}>
												{item?.piece.split(':')?.[1] ?? item?.piece} Pieces •
											</div>
										) : null}{' '}
										<div className={styles.Info}>Flight no - {item?.flight_number} </div>
										{item?.weight ? (
											<div className={cl `${styles.Info} ${styles.weight}`}>
												• {`${item?.weight.split(':')?.[1]}g` ?? item?.weight}{' '}
												Weight
											</div>
										) : null}
									</div>
								)}
								{item?.distance_remained && (
									<div className={cl `${styles.Info} ${styles.piece}`} >
										Distance Remaining:{' '}
										{Math.ceil(item.distance_remained / 1000)} km
									</div>
								)}
								{tripInfo?.truck_number && (
									<div className={cl `${styles.Info} ${styles.weight}`} >
										Truck Number : {tripInfo.truck_number}
									</div>
								)}
								<div className={cl `${styles.Info} ${styles.date}`}>
									{item?.event_date || item?.actual_date
										? format(
												item?.event_date || item?.actual_date,
												'dd MMM yyyy (hh:mm aa)',
												null,
												true,
										  )
										: null}
									{item?.tracking_updated_at &&
										formatDate({
											date: item.tracking_updated_at,
											formatType: 'dateTime',
											separator: ' ',
										})}{' '}
									- {tripInfo?.status}
								</div>
								{item?.vessel_name && shippingLine?.business_name ? (
									<div classname={styles.StyledText}>
										<img
											src={shippingLine?.logo_url}
											alt="logo"
											style={{
												marginRight: '10px',
												height: '30px',
											}}
										/>
										{shippingLine?.business_name} - {item?.vessel_name}
									</div>
								) : null}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default TrackingInfo;
