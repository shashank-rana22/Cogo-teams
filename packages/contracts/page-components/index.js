import { useState } from 'react';

import DetailView from './DetailView';
import PageView from './PageView';

function Contracts() {
	const [showDetail, setShowDetail] = useState(null);
	return (
		<>
			{' '}
			{showDetail ? <DetailView setShowDetail={setShowDetail} /> : <PageView setShowDetail={setShowDetail} />}
		</>
	);
}

export default Contracts;
