import { Button } from '@cogoport/components';

import Layout from '../../../common/Layout';
import useValidateTermsAndCondition from '../../../hooks/useValidateTermsAndCondition';

import styles from './style.module.css';

function BasicInformation(props) {
	const {
		action,
		organizationId,
		setEditTncModalId,
		setTncLevel,
		control,
		formProps,
		showElements,
		newControl,
	} = props;
	const {
		handleSubmit = () => {},
		formState: { errors = {} },
	} = formProps;

	const { onSubmit, loading } = useValidateTermsAndCondition({
		setTncLevel,
		organizationId,
		setEditTncModalId,
	});
	return (
		<div className={styles.container}>

			<div className={styles.layout_container}>

				<Layout control={control} controls={newControl} showElements={showElements} errors={errors} />
			</div>

			<div className={styles.btn_align}>
				<Button
					disabled={loading}
					onClick={() => {
						setEditTncModalId(null);
					}}
					style={{ textTransform: 'capitalize' }}
				>
					Cancel
				</Button>
				<Button
					loading={loading}
					onClick={
						action === 'update'
							? () => setTncLevel('termsAndCondition')
							: handleSubmit(onSubmit)
					}
					style={{ marginLeft: '8px', textTransform: 'capitalize' }}
				>
					Proceed
				</Button>
			</div>
		</div>
	);
}

export default BasicInformation;
