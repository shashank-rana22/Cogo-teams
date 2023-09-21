import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function ToolTipContent({ content = [] }) {
	const totalFunctionPills = content?.length;

	if (totalFunctionPills <= FIRST_INDEX) {
		(content).map((item) => (
			<Pill
				key={item}
				className={styles.function_head}
				color="red"
			>
				{item}
			</Pill>
		));
	}

	const renderTooltip = content.slice(FIRST_INDEX).map((item) => (
		<Pill
			key={item}
			className={styles.function_head}
			color="red"
		>
			{item}
		</Pill>
	));

	return (
		<section>
			<div className={styles.sub_functions_container}>
				{content[GLOBAL_CONSTANTS.zeroth_index] && (
					<Pill className={styles.function_head} color="red">
						{content[GLOBAL_CONSTANTS.zeroth_index]}
					</Pill>
				)}

				{totalFunctionPills > FIRST_INDEX && (
					<Tooltip content={renderTooltip} placement="top">
						<strong>
							(+
							{totalFunctionPills - FIRST_INDEX}
							)
						</strong>
					</Tooltip>
				)}

			</div>
		</section>
	);
}
export default ToolTipContent;
