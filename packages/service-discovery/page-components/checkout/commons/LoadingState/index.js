import { useState, useEffect } from 'react';

import DotLoader from './DotLoader';
import styles from './styles.module.css';

const INTERVAL = 6000;
const INDEX_TO_VALUE_DIFF = 1;

const OPTIONS = [
	`Barcodes were initially introduced for identification purposes in the transportation industry, 
	particularly on railroads 🚆. Their presence on the sides of railroad cars paved the way for their
	 adoption in supermarkets 🏬, starting from 1974.`,
	`The logistics industry is becoming increasingly automated 🤖, with the use of robots,
	 drones, and autonomous vehicles.`,
	`Majority of goods in the logistics industry are still transported by sea 🌊. In fact, 
	 over 90% of global trade is transported by sea, 
	 with the world's largest container ships capable of carrying up to 24,000 containers.`,
	`The logistics industry is also a major source of employment, 👔 with over 70 million people employed 
	 in logistics-related jobs around the world 🌎`,
	`With approximately 7 million trucks 🚚 operating worldwide, these vehicles collectively travel a mind-boggling
	distance of 875,000,000,000 miles, equivalent to about 1/5th of a
	 light-year or nearly 6,000 round trips to the Sun🌞`,
	`If we were to line up all the sausages 🌭 delivered by logistics companies each year, they would form a chain 
	that stretches beyond the moon 🌕`,
	'The word "logistics" comes from the Greek word "logistikos", which means "skilled in calculation"',
	`The first use of the word "logistics" in a military context was in the 18th century,
	  when it was used to describe the process of moving troops and supplies.`,
	'The logistics industry is responsible for about 10% of the world\'s GDP.',
	'The average truck driver spends 220 days per year on the road.',
	`The world's largest cargo ship, the HMM Algeciras,
	can carry the equivalent of 21,000 20-foot shipping containers.`,
	`The world's longest shipping route is from Rotterdam, Netherlands to Qingdao,
	  China, which is over 10,000 miles long.`,
	`The most expensive shipping accident in history was the sinking of the MV Ever Given in the Suez Canal in 2021,
	   which caused an estimated $10 billion in losses.`,
	`The logistics industry is a major source of greenhouse gas emissions, 
	accounting for about 8% of global emissions.`,
	`Amazon's Prime Air drone delivery service aims to deliver packages under
	 5 pounds in 30 minutes or less.`,
	'The largest cargo plane, the Antonov An-225 Mriya, has a maximum payload capacity of 640 metric tons.',
	'The largest shipping container vessel can carry over 20,000 twenty-foot equivalent units (TEUs).',
	'In 2020, UPS delivered an average of 21.1 million packages per day.',
	`The largest air cargo hub in the world is the FedEx Express World Hub in Memphis,
	 covering 5.1 million square feet.`,
	'In 2020, the logistics industry handled over 107 billion metric tons of goods globally.',
	'Amazon\'s fulfillment centers are so vast that some are larger than 28 football fields.',
	'The global logistics market is projected to reach a value of over $15.5 trillion by 2025.',
	'FedEx has a fleet of more than 670 aircraft, making it one of the largest airline operators globally.',
	'The Port of Shanghai in China is the world\'s busiest container port, handling over 43 million TEUs in 2020.',
	'In 2021, the global e-commerce market was estimated to be worth over $4.2 trillion.',
	'DHL, one of the largest logistics companies, operates in more than 220 countries and territories worldwide.',
	'The Maersk Triple-E class container ships, among the largest in the world, can carry over 18,000 TEUs.',
];

export function LoadingState() {
	const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * OPTIONS.length));

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + INDEX_TO_VALUE_DIFF) % OPTIONS.length);
		}, INTERVAL);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.loading_text}>
				Here are some fun facts while we prepare your checkout

				<DotLoader />
			</div>
			<div className={styles.content}>{OPTIONS[currentIndex]}</div>
		</div>
	);
}
