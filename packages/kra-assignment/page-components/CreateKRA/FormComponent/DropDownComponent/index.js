import { isEmpty, startCase } from '@cogoport/utils';

import getElementController from '../../../../configs/getElementController';
import controls from '../controls';

import styles from './styles.module.css';

function RenderSelectedFields({ selectedValues }) {
	if (isEmpty(selectedValues)) {
		return (
			<div>
				No values selected
			</div>
		);
	}

	return (selectedValues || []).map((value) => (
		<div key={value} className={styles.value_container}>
			{startCase(value)}
		</div>
	));
}

function RenderFields({ control, errors, watch }) {
	const watchRole = watch('role_ids');
	const watchTribes = watch('tribe_ids');
	const watchSquad = watch('squad_ids');
	const watchChapter = watch('chapter_ids');
	const watchSubChapter = watch('sub_chapter_ids');

	const SELECTED_VALUES_MAPPING = {
		role_ids        : watchRole,
		tribe_ids       : watchTribes,
		squad_ids       : watchSquad,
		chapter_ids     : watchChapter,
		sub_chapter_ids : watchSubChapter,
	};

	return (
		<div className={styles.form}>

			{ (controls || []).map((formControl) => {
				const { group, subControls } = formControl || {};

				if (group !== 'mid_controls') return null;

				return (subControls || []).map((controlItem) => {
					const { name, type, label } = controlItem || {};
					const DynamicController = getElementController(type);

					return (
						<div key={name} className={styles.form_container}>

							<div key={name} className={styles.single_field}>
								<div className={styles.label}>
									{label}
								</div>

								<div className={styles.controller_wrapper}>
									<DynamicController
										{...controlItem}
										control={control}
										name={name}
									/>
								</div>
							</div>

							{errors[name] ? (
								<div className={styles.error_message}>
									{' '}
									{errors[name]?.message}
								</div>
							) : null}

							<div
								className={styles.show_selected_values}
								style={{ opacity: isEmpty(SELECTED_VALUES_MAPPING[name]) ? '0.5' : '1' }}
							>
								<RenderSelectedFields selectedValues={SELECTED_VALUES_MAPPING[name]} />
							</div>

						</div>

					);
				});
			})}
		</div>

	);
}

function DropDownComponent({ control, errors, watch }) {
	return (
		<div>
			<div style={{ paddingTop: 8, width: '85%' }}>
				Please select all the applicable roles, tribes,
				chapters and subchapters towhich this KRA may be assigned.
				You must select atleast one selection from all the drop-downs.
			</div>

			<div className={styles.render_form}>
				<RenderFields control={control} errors={errors} watch={watch} />
			</div>

		</div>
	);
}

export default DropDownComponent;
