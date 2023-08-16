import { Button } from '@cogoport/components';

import Layout from '../../../../Layout';

import styles from './styles.module.css';

function RemarkForm({
	controls = {},
	control = {},
	errors = {},
	loading = false,
	onSubmit = () => {},
	handleSubmit = () => {},
	onError = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<div className={styles.heading}>Remarks</div>
				<Layout
					fields={controls}
					control={control}
					errors={errors}
				/>
			</div>

			<div className={styles.button_wrap}>
				<Button
					disabled={loading}
					onClick={handleSubmit(onSubmit, onError)}
				>
					{loading ? 'Sending Remarks...' : 'Send Remarks'}
				</Button>
			</div>
		</div>
	);
}

export default RemarkForm;
