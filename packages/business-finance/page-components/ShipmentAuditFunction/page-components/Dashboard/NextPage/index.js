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

import { IcMDummyCircle } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Accordian from './Accordian';
import Headings from './Headings';
import styles from './styles.module.css';

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
		console.log(accordionStates);
		const newAccordionStates = [...accordionStates];
		newAccordionStates[rowIndex][index] = !newAccordionStates[rowIndex][index];
		setAccordionStates(newAccordionStates);
	};

	const GenerateColumn = (columnIndex) => accordionStates[columnIndex].map((isOpen, index) => (

		<div key={`${columnIndex},${index}`} style={{ display: 'flex', width: '100%' }}>
			<div className={styles.vertical_timeline}>

				{ index !== 5
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
					<div>
						<Headings />
					</div>
					{GenerateColumn(0)}
				</div>

				<div className={styles.accordion}>
					<div>
						<Headings />
					</div>
					{GenerateColumn(1)}
				</div>
			</div>
			<div className={styles.column}>
				<div className={styles.accordion}>
					<div>
						<Headings />
					</div>
					{GenerateColumn(2)}
				</div>
				<div className={styles.accordion}>
					<div>
						<Headings />
					</div>
					{GenerateColumn(3)}
				</div>

			</div>
		</div>
	);
}

export default NextPage;
