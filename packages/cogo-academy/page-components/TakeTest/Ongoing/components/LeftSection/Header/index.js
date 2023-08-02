import { ProgressBar, Popover } from '@cogoport/components';
import { IcMOverflowLine } from '@cogoport/icons-react';

import toFixed from '../../../../../CreateModule/utils/toFixed';
import RightSection from '../../RightSection';

import styles from './styles.module.css';
import Timer from './Timer';

const PERCENT = 100;
const DECIMAL_PLACES = 2;

function Header({
	total_question, testData,	setShowTimeOverModal, start_time, setActiveState,
	setShowInstructionsModal, setShowSubmitTestModal, user_appearance = [],
}) {
	const time = new Date(start_time).getTime();

	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>{testData?.name}</div>

			<div className={styles.detailscontainer}>
				<div className={styles.progress}>
					<ProgressBar
						progress={toFixed(((user_appearance.length / total_question) * PERCENT), DECIMAL_PLACES)}
						uploadText="done"
						className={styles.progressbar}
					/>
					{user_appearance.length}
					/
					{total_question}
					{' '}
					Questions
				</div>

				<Timer
					test_start_time={time}
					duration={testData?.test_duration}
					setShowTimeOverModal={setShowTimeOverModal}
				/>
				<Popover
					interactive
					placement="bottom"
					caret={false}
					content={(
						<RightSection
							setShowSubmitTestModal={setShowSubmitTestModal}
							setShowInstructionsModal={setShowInstructionsModal}
							setActiveState={setActiveState}
							styles={{ height: 'auto' }}
						/>
					)}
					theme="light"
				>
					<IcMOverflowLine
						className={styles.styledoverflowline}
					/>
				</Popover>
			</div>
		</div>

	);
}

export default Header;
