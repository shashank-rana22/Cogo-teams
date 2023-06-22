import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import KraModal from './KraModal';

function PerformanceRatingReview() {
	const [show, setShow] = useState(false);
	return (
		<div>
			<div>
				PerformanceRatingReview
			</div>

			<Button
				onClick={() => setShow(true)}
			>
				Add
			</Button>
			{
				show
					? <KraModal show={show} setShow={setShow} />
					: null
			}
		</div>
	);
}

export default PerformanceRatingReview;
