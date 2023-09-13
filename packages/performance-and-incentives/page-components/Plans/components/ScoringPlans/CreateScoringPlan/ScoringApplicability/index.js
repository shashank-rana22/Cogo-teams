import { Button } from '@cogoport/components';
import React from 'react';

import { getFieldController } from '../../../../../../common/Form/getFieldController';

import LoadingState from './LoadingState';
import styles from './styles.module.css';
import useCreateScoringConfig from './useCreateScoringConfig';

function ScoringApplicability(props) {
	const { data, editApplicability, setEditApplicability, getConfigLoading } = props;

	const {
		controls,
		control,
		errors,
		handleSubmit,
		onCreateScoringConfig,
		loading,
	} = useCreateScoringConfig({ data, editApplicability, setEditApplicability });

	if (getConfigLoading) return <LoadingState />;

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

					{editApplicability ? (
						<Button
							type="submit"
							size="lg"
							themeType="secondary"
							loading={loading}
						>
							Save
						</Button>
					) : (
						<Button
							type="button"
							size="lg"
							themeType="accent"
							loading={loading}
							onClick={(event) => {
								event.preventDefault();
								setEditApplicability(true);
							}}
						>
							Edit
						</Button>
					)}

				</div>
			</form>
		</>

	);
}

export default ScoringApplicability;
