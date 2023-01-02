import { useState } from 'react';

import DetailView from './DetailView';
import PageView from './PageView';
import styles from './styles.module.css';

function Contracts() {
	const [showDetail, setShowDetail] = useState(null);
	return (
		<>

			<div className={styles.heading}>
				Contracts
			</div>
			{' '}
			{showDetail
				? (
					<DetailView
						showDetail={showDetail}
						setShowDetail={setShowDetail}
					/>
				)
				: <PageView setShowDetail={setShowDetail} />}
		</>
	);
}

export default Contracts;
