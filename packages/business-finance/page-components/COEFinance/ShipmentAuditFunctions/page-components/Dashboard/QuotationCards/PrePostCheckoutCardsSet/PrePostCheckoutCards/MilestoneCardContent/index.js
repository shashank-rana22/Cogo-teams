import { Placeholder, cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcCFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { getFormatAmount } from '../../../../../../utils/getFormatAmount';

import Content from './Content';
import styles from './styles.module.css';

const SLICE_LENGTH = 2;

export default function MilestoneCardContent({
	loading = false,
	data = {},
	title = '',
	services = '',
	accordionState = {},
	toggleAccordion = '',
	category = '',
	shipment_id = '',
	getPrePostShipmentQuotes = () => {},
}) {
	const isOpen = accordionState[`${category}_${title}`];
	const currentKey = `${category}_${title}`;
	return (
		<div className={styles.custom_accordion}>
			{loading ? <Placeholder /> : (
				<div>
					<div className={styles.accord_title}>
						<div className={styles.status_card}>
							<div className={styles.title}>
								{startCase(title?.slice(SLICE_LENGTH))}
							</div>
							{services?.finalStatus ? <IcCFtick /> : null}
						</div>

						{!title.includes('MODIFIED') && (
							<div style={{ display: 'flex', width: '50%', justifyContent: 'space-between' }}>
								<div className={`${isOpen ? styles.nothing : styles.other_title}`}>
									<div className={cl`${styles.regular} ${styles.spacing}`}>
										{category === 'BUY' ? 'Expense: ' : 'Income: '}
									</div>
									<div>
										{getFormatAmount(
											services?.grandTotal,
											services?.currency === 'null' ? 'INR' : services?.currency,
										)}
									</div>
								</div>
							</div>
						)}
						{isOpen ? (
							<IcMArrowRotateUp
								className={styles.cursor}
								onClick={() => toggleAccordion(`${category}_${title}`)}
							/>
						)
							: (
								<IcMArrowRotateDown
									className={styles.cursor}
									onClick={() => toggleAccordion(`${category}_${title}`)}
								/>
							)}
					</div>
					<div className={`${!isOpen ? styles.nothing : styles.content}`}>
						{!title?.includes('MODIFIED')
						&& (
							<div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
								<div className={`${!isOpen ? styles.nothing : styles.margin}`}>
									<div className={cl`${styles.regular} ${styles.spacing}`}>
										{category === 'BUY' ? 'Expense: ' : 'Income: '}
									</div>
									<div>
										{getFormatAmount(
											services?.grandTotal,
											services?.currency === 'null' ? 'INR' : services?.currency,
										)}
									</div>
								</div>
							</div>
						)}

						<Content
							data={data}
							loading={loading}
							services={services}
							currentKey={currentKey}
							toggleAccordion={toggleAccordion}
							accordionState={accordionState}
							shipment_id={shipment_id}
							getPrePostShipmentQuotes={getPrePostShipmentQuotes}
						/>

					</div>
				</div>
			)}
		</div>
	);
}
