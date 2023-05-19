import { cl, Button } from '@cogoport/components';

import editQuotaControl from '../../../../../configuration/editQuotaControl';
import useUpdateQuota from '../../../../../hooks/useUpdateQuota';
import { getFieldController } from '../../../../../utils/getFieldController';
import styles from '../styles.module.css';

function Quota({ quotaInfo = {}, cancelHandler, successHandler }) {
	const { id = '' } = quotaInfo || {};
	const { formHook = {}, submitHandler, loading } = useUpdateQuota({ id, successHandler });
	const { control, formState:{ errors }, handleSubmit } = formHook || {};

	return (
		<>
			<div className={styles.form_container}>
				{editQuotaControl.map((element) => {
					const { name, label, type } = element;
					const Element = getFieldController(type);
					return (
						<div key={name} className={styles.col}>
							<div className={styles.label_container}>
								<p className={styles.label}>{label}</p>
								{errors?.[name] && (
									<p className={styles.error}>
										{errors?.[name]?.message || errors?.[name]?.type}
									</p>
								)}
							</div>
							<Element control={control} {...element} />
						</div>
					);
				})}
			</div>

			<div className={cl`${styles.flex_box} ${styles.footer}`}>
				<Button themeType="secondary" onClick={cancelHandler} loading={loading}>Cancel</Button>
				<Button
					themeType="accent"
					className={styles.save_btn}
					onClick={handleSubmit(submitHandler)}
					loading={loading}
				>
					Save
				</Button>
			</div>
		</>

	);
}
export default Quota;
