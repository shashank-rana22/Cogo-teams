import { Accordion } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import BuySellStatusContent from './BuySellStatusContent';
import Content from './Content';
import styles from './styles.module.css';
import Title from './Title';

export default function Accordian({
	isOpen = false,
	toggleAccordion,
	columnIndex,
	index,
	income,
	profitability,
}) {
	return (
	// <Accordion
	// 	title={<Title toggleAccordion={toggleAccordion} />}
	// 	style={{
	// 		width      : '100%',
	// 		marginTop  : '10px',
	// 		height     : 'auto',
	// 		display    : 'flex',
	// 		alignItems : 'center',
	// 	}}
	// 	isOpen={isOpen}
	// >
	// 	<Content />
	// </Accordion>
		<div className={styles.custom_accordion}>
			<div className={styles.accord_title}>
				{/* <div className={`${!isOpen ? styles.close_title : styles.open_title}`}> */}
				<div>
					<Title />
				</div>

				<div className={`${isOpen ? styles.nothing : styles.other_title}`}>
					<div className={styles.regular}>Income :</div>
					<div>{income}</div>
				</div>
				<div className={`${isOpen ? styles.nothing : styles.other_title}`}>
					<div className={styles.regular}>Profitability :</div>
					<div className={`${profitability > 0 ? styles.green : styles.red}`}>{profitability}</div>
				</div>
				{/* </div> */}
				{isOpen ? (
					<IcMArrowRotateUp
						style={{ cursor: 'pointer' }}
						onClick={() => toggleAccordion(columnIndex, index)}
					/>
				)
					: (
						<IcMArrowRotateDown
							style={{ cursor: 'pointer' }}
							onClick={() => toggleAccordion(columnIndex, index)}
						/>
					)}
			</div>
			<div className={`${!isOpen ? styles.nothing : styles.content}`}>
				{(columnIndex % 2 === 0)
					? (
						<>
							<div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
								<div className={`${!isOpen ? styles.nothing : styles.margin}`}>
									<div className={styles.regular}>Income :</div>
									<div>{income}</div>
								</div>
								<div className={`${!isOpen ? styles.nothing : styles.margin}`}>
									<div className={styles.regular}>Profitability :</div>
									<div className={`${profitability > 0
										? styles.green : styles.red}`}
									>
										{profitability}

									</div>
								</div>
							</div>
							<Content
								toggleAccordion={toggleAccordion}
								columnIndex={columnIndex}
								index={index}
							/>
						</>
					)
					: (
						<BuySellStatusContent
							toggleAccordion={toggleAccordion}
							columnIndex={columnIndex}
							index={index}
						/>
					)}
				{/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
					<div className={`${!isOpen ? styles.nothing : styles.margin}`}>
						<div className={styles.regular}>Income :</div>
						<div>{income}</div>
					</div>
					<div className={`${!isOpen ? styles.nothing : styles.margin}`}>
						<div className={styles.regular}>Profitability :</div>
						<div className={`${profitability > 0 ? styles.green : styles.red}`}>{profitability}</div>
					</div>
				</div>
				<Content
					toggleAccordion={toggleAccordion}
					columnIndex={columnIndex}
					index={index}
				/> */}
				{/* <BuySellStatusContent
					toggleAccordion={toggleAccordion}
					columnIndex={columnIndex}
					index={index}
				/> */}
			</div>
		</div>
	);
}
