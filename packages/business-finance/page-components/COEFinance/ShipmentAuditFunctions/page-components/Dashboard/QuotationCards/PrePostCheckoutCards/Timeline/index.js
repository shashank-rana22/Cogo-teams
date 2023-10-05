import { Placeholder } from '@cogoport/components';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import Content from './Content';
import styles from './styles.module.css';

const SLICE_LENGTH = 2;

export default function Timeline({
	loading = false,
	data = {},
	title = '',
	services,
	accordionState,
	toggleAccordion,
	// setAccordionState,
	category,
}) {
	const isOpen = accordionState[`${category}_${title}`];
	// console.log({ services, data });
	const currentKey = `${category}_${title}`;

	return (
		<div className={styles.custom_accordion}>
			{loading ? <Placeholder /> : (
				<div>
					<div className={styles.accord_title}>
						<div>
							{startCase(title.slice(SLICE_LENGTH))}
						</div>

						{/* <div className={`${isOpen ? styles.nothing : styles.other_title}`}>
							<div className={styles.regular}>Income : </div>
							<div>
								{formatAmount({
									amount   : income,
									currency : 'INR',
									options  : {
										currencyDisplay : 'code',
										style           : 'currency',
									},
								})}
							</div>
						</div>
						<div className={`${isOpen ? styles.nothing : styles.other_title}`}>
							<div className={styles.regular}>Profitability :</div>
							<div className={`${profitability > ZERO_VALUE ? styles.green : styles.red}`}>
								{profitability}
							</div>
						</div> */}
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
						{/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
							<div className={`${!isOpen ? styles.nothing : styles.margin}`}>
								<div className={styles.regular}>Income </div>
								<div>
									{formatAmount({
										amount   : income,
										currency : 'INR',
										options  : {
											currencyDisplay : 'code',
											style           : 'currency',
										},
									})}
								</div>
							</div>
							<div className={`${!isOpen ? styles.nothing : styles.margin}`}>
								<div className={styles.regular}>Profitability </div>
								<div className={`${profitability > ZERO_VALUE
									? styles.green : styles.red}`}
								>
									{profitability}

								</div>
							</div>
						</div> */}
						<Content
							data={data}
							loading={loading}
							services={services}
							currentKey={currentKey}
							toggleAccordion={toggleAccordion}
							accordionState={accordionState}
						/>

					</div>
				</div>
			)}
		</div>
	);
}
