import { Popover } from '@cogoport/components';

import EachPortPairCard from '../EachPortPairCard';

import styles from './styles.module.css';

const EXECPT_FIRST = 1;
const DEFAULT_LENGTH = 0;

function PortPairsExtra({ portPairCardData = [] }) {
	return (
		<div className={styles.tooltip_container}>
			{portPairCardData?.map((eachCard) => <EachPortPairCard key={eachCard?.id} eachItem={eachCard} />)}
		</div>
	);
}

function PortPairData({ portPairCardData = [] }) {
	const [firstData, ...restData] = portPairCardData || [];

	const portPairsLength = (portPairCardData.length || DEFAULT_LENGTH) - EXECPT_FIRST;

	return (
		<div className={styles.port_pair_data}>
			<EachPortPairCard eachItem={firstData} />
			{portPairsLength > DEFAULT_LENGTH ? (
				<Popover
					content={<PortPairsExtra portPairCardData={restData} />}
					placement="bottom"
					interactive
					trigger="click"
					caret={false}
					className={styles.popover_styles}
				>
					<div className={styles.sub_text}>
						+
						{portPairsLength}
						{' '}
						more
					</div>
				</Popover>
			) : null}
		</div>
	);
}
export default PortPairData;
