import { Tooltip, Tags } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';
import VerticleLine from './VerticleLine';

const LAST_INDEX_CHECK = 1;

function TrackingData({ data = [] }) {
	return (
		<div className={styles.container}>
			{data?.map((item, idx) => (
				<div className={styles.single_item} key={item.id}>
					<div className={styles.space} />

					<VerticleLine
						checked={item?.checked}
						isLast={data?.length === idx + LAST_INDEX_CHECK}
					/>

					<div className={styles.main}>
						<Tooltip
							theme="light"
							content={<div className={styles.tooltip}>{item?.station}</div>}
							maxWidth="none"
							placement="bottom"
							interactive
						>

							<div className={styles.heading}>
								{item?.station || 'NA'}
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
								<div className={styles.info}>
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
							<div className={styles.date}>
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
