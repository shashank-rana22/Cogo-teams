import { Tooltip, Placeholder } from '@cogoport/components';
import {
	IcCFcrossInCircle,
	IcCFtick,
	IcCSendEmail,
} from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getDate = (date) => format(
	date,
	'dd:mm:yyyy',
	{},
	false,
);

const getTime = (date) => format(
	date,
	'HH:mm',
	{},
	false,
);

function Timeline({ data, loading }) {
	const timelineDetails = data?.timelineDetail;

	if (loading) {
		return (
			<Placeholder
				height="35px"
				width="35px"
				className="circle"
				margin="10px 0px 0px"
			/>
		);
	}

	if (timelineDetails === undefined) {
		return <div>TimeLine Does Not Exist</div>;
	}

	return (timelineDetails || [])?.map((item) => {
		const showLine = item.eventName === 'CREATED';
		const completeLine =			item.eventName === 'POSTED' || item.eventName === 'PAID';

		return (
			<div className={styles.container}>
				<div className={styles.sub_container}>
					<div style={{ width: '20%' }}>
						<div>{getDate(item.occurredAt)}</div>
						<div>{getTime(item.occurredAt)}</div>
					</div>
					{item.eventName === 'IRN_FAILED' || item.eventName === 'FAILED' ? (
						<IcCFcrossInCircle width="35px" height="35px" />
					) : (
						<IcCFtick width="35px" height="35px" />
					)}
					<div className={styles.event_data_container}>
						<div style={{ fontWeight: '500' }}>
							{' '}
							{startCase(item?.eventName)}
						</div>
						<div>
							{item?.data?.errorMessage ? (
								<Tooltip
									interactive
									content={(
										<div className={styles.user_container}>
											{startCase(item.data.errorMessage)}
										</div>
									)}
								>
									<div style={{ cursor: 'pointer', marginLeft: '4px' }}>
										<IcCSendEmail />
									</div>
								</Tooltip>
							) : null}
						</div>
					</div>
				</div>
				{!showLine ? (
					<div>
						<div
							style={{
								width           : '3px',
								height          : '12vh',
								marginTop       : '4px',
								backgroundImage : 'linear-gradient(#e0e0e0, #67c676)',
							}}
							className={completeLine ? styles.complete : styles.pending}
						/>
					</div>
				) : null}
			</div>
		);
	});
}
export default Timeline;
