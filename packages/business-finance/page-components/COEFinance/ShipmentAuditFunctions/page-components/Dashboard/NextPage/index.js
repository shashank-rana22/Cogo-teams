/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
// import Accordian from './Accordian';
// import Headings from './Headings';
// import styles from './styles.module.css';

// function NextPage() {
// 	return (
// 		<div className={styles.row}>
// 			<div className={styles.column}>
// 				<div className={styles.accordion}>
// 					<div>
// 						<Headings />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 				</div>
// 				<div className={styles.accordion}>
// 					<div>
// 						<Headings />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 				</div>
// 			</div>
// 			<div className={styles.column}>
// 				<div className={styles.accordion}>
// 					<div>
// 						<Headings />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 				</div>
// 				<div className={styles.accordion}>
// 					<div>
// 						<Headings />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 					<div>
// 						<Accordian />
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default NextPage;

import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDummyCircle } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Accordian from './Accordian';
import Headings from './Headings';
import styles from './styles.module.css';

const ZEROTH_INDEX = 0;
const FIRST_INDEX = 1;
const SECOND_INDEX = 2;
const THIRD_INDEX = 3;
const FIFTH_INDEX = 5;

function NextPage() {
	const [accordionStates, setAccordionStates] = useState([
		[true, false, false, false, false, false],
		[false, false, false, false, false, false],
		[true, false, false, false, false, false],
		[false, false, false, false, false, false],
	]);

	const [income, setIncome] = useState('1234567890123');
	const [profitability, setProfitability] = useState('123');

	const toggleAccordion = (rowIndex, index) => {
		const newAccordionStates = [...accordionStates];
		newAccordionStates[rowIndex][index] = !newAccordionStates[rowIndex][index];
		setAccordionStates(newAccordionStates);
	};

	const GenerateColumn = (columnIndex) => accordionStates[columnIndex].map((isOpen, index) => (

		<div key={`${columnIndex},${index}`} style={{ display: 'flex', width: '100%' }}>
			<div className={styles.vertical_timeline}>

				{ index !== FIFTH_INDEX
					? (
						<>
							<IcMDummyCircle
								fill="#EE3425"
								height="20"
								width="20"
							/>
							<div className={styles.vertical_rule} />
						</>
					)
					: (
						<IcMDummyCircle
							fill="#EE3425"
							height="20"
							width="20"
							style={{ marginBottom: '24px' }}
						/>
					) }
			</div>
			<Accordian
				isOpen={isOpen}
				toggleAccordion={toggleAccordion}
				columnIndex={columnIndex}
				index={index}
				income={income}
				profitability={profitability}
			/>
		</div>
	));

	return (
		<div className={styles.row}>
			<div className={styles.column}>
				<div className={styles.accordion}>
					<div className={styles.header}>
						<Headings heaadingText="Sell Quotation" />
					</div>
					{GenerateColumn(ZEROTH_INDEX)}
				</div>

				<div className={styles.accordion}>
					<div className={styles.header}>
						<Headings heaadingText="Operationally Closed Sell" />
					</div>
					{GenerateColumn(FIRST_INDEX)}
				</div>
			</div>
			<div className={styles.column}>
				<div className={styles.accordion}>
					<div className={styles.header}>
						<Headings heaadingText="Buy Quotation" />
					</div>
					{GenerateColumn(SECOND_INDEX)}
				</div>
				<div className={styles.accordion}>
					<div className={styles.header}>
						<Headings heaadingText="Operationally Closed Buy" />
					</div>
					{GenerateColumn(THIRD_INDEX)}
				</div>

			</div>
		</div>
	);
}

export default NextPage;
