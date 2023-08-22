import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import EachPortPairCard from '../EachPortPairCard';

import styles from './styles.module.css';

const EXECPT_FIRST = 1;
const DEFAULT_LENGTH = 0;

function PortPairsExtra({ portPairCardData = [] }) {
	return (
		<div>
			{portPairCardData?.map((eachCard) => <EachPortPairCard key={eachCard?.id} eachItem={eachCard} />)}
		</div>
	);
}
console.log('PortPairsExtra', PortPairsExtra);
function PortPairData({ portPairCardData = [] }) {
	const firstData = portPairCardData?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const portPairsLength = (portPairCardData.length || DEFAULT_LENGTH) - EXECPT_FIRST;

	return (
		<div className={styles.port_pair_data}>
			<EachPortPairCard eachItem={firstData} />
			{portPairsLength > DEFAULT_LENGTH ? (
				<Tooltip>
					<div className={styles.sub_text}>
						+
						{portPairsLength}
						{' '}
						MORE
					</div>
				</Tooltip>
			) : null}
		</div>
	);
}
export default PortPairData;
