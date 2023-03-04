import { IcMPdf } from '@cogoport/icons-react';
import { format, startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import documentStatus from './DocumentStatus';
import styles from './styles.module.css';

function Documents() {
	const dummyData = [
		{
			status   : 'progress',
			content  : 'Document sent by customer for SID #123456',
			document : 'PAN .pdf',
		},
		{
			status   : 'verified',
			content  : 'Document sent by customer for SID #123456',
			document : 'PAN .pdf',
		},
		{
			status   : 'submitted',
			content  : 'Document sent by customer for SID #123456',
			document : 'PAN .pdf',
		},
		{
			status   : 'not_submitted',
			content  : 'Document sent by customer for SID #123456',
			document : 'PAN .pdf',
		},
	];
	return (
		<>
			<div className={styles.title}>Documents</div>
			{ (dummyData || []).map((item) => (
				<>
					<div className={styles.activity_date}>
						<div className={styles.dot} />
						<div className={styles.durations}>
							{format(new Date(), 'hh:mm a,')}
							{format(new Date(), ' MMM dd')}

						</div>
					</div>
					<div className={styles.main_card}>
						<div className={styles.card}>
							<div className={styles.header}>
								{documentStatus(item?.status)}
							</div>
							<div className={styles.content}>
								{item?.content}
							</div>
							<div className={styles.document}>
								<IcMPdf width={18} height={18} fill="#C4DC91" />
								<div className={styles.document_name}>
									{item?.document}
								</div>

							</div>
						</div>
					</div>
				</>
			))}

		</>
	);
}
export default Documents;
