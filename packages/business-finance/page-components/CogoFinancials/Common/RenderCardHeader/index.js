import { Tooltip } from '@cogoport/components';
import { IcMArrowBack, IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function RenderCardHeader({
	title = '',
	showInfo = false,
	showBack = false,
	onBack = () => {},
	infoContent = '',
}) {
	return (
		<div>
			<div className={styles.header}>
				{showBack && (
					<div>
						<IcMArrowBack
							onClick={onBack}
							className={styles.back}
						/>
					</div>
				)}
				<div>
					<div>
						{title || ''}
					</div>
					<div className={styles.bottom_line} />

				</div>
				{showInfo && !isEmpty(infoContent) && (
					<div className={styles.info}>
						<Tooltip
							content={(
								<div style={{ wordBreak: 'break-word' }}>
									{infoContent}
								</div>
							)}
							placement="top"
							maxWidth={400}
						>
							<IcMInfo />
						</Tooltip>
					</div>
				)}
			</div>
		</div>
	);
}

export default RenderCardHeader;
