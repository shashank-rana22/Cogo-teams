import { cl, Tooltip, Tags } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcATruck,
	IcAShipAmber,
	IcASurfaceFttRail,
} from '@cogoport/icons-react';

import styles from './styles.module.css';
import VerticleLine from './VerticleLine';

const ICON_STYLE = {
	height    : '20px',
	width     : '20px',
	marginTop : '30px',
	transform : 'rotateZ(90deg) rotateX(180deg)',
};

const ICON = {
	TRUCK  : <IcATruck style={ICON_STYLE} />,
	VESSEL : <IcAShipAmber style={ICON_STYLE} />,
	RAIL   : <IcASurfaceFttRail style={ICON_STYLE} />,
};

const LAST_INDEX_CHECK = 1;

function TrackingData({ data = [] }) {
	return (
		<div className={styles.container}>
			{data?.map((item, idx) => (
				<div className={styles.single_item} key={item.id}>
					{item?.transport_mode ? (
						ICON[item.transport_mode?.toUpperCase()]
					) : (
						<div className={styles.space} />
					)}

					<VerticleLine
						checked={item?.checked}
						zIndex={idx}
						isLast={data?.length === idx + LAST_INDEX_CHECK}
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
							{item?.flight_number && (
								<div>
									{item?.piece ? (
										<span className="piece">
											{item?.piece}
											{' '}
											Pieces •
										</span>
									) : null}
									{' '}
									<span>
										Flight no -
										{' '}
										{item?.flight_number}
										{' '}
									</span>
									{item?.weight ? (
										<span className="weight">
											•
											{` ${item?.weight} Kgs`}
										</span>
									) : null}
								</div>
							)}
							<div className={cl`${styles.info} ${styles.date}`}>
								{item?.event_date || item?.actual_date
									? formatDate({
										date       : item?.event_date || item?.actual_date,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
										timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
										formatType : 'dateTime',
										separator  : ' ',
									}) : 'TBD'}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default TrackingData;
