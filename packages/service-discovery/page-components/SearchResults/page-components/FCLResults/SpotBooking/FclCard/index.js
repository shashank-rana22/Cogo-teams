import { useState } from 'react';

import DetailFooter from './DetailFooter';
import MainCard from './MainCard';
import styles from './styles.module.css';

function FclCard({ detail = {}, shippingLines = [] }) {
	const [detentionValues, setDetentionValues] = useState({
		origin_detention      : 4,
		origin_demurrage      : 4,
		destination_detention : 4,
		destination_demurrage : 4,
	});
	return (
		<div className={styles.container}>
			<MainCard detail={detail} shippingLines={shippingLines} />

			<DetailFooter detail={detail} setDetentionValues={setDetentionValues} detentionValues={detentionValues} />
		</div>
	);
}

export default FclCard;
