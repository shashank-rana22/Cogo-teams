import { Button } from '@cogoport/components';
import { forwardRef } from 'react';

import { getFieldController } from '../../../../../../../../../commons/getFieldController';

import controls from './controls';
import ExcelComponent from './ExcelComponent';
import styles from './styles.module.css';
import useHandleIntendedLearners from './useHandleIntendedLearners';

function IntendedLearners({ id, data = {}, activeTab, getCogoAcademyCourse, state }, ref) {
	const { cogo_academy_sheets = [], eligible_users = '' } = data || {};

	const {
		control,
		errors,
		mandatoryAudiencesUserWatch,
		mandatoryAudiencesOptions,
		audiences,
		onClickGenerate,
		loading,
	} = useHandleIntendedLearners({ activeTab, data, ref, id, getCogoAcademyCourse, state, eligible_users });

	const dataNotSaved = mandatoryAudiencesUserWatch === 'custom' && eligible_users !== 'custom';

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { type, label, name, rules } = controlItem || {};

				const Element = getFieldController(type);

				if (!Element) return null;

				if (
					name === 'upload_excel'
					&& mandatoryAudiencesUserWatch !== 'custom'
				) {
					return null;
				}

				if (name === 'upload_excel') {
					return (
						<ExcelComponent
							key={name}
							Element={Element}
							name={name}
							label={label}
							controlItem={controlItem}
							control={control}
							errors={errors}
							cogo_academy_sheets={cogo_academy_sheets}
							getCogoAcademyCourse={getCogoAcademyCourse}
							disableExcel={dataNotSaved}
						/>
					);
				}

				return (
					<>
						<div key={name} className={`${styles.form_group} ${styles[name]}`}>
							<div className={styles.label}>
								{label}
								{rules ? <sup className={styles.superscipt}>*</sup> : null}
							</div>

							<div className={`${styles.input_group} ${styles[name]}`}>
								<Element
									{...controlItem}
									key={name}
									control={control}
									id={`${name}_input`}
									{...(name === 'audiences' && { options: audiences })}
									{...(name === 'mandatory_audiences' && {
										options: mandatoryAudiencesOptions,
									})}
								/>
							</div>

							{errors?.[name]?.message ? (
								<div className={styles.error_message}>
									{errors?.[name]?.message}
								</div>
							) : null}
						</div>

						{name === 'mandatory_audiences_user' && dataNotSaved ? (
							<div className={styles.generate_button}>
								<Button
									type="button"
									onClick={onClickGenerate}
									loading={loading}
									className={styles.save_and_generate_button}
									size="sm"
								>
									Save and Generate
								</Button>
							</div>
						) : null}
					</>
				);
			})}
		</div>
	);
}

export default forwardRef(IntendedLearners);
