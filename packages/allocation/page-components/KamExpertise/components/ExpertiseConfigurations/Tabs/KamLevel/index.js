import { Accordion } from '@cogoport/components';
import React, { useState } from 'react';

import { dummyData } from './DummyData';
import HeaderCard from './HeaderCard';
import KamLevelCard from './KamLevelCard';
import KamLevelDetailsEdit from './KamLevelDetailsEdit';
import KamLevelDetailsShow from './KamLevelDetailsShow';
import styles from './styles.module.css';

function KamLevel() {
	const [titleVisibile, setTitleVisible] = useState(true);
	const [editItem, setEditItem] = useState(true);

	// const handleState = () => {
	// 	setEditItem((pv) => !pv);
	// };

	// useEffect(() => {
	//   console.log('edit changed');
	// }, [editItem]);

	return (
		<div>
			<HeaderCard />
			<div>

				{Object.entries(dummyData).map(([key, value]) => (
					<Accordion
						id={key}
						title={(
							<KamLevelCard
								title={titleVisibile}
								setEditItem={setEditItem}
								editItem={editItem}
								data={value}
							/>
						)}
						className={styles.accrodian}
					>
						{editItem ? <KamLevelDetailsShow data={value} /> : <KamLevelDetailsEdit />}

					</Accordion>

				))}

			</div>

		</div>

	);
}

export default KamLevel;
