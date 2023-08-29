import { IcMFtick } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import styles from '../styles.module.css';

function RemarksDetails({ loading = false, selectedCard = {}, isEmpty = false }) {
	const ZEROVALUE = 0;
	const ONEVALUE = 1;
	const TWOVALUE = 2;
	return (
		<div className={styles.remarks}>
			{!loading
				&& selectedCard?.negotiation_remarks !== null
				&& selectedCard?.negotiation_remarks?.length > ZEROVALUE
				&& (selectedCard?.negotiation_remarks?.length > ONEVALUE
					? selectedCard?.negotiation_remarks[ONEVALUE]?.negotiation_rank === TWOVALUE && (
						<>
							<div className={styles.main}>
								<div className={styles.tick}>
									<IcMFtick className={styles.adjust} />
									Second Negotiation Remark:
								</div>

								<div className={styles.date}>
									{format(selectedCard?.negotiation_remarks[ONEVALUE]?.date, 'dd MMMM YYYY')}
								</div>
							</div>
							<div className={styles.remark}>
								{selectedCard?.negotiation_remarks[ONEVALUE]?.remarks}
							</div>
						</>
					)
					: selectedCard?.negotiation_remarks[ZEROVALUE]?.negotiation_rank === ONEVALUE && (
						<>
							<div className={styles.main}>
								<div className={styles.tick}>
									<IcMFtick className={styles.adjust} />
									First Negotiation Remark:
								</div>
								<div className={styles.date}>
									{format(selectedCard?.negotiation_remarks[ONEVALUE]?.date, 'dd MMMM YYYY')}
								</div>
							</div>
							<div className={styles.remark}>
								{selectedCard?.negotiation_remarks[ZEROVALUE]?.remarks}
							</div>
						</>
					))}
			{isEmpty && <p>No remarks found</p>}
			{
				!loading && !selectedCard?.negotiation_remarks
				&& selectedCard?.commodity_remarks && (
					<>
						<div className={styles.main}>
							<div className={styles.tick}>
								<IcMFtick className={styles.adjust} />
								Initial Remark:
							</div>
						</div>
						<div className={styles.remark}>
							{selectedCard?.commodity_remarks}
						</div>
					</>
				)
			}
		</div>
	);
}

export default RemarksDetails;
