import { Placeholder } from '@cogoport/components';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcCFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import Content from './Content';
import styles from './styles.module.css';

const SLICE_LENGTH = 2;
const ZERO_VALUE = 0;

export default function CardContent({
	loading = false,
	data = {},
	title = '',
	services = '',
	accordionState = {},
	toggleAccordion = '',
	// setAccordionState,
	category = '',
	getPrePostShipmentQuotes = {},
}) {
	const isOpen = accordionState[`${category}_${title}`];
	const currentKey = `${category}_${title}`;
	// console.log({ title });
	return (
		<div className={styles.custom_accordion}>
			{loading ? <Placeholder /> : (
				<div>
					<div className={styles.accord_title}>
						<div className={styles.status_card}>
							<div className={styles.title}>
								{startCase(title.slice(SLICE_LENGTH))}
							</div>
							{services?.finalStatus ? <IcCFtick /> : null}
						</div>

						{!title.includes('MODIFIED') && (
							<div style={{ display: 'flex', width: '50%', justifyContent: 'space-between' }}>
								<div className={`${isOpen ? styles.nothing : styles.other_title}`}>
									<div className={styles.regular}>{category === 'BUY' ? 'Expense' : 'Income'}</div>
									<div>
										{formatAmount({
											amount   : services?.grandTotal || ZERO_VALUE,
											currency : services?.currency === 'null' ? 'INR' : services?.currency,
											options  : {
												currencyDisplay : 'code',
												style           : 'currency',
											},
										})}
									</div>
								</div>
								{/* <div className={`${isOpen ? styles.nothing : styles.other_title}`}>
									<div className={styles.regular}>Profitability :</div>
									<div className={`${PROFITABILITY > ZERO_VALUE ? styles.green : styles.red}`}>
										10
									</div>
								</div> */}
							</div>
						)}
						{isOpen ? (
							<IcMArrowRotateUp
								style={{ cursor: 'pointer' }}
								onClick={() => toggleAccordion(`${category}_${title}`)}
							/>
						)
							: (
								<IcMArrowRotateDown
									style={{ cursor: 'pointer' }}
									onClick={() => toggleAccordion(`${category}_${title}`)}
								/>
							)}
					</div>
					<div className={`${!isOpen ? styles.nothing : styles.content}`}>
						{!title.includes('MODIFIED')
						&& (
							<div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
								<div className={`${!isOpen ? styles.nothing : styles.margin}`}>
									<div className={styles.regular}>
										{category === 'BUY' ? 'Expense' : 'Income'}
									</div>
									<div>
										{formatAmount({
											amount   : services?.grandTotal || ZERO_VALUE,
											currency : services?.currency === 'null' ? 'INR' : services?.currency,
											options  : {
												currencyDisplay : 'code',
												style           : 'currency',
											},
										})}
									</div>
								</div>
								{/* <div className={`${!isOpen ? styles.nothing : styles.margin}`}>
									<div className={styles.regular}>Profitability </div>
									<div className={`${PROFITABILITY > ZERO_VALUE ? styles.green : styles.red}`}>
										10
									</div>
								</div> */}
							</div>
						)}

						<Content
							data={data}
							loading={loading}
							services={services}
							currentKey={currentKey}
							toggleAccordion={toggleAccordion}
							accordionState={accordionState}
							getPrePostShipmentQuotes={getPrePostShipmentQuotes}
						/>

					</div>
				</div>
			)}
		</div>
	);
}
