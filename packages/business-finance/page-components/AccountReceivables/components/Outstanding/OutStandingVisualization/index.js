import React, { useState } from 'react';

import VisualizationData from './VisualizationData';

function OutStandingVisualization({ entityCode = '' }) {
	const [openVisualization, setOpenVisualization] = useState(true);
	return (
		<div style={{ paddingTop: '20px' }}>
			<VisualizationData
				entityCode={entityCode}
				openVisualization={openVisualization}
				setOpenVisualization={setOpenVisualization}
			/>
		</div>
	);
}

export default OutStandingVisualization;
