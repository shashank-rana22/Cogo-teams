import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

function QnA() {
	const { profile: { user: { id: user_id } }, general: { query: { test_id } } } = useSelector((state) => state);

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : '/list_question_wise_analysis',
		params : {
			user_id, test_id,
		},
	}, { manual: false });

	console.log(data, 'data');

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Questions wise analysis
			</div>
		</div>
	);
}

export default QnA;
