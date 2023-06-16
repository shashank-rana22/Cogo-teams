import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function RemarkContent({ remarkData = {}, remarkLoading = false }) {
	const { list = [] } = remarkData || {};

	if (remarkLoading) return [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <Placeholder key={i} />);

	if (list.length > 0) {
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
