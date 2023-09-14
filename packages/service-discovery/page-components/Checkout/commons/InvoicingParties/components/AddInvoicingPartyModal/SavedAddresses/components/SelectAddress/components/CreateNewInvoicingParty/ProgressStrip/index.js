import SingleStrip from './SingleStrip';
import styles from './styles.module.css';

const INDEX_TO_VALUE_DIFF = 1;

function ProgressStrip({ currentStep = '', progressSteps = [] }) {
	return (
		<div className={styles.container}>
			<div className={styles.steps}>
				{progressSteps?.map((item, index) => (
					<>
						<div className={styles.Step}>
							<SingleStrip
								item={item}
								currentStep={currentStep}
								count={index + INDEX_TO_VALUE_DIFF}
							/>
						</div>
						{index < progressSteps.length - INDEX_TO_VALUE_DIFF ? <div className={styles.line} /> : null}
					</>
				))}
			</div>
		</div>
	);
}

export default ProgressStrip;
