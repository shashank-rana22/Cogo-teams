import { useState, useEffect } from 'react';

import ColumnHeader from './ColumnHeader';
import styles from './styles.module.css';

function DecisionPointsCard({ serviceData, supplierPayload, priceData }) {
	const [list, setList] = useState({});
	useEffect(() => {
		(Object.keys(supplierPayload)).forEach((item) => {
			serviceData.map((serv) => {
				if (item === serv?.id) {
					setList((prevList) => ({
						...prevList,
						[serv.service_type]: {
							...prevList[serv.service_type],
							[serv.id]: [...supplierPayload[serv.id]],
						},
					}));
				}
				return null;
			});
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [supplierPayload]);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<ColumnHeader list={list} priceData={priceData} />
			</div>
		</div>
	);
}

export default DecisionPointsCard;
