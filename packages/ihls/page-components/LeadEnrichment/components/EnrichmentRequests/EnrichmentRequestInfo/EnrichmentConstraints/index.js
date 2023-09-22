import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import useGetEnrichmentRequestConstraints from '../../../../hooks/useGetEnrichmentRequestConstraints';

import styles from './styles.module.css';

const INDEX_LENGTH_NORMALIZATION = 1;
const MIN_LENGTH = 2;

function EnrichmentConstraints({ request = {} }) {
	const {
		loading,
		response,
	} = useGetEnrichmentRequestConstraints({ enrichment_request_id: request?.id });

	if (loading) return null;

	if (isEmpty(response)) return 'No constraints';

	return (
		<div className={styles.container}>
			Constraints:
			<Tooltip content={(
				<div className={styles.tooltip_content}>
					{response.map((item, index) => (
						<div key={item.name}>
							{index + INDEX_LENGTH_NORMALIZATION}
							.
							{' '}
							{startCase(item.field_type)}
							:
							{' '}
							{item.field_value}
						</div>
					))}
				</div>
			)}
			>
				<div className={styles.tooltip_child}>
					{response.slice(GLOBAL_CONSTANTS.zeroth_index, MIN_LENGTH).map((item) => (
						<Pill
							className={styles.pill}
							size="lg"
							color="green"
							key={item}
						>
							{startCase(item.field_type)}
							:
							{' '}
							{item.field_value}
						</Pill>
					))}
					{response.length > MIN_LENGTH && (
						<span>
							+
							{response.length - MIN_LENGTH}
						</span>
					)}
				</div>
			</Tooltip>
		</div>
	);
}

export default EnrichmentConstraints;
