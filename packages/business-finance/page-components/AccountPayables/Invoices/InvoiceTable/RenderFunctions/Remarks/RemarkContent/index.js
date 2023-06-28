import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const LENGTH_PLACEHOLDER = 8;

function RemarkContent({ remarkData = {}, remarkLoading = false }) {
	const { list = [] } = remarkData || {};

	if (remarkLoading) return Array.from(Array(LENGTH_PLACEHOLDER).keys()).map((i) => <Placeholder key={i} />);

	if (!isEmpty(list)) {
		return (
			<div className={styles.container}>
				<div className={styles.styledheading}>Remarks History</div>
				<div className={styles.history_tl_container}>
					<ul className={styles.tl}>
						{(list || []).map(({ remarks = '', createdAt = '' }) => (
							<li key={remarks}>
								<div className={styles.flex}>
									<div className={styles.flexcol}>
										<span>{createdAt}</span>
									</div>
									<div className={styles.minwidth}>
										<span>{remarks}</span>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
	return <span>NO REMARK HISTORY FOUND</span>;
}

export default RemarkContent;
