import { Button } from '@cogoport/components';

import Layout from '../../../common/Layout';
import useCreateUpdateTnc from '../../../hooks/useCreateUpdateTnc';

import styles from './style.module.css';

function TermsAndCondition(props) {
	const {
		action,
		organizationId,
		setEditTncModalId,
		setTncLevel,
		control,
		formProps,
		showElements,
		newControl,
		editTncModalId,
		refetch,
		editFormValue,
	} = props;
	const {
		handleSubmit = () => {},
		formState: { errors = {} },
	} = formProps;

	const { onSubmit, loading } = useCreateUpdateTnc({
		editTncModalId,
		setEditTncModalId,
		refetch,
		editFormValue,
		action,
		organizationId,
	});

	return (
		<div className={styles.container}>

			<div className={styles.container}>
				<Layout controls={newControl} control={control} errors={errors} showElements={showElements} />
			</div>

			<div className={styles.btn_align}>
				<Button
					className={`${styles.secondary} ${styles.md}`}
					disabled={loading}
					onClick={() => setTncLevel('basicInfo')}
					style={{ textTransform: 'capitalize' }}
				>
					Back
				</Button>

				<Button
					className={`${styles.primary}, ${styles.md}`}
					loading={loading}
					onClick={handleSubmit(onSubmit)}
					style={{ marginLeft: '8px', textTransform: 'capitalize' }}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default TermsAndCondition;
