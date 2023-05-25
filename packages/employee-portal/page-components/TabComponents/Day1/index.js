import { IcMArrowBack } from '@cogoport/icons-react';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import styles from './styles.module.css';

function Day1({ setInformationPage }) {
	const [{ data, loading = false }, listTrigger] = useHarbourRequest({
		method : 'get',
		url    : '/list_document_templates',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			try {
				await listTrigger({
					params: {
						filters: {
							template_type : 'day_1',
							status        : 'active',
						},
					},
				});
			} catch (error) {
				console.log('error :: ', error);
			}
		},
		[listTrigger],
	);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack
					role="presentation"
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => setInformationPage('')}
				/>
				<div className={styles.title}>DAY 1</div>
			</div>
			<div className={styles.ansofques}>
				<div dangerouslySetInnerHTML={{ __html: data?.list?.[0]?.html_template || 'Day 1!' }} />
			</div>
		</div>
	);
}

export default Day1;
