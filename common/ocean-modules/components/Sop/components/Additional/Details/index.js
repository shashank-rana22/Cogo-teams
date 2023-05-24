import { Button } from '@cogoport/components';
import { isEmpty, startCase, format } from '@cogoport/utils';

import styles from './styles.module.css';

function Details({
	data = [],
	setShowForm = () => {},
}) {
	function LabelValue({
		label,
		value,
		customClass,
	}) {
		return !isEmpty(value) ? (
			<div className={`${styles.label_value_container} ${customClass}`}>
				<div className={styles.label}>{label}</div>
				<div>{value}</div>
			</div>
		) : null;
	}

	function documentValue({ vals = [] }) {
		return !isEmpty(vals) ? (
			<Button onClick={() => window.open(vals?.[0]?.url || vals, '_blank')} themeType="link">
				{vals?.[0]?.name || 'Click to Preview'}
			</Button>
		) : null;
	}

	return (
		<div className={styles.container}>

			{!data?.length ? <div className={styles.no_data}>No data available</div>

				: (
					<div className={styles.addtional_container}>
						{data.map((item) => {
							const { sop_detail : { category, remarks, document = [] }, created_at, id } = item || {};
							return (
								<div className={styles.addtional_data} key={id}>
									<LabelValue label="Category" value={startCase(category)} />
									<LabelValue label="Comment" value={remarks} />
									<LabelValue
										label="Commented On"
										value={format(created_at, 'dd MMM yyyy HH:mm:ss')}
									/>

									<LabelValue
										label="Document"
										customClass={styles.document_value}
										value={documentValue({ vals: document })}
									/>
								</div>
							);
						})}
					</div>
				)}
			<div className={styles.add}>
				<Button onClick={() => setShowForm(true)} size="sm" themeType="accent">Add Comments</Button>
			</div>
		</div>
	);
}
export default Details;
