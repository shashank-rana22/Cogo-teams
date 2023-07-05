import { Tooltip, cl } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcATruck } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useMemo } from 'react';

import styles from './styles.module.css';
import VerticleLine from './VerticleLine';

const styleIcon = {
	height    : '20px',
	width     : '20px',
	marginTop : '30px',
	transform : 'rotateZ(90deg) rotateX(180deg)',
};

function TrackingInfo({ data = [], tripInfo = {} }) {
	const keys = useMemo(
		() => Array(data.length).fill(null).map(() => Math.random()),
		[data.length],
	);
	return (
		<div className={styles.container}>
			{tripInfo?.intugine_eta ? (
				<div className={cl`${styles.Info} ${styles.eta}`}>
					Expected Arrival Time At Destination :
					{formatDate({
						date       : tripInfo.intugine_eta,
						formatType : 'dateTime',
						separator  : ' ',
					})}
				</div>
			) : null}
			{data?.map((item, idx) => (
				<div className={styles.SingleItem} key={keys[idx]}>
					{item?.transport_mode ? (
						<IcATruck style={styleIcon} />
					) : (
						<span className={cl`${styles.SingleItem} ${styles.space}`} />
					)}
					<VerticleLine
						checked={item?.checked}
						zIndex={idx}
						isLast={data?.length === idx + 1}
					/>
					<div className={styles.Main}>
						<Tooltip
							theme="light"
							content={(
								<div className={cl`${styles.Heading} ${styles.tooltip}`}>
									{item?.location || item?.station || item?.last_location}
								</div>
							)}
							maxWidth="none"
						>
							<div className={styles.Heading}>
								{item?.location
										|| item?.station
										|| item?.last_location
										|| 'NA'}
							</div>
						</Tooltip>
						<div className={styles.Gap}>
							{item?.milestone && (
								<div className={cl`${styles.StyledTag} ${styles.sm}`}>{item?.milestone}</div>
							)}
							{item?.distance_remained && (
								<div className={cl`${styles.Info} ${styles.piece}`}>
									Distance Remaining:
									{' '}
									{Math.ceil(item.distance_remained / 1000)}
									{' '}
									km
								</div>
							)}
							{tripInfo?.truck_number && (
								<div className={cl`${styles.Info} ${styles.weight}`}>
									Truck Number :
									{' '}
									{tripInfo.truck_number}
								</div>
							)}
							<div className={cl`${styles.Info} ${styles.date}`}>
								{item?.event_date || item?.actual_date
									? format(
										item?.event_date || item?.actual_date,
										'dd MMM yyyy (hh:mm aa)',
										null,
										true,
									)
									: null}
								{item?.tracking_updated_at
										&& formatDate({
											date       : item.tracking_updated_at,
											formatType : 'dateTime',
											separator  : ' ',
										})}
								{' '}
								-
								{' '}
								{tripInfo?.status}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default TrackingInfo;
