import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useImperativeHandle, forwardRef } from 'react';

import FormItem from '../../../common/FormItem';
import getPersonalDetailControls from '../../../configurations/personalDetailControls';
import useQuotation from '../../../hooks/useQuotation';

import styles from './styles.module.css';

function PersonalDetail(props, ref) {
	const { pocDetails = {} } = props;

	const { t } = useTranslation(['cargoInsurance']);

	const personalDetailControls = getPersonalDetailControls({ t });

	const { loading, submitHandler, formhook } = useQuotation({ pocDetails });

	const { handleSubmit } = formhook;

	useImperativeHandle(ref, () => ({
		getPersonalDetails: () => new Promise((resolve) => {
			handleSubmit(
				(data) => resolve(data),
				(error) => resolve({ hasError: true, error }),
			)();
		}),
	}), [handleSubmit]);

	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				<h3>{t('cargoInsurance:personal_details_title')}</h3>
			</div>

			<div className={styles.form_container}>
				<h3 className={styles.form_title}>{t('cargoInsurance:personal_details_subtitle')}</h3>

				<FormItem formhook={formhook} controls={personalDetailControls} />

				<div className={styles.footer}>
					<Button
						themeType="accent"
						loading={loading}
						onClick={handleSubmit(submitHandler)}
					>
						{t('cargoInsurance:send_quote')}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default forwardRef(PersonalDetail);
