import { Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetTest from '../../../../hooks/useGetTest';

import QuestionsAndDistribution from './components/QuestionsAndDistribution';
import styles from './styles.module.css';

function ReviewAndCriteria({ setActiveStepper }) {
	const router = useRouter();
	const test_id = router.query?.id;
	const {
		loading,
		data,
		getTest,
	} = useGetTest({ test_id });

	useEffect(() => {
		if (!isEmpty(test_id)) { getTest({ test_id }); }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [test_id]);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.title}> Review and Set Criteria </div>
			</div>
			<div className={styles.subcontainer}>
				<div className={styles.label}>{data?.name || '-'}</div>
				<div className={styles.topic}>
					<div className={styles.subtopic}>Topics </div>
					<div className={styles.topic_pill_container}>
						{data?.set_data?.map((question_set) => (
							<Pill size="md" color="blue" className={styles.names}>
								<span className={styles.names}>{question_set?.topic}</span>
							</Pill>
						))}
					</div>
				</div>
				<div className={styles.entity}>
					<div className={styles.label_entity}>Cogo Entity </div>
					<div className={styles.entity_name}>Cogo India</div>
				</div>
				<div className={styles.topic}>
					<div className={styles.subtopic}> Users </div>
					<div>
						<Pill size="md" color="#FEF3E9" className={styles.names}>
							<span className={styles.names}>KAM 1</span>
						</Pill>
						<Pill size="md" color="#FEF3E9">
							<span className={styles.names}>KAM 2</span>
						</Pill>
					</div>
				</div>
			</div>
			<QuestionsAndDistribution loading={loading} data={data?.set_data} />
		</div>
	);
}

export default ReviewAndCriteria;
