import { Button } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Details({ data = [] }) {
	function LabelValue({ label, value }) {
		return !isEmpty(value) ? (
			<div>
				<div>{label}</div>
				<div>{value}</div>
			</div>
		) : null;
	}

	function DocumentValue({ vals = [] }) {
		return !isEmpty(vals) ? (
			<Button onClick={() => window.open(vals?.[0]?.url, '_blank')} themeType="link">
				{startCase(vals?.[0]?.name || 'Click to Preview')}
			</Button>
		) : null;
	}

	return (
		<div>
			{data.map((item) => {
				const { sop_detail : { category, remarks, document = [] } } = item || {};
				return (
					<div>
						<div
							className={styles.addtional_data}
						>
							<LabelValue label="Category" value={category} />
							<LabelValue label="Comment" value={remarks} />
						</div>

						<div className={styles.document}>
							<LabelValue label="Document" value={<DocumentValue vals={document} />} />
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default Details;
