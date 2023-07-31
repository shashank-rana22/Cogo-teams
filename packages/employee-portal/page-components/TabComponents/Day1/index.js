import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import styles from './styles.module.css';

function Day1({ setInformationPage }) {
	const [{ data }, listTrigger] = useHarbourRequest({
		method : 'get',
		url    : '/list_company_documents',
	}, { manual: true });

	const day = data?.list?.[GLOBAL_CONSTANTS.zeroth_index]?.html_template;
	const fetch = useCallback(
		async () => {
			try {
				await listTrigger({
					params: {
						filters: {
							category : 'day_1',
							status   : 'active',
						},
					},
				});
			} catch (error) {
				if (error?.response) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
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

			<div className={styles.rich_text}>
				<div
					className={styles.day1_text}
					dangerouslySetInnerHTML={{ __html: day || 'Day 1!' }}
				/>

			</div>
		</div>
	);
}

export default Day1;
