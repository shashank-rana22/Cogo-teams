import React from 'react';

import SingleStrip from './SingleStrip';
import styles from './styles.module.css';

function ProgressStrip({ currentStep = '', progressSteps = [] }) {
	return (
		<Container>
			<Steps>
				{progressSteps?.map((item, index) => (
					<>
						<Step>
							<SingleStrip
								item={item}
								currentStep={currentStep}
								count={index + 1}
							/>
						</Step>
						{index < progressSteps.length - 1 ? <Line /> : null}
					</>
				))}
			</Steps>
		</Container>
	);
}

export default ProgressStrip;
