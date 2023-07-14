import { Button, Tooltip } from '@cogoport/components';
import { IcMDocument } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { getFileName } from '../../../utils/helperFunctions';
import { CUSTOM_TYPES } from '../../../utils/pageMappings';

import styles from './styles.module.css';

function CardDetails({
	cardLabels = [],
	heading = '',
	formattedData = {},
	otherFormattedData = {},
}) {
	const handleView = (url) => {
		if (url) {
			window.open(url);
		}
	};
	console.log(styles);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>{startCase(heading)}</div>
			<div className={styles.card_field}>
				{cardLabels.map((item) => (
					<div className={styles.single_field} key={item.key}>
						<div className={styles.field_title}>{item.label}</div>
						<div className={styles.field_mid}>:</div>
						<div className={styles.field_value}>
							{item.customType === CUSTOM_TYPES.DOCUMENT ? (
								<div className={styles.field_docs}>
									{formattedData[item.key]?.map((singleDocument) => (
										<div className={styles.document} key={singleDocument.id}>
											<IcMDocument
												height={50}
												width={60}
												color="#f37166"
												style={{ cursor: 'pointer' }}
												onClick={() => handleView(singleDocument?.url)}
											/>
											<Tooltip
												placement="bottom"
												content={getFileName(singleDocument?.url)}
												className={styles.tooltip_container}
											>
												<Button
													themeType="link"
													size="sm"
													onClick={() => handleView(singleDocument?.url)}
												>
													View
												</Button>
											</Tooltip>

										</div>
									))}
								</div>
							) : (
								<div>{otherFormattedData[item?.key]}</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default CardDetails;
