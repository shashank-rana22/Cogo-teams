import { cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMStar, IcCStar, IcMDocument } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function MessageContent({ msg = {}, user_id = '', handleClick = () => {} }) {
	const getSplitted = (str) => {
		const all = str?.split('\\n');
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

					<div
						key={user_id}
						className={cl` ${styles.send_msg} ${msg?.created_by_user_id === user_id
							? styles.right : styles.left} `}
					>
						<div className={styles.details}>
							<div>
								<span>
									{msg?.created_by_stakeholder ? (
										<div className={styles.stakeholder}>
											{msg?.created_by_stakeholder
														=== 'booking_agent'
												? 'CCS'
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

							<Button
								themeType="link"
								onClick={() => handleClick(msg)}
							>
								{msg?.important ? (
									<IcCStar width="1.3em" height="1.3em" />
								) : (
									<IcMStar width="1.3em" height="1.3em" />
								)}
							</Button>
						</div>

						{(msg?.attachment_urls || []).map((url) => (
							<Button
								key={url}
								className={styles.flex_row}
								themeType="link"
								onClick={() => window.open(url, '_blank')}
							>
								<IcMDocument width="1.6em" height="1.6em" className={styles.icm_document} />
								<span>{url?.split('/')?.pop()}</span>
							</Button>
						))}

						{msg?.content ? (
							<div className={styles.msg}>{`${getSplitted(msg.content)}`}</div>
						) : null}
					</div>
				) : null

			))}

		</div>
	);
}

export default MessageContent;
