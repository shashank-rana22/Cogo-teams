import { Button } from '@cogoport/components';
import { useImperativeHandle, forwardRef } from 'react';

import FormItem from '../../../common/FormItem';
import getPersonalDetailControls from '../../../configurations/personalDetailControls';
import useQuotation from '../../../hooks/useQuotation';

import styles from './styles.module.css';

function PersonalDetail(props, ref) {
	const { pocDetails = {} } = props;

	const personalDetailControls = getPersonalDetailControls();

	const { loading, sendQuotation, formhook } = useQuotation({ pocDetails });

	const { handleSubmit } = formhook;

	useImperativeHandle(ref, () => ({
		getPersonalDetails: () => new Promise((resolve) => {
			handleSubmit(
				(data) => resolve(data),
				(error) => resolve(error),
			)();
		}),
	}), [handleSubmit]);

	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				<h3>Personal Details</h3>
			</div>

			<div className={styles.form_container}>
				<h3 className={styles.form_title}>Insurance Quotation</h3>

				<FormItem formhook={formhook} controls={personalDetailControls} />

				<div className={styles.footer}>
					<Button
						themeType="accent"
						loading={loading}
						onClick={handleSubmit(sendQuotation)}
					>
						Send Quotation
					</Button>
				</div>
			</div>
		</div>
	);
}

export default forwardRef(PersonalDetail);
