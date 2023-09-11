import { Button } from '@cogoport/components';
import React from 'react';

import { getFieldController } from '../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';
import useCreateScoringConfig from './useCreateScoringConfig';

function ScoringApplicability() {
	const {
		controls,
		control,
		errors,
		handleSubmit,
		onCreateScoringConfig,
		loading,
	} = useCreateScoringConfig();

	return (
		<>
			<h3>Scoring Applicable On</h3>

			<form onSubmit={handleSubmit(onCreateScoringConfig)}>
				<div className={styles.form_container}>
					{controls.map((controlItem) => {
						const { type, label, name, style = {} } = controlItem || {};

						const Element = getFieldController(type);

						return (
							<div className={styles.control_item} key={name} style={style}>
								<p className={styles.label}>
									{label}
									<sup className={styles.sup}>*</sup>
								</p>

								<div>
									<Element
										control={control}
										{...controlItem}
									/>

									{errors[name] && <div className={styles.error_msg}>{errors[name]?.message}</div>}
								</div>
							</div>
						);
					})}
				</div>

				<div className={styles.btn_container}>
					<Button
						type="submit"
						size="lg"
						themeType="secondary"
						loading={loading}
					>
						Save
					</Button>
				</div>
			</form>
		</>

	);
}

export default ScoringApplicability;
