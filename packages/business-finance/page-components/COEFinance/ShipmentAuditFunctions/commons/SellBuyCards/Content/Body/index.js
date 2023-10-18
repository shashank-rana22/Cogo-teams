import { Pill, Placeholder, Tooltip, cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React from 'react';

import LineItemsSection from './LineItemsSection';
import styles from './styles.module.css';

function Body({
	data = {},
	loading = false,
	source = 'FIN',
	type = '',
	setLineItemSectionOpen = () => {},
	lineItemSectionOpen = {},
}) {
	const {
		document_number = '', trade_party = '', document_date = '', document_status = '',
		grand_total = '', quotation_state = '', id = '', line_items = [],
	} = data || {};

	const key = `${type}_${source}_${id}`;
	const isOpen = lineItemSectionOpen?.[key];

	return (
		<div className={cl`${!isOpen ? styles.custom_accordion : styles.custom_accordion_open}`}>
			{loading ? <Placeholder /> : (
				<div>
					<div className={styles.accord_body}>
						<div className={styles.accord_row_content}>
							<div className={styles.regular}>{document_number}</div>
							<div className={styles.trade_party_container}>
								{trade_party ? (
									<Tooltip
										content={(
											<div>{trade_party}</div>
										)}
										placement="top"
									>
										<div className={styles.trade_party_overflowing}>
											{trade_party}
										</div>
									</Tooltip>
								) : '-'}
							</div>
							<div className={styles.date_container}>
								{document_date ? (
									<Tooltip
										content={(
											<div>{document_date}</div>
										)}
										placement="top"
									>
										<div className={styles.date_content}>{document_date}</div>
									</Tooltip>
								) : '-'}
							</div>
							<div className={styles.date_container}>
								{grand_total ? (
									<Tooltip
										content={(
											<div>{grand_total}</div>
										)}
										placement="top"
									>
										<div className={styles.date_content}>{grand_total}</div>
									</Tooltip>
								) : '-'}
							</div>
							<div className={styles.tooltip_container}>
								<Tooltip
									content={(
										<div>{document_status}</div>
									)}
									placement="top"
								>
									<div>
										<Pill
											size="sm"
											className={cl`${quotation_state === 'INIT' ? styles.red : styles.green}`}
										>
											{document_status}
										</Pill>
									</div>
								</Tooltip>
							</div>
						</div>
						{isOpen ? (
							<IcMArrowRotateUp
								style={{ cursor: 'pointer' }}
								onClick={() => {
									setLineItemSectionOpen((prev) => ({ ...prev, [key]: !(prev?.[key]) }));
								}}
							/>
						)
							: (
								<IcMArrowRotateDown
									style={{ cursor: 'pointer' }}
									onClick={() => {
										setLineItemSectionOpen((prev) => ({ ...prev, [key]: !(prev?.[key]) }));
									}}
								/>
							)}
					</div>
					<div className={`${!isOpen ? styles.nothing : styles.content}`}>
						<LineItemsSection lineItems={line_items} />
					</div>
				</div>
			)}
		</div>
	);
}

export default Body;
