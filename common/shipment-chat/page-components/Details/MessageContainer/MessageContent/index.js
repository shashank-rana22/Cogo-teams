import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMStar, IcCStar, IcMDocument } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function MessageContent({ msg, user_id, handleClick = () => {} }) {
	const getSplited = (str) => {
		const all = str.split('\\n');
		let res = '';
		(all || []).forEach((ele) => {
			res += `${ele}\n`;
		});
		return res;
	};

	return (
		<div
			className={cl` ${styles.container} ${msg?.created_by_user_id === user_id
				? styles.right : styles.left} `}
		>
			{(msg?.visible_to_user_ids || []).map((item) => (
				item === user_id ? (

					<div className={cl` ${styles.send_msg} ${msg?.created_by_user_id === user_id
						? styles.right : styles.left} `}
					>
						<div className={styles.details}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<span style={{ margin: '0px 8px' }}>
									{msg?.created_by_stakeholder ? (
										<div className={styles.stakeholder}>
											{msg?.created_by_stakeholder
														=== 'booking_agent'
												? 'KAM'
												: startCase(msg?.created_by_stakeholder)}
										</div>
									) : null}
								</span>

								<div className={styles.time}>
									{formatDate({
										date       : msg?.created_at,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
										formatType : 'dateTime',
										separator  : ' | ',
									})}
								</div>
							</div>

							<div
								className={cl` ${styles.imp_sign} ${msg?.created_by_user_id === user_id
									? styles.right : styles.left} `}
								role="button"
								tabIndex={0}
								onClick={() => handleClick(msg)}
							>
								{msg?.important === true ? (
									<IcCStar
										style={{ width: '1.3em', height: '1.3em' }}
									/>
								) : (
									<IcMStar
										style={{ width: '1.3em', height: '1.3em' }}
									/>
								)}
							</div>
						</div>

						{(msg?.attachment_urls || []).map((url) => (
							<div
								role="button"
								tabIndex={0}
								className={styles.flex_row}
								onClick={() => window.open(url, '_blank')}
							>
								<IcMDocument style={{ width: '1.5em', height: '1.5em', marginRight: '6px' }} />
								{url?.split('/').pop()}
							</div>
						))}

						{msg?.content ? (
							<div className={styles.msg}>{`${getSplited(msg.content)}`}</div>
						) : null}
					</div>
				) : null

			))}

		</div>
	);
}

export default MessageContent;
