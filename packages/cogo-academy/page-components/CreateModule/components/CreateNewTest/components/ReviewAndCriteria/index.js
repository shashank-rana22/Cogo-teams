import { Pill, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetTest from '../../../../hooks/useGetTest';

import DurationAndValidity from './components/DurationAndValidity';
import QuestionsAndDistribution from './components/QuestionsAndDistribution';
import styles from './styles.module.css';

function ReviewAndCriteria({ setActiveStepper }) {
	const { control, formState:{ errors }, watch } = useForm();
	const router = useRouter();
	const test_id = router.query?.id;
	const {
		loading,
		data,
		getTest,
	} = useGetTest({ test_id });

	const navigate = () => {
		const href = '/learning/faq/create/';
		router.push(href, href);
	};

	useEffect(() => {
		if (!isEmpty(test_id)) { getTest({ test_id }); }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [test_id]);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack width={20} height={20} onClick={navigate} />
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
			<QuestionsAndDistribution control={control} errors={errors} loading={loading} data={data?.set_data} />
			<DurationAndValidity control={control} errors={errors} loading={loading} />
			<div className={`${styles.btn_container} ${styles.btn_cont_float}`}>
				<Button
					loading={loading}
					size="md"
					themeType="tertiary"
					style={{ marginRight: '10px' }}
					onClick={() => {
					}}
				>
					Save As Draft
				</Button>
				<Button
					size="md"
					themeType="primary"
					onClick={() => {
						const values = watch();
						console.log('values:: ', values);
					}}
				>
					Publish Test

				</Button>
			</div>
		</div>
	);
}

export default ReviewAndCriteria;
