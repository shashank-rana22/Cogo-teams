import { Button } from '@cogoport/components';
import React from 'react';

import { getElementController } from '../../../../../utils/get-element-controller';
import useGetModifiedControls from '../../hooks/useGetModifiedControls';
// import subCategoryOptions from '../../utils/sub-category-options';

import styles from './styles.module.css';

function Child({
	controls,
	control,
	index,
	name,
	error,
	remove,
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	disabled = false,
	services = [],
	// watch,
	// setValue,
}) {
	const { newControls } = useGetModifiedControls({ services, index, controls });

	// const setSubCategoryValue = () => {
	// 	const selectedCategory = watch('services')?.[index]?.category;
	// 	setValue(`services[${index}].sub_category`, subCategoryOptions[selectedCategory]?.[0]?.value || '');
	// };

	// const selectedCategory = watch('services')?.[index]?.category;
	// useEffect(() => {
	// 	setValue(`services[${index}].sub_category`, subCategoryOptions[selectedCategory]?.[0]?.value || '');
	// }, [selectedCategory]);

	return (
		<div className={styles.content}>

			<div className={styles.element_container}>

				{(newControls || []).map((controlItem) => {
					const Element = getElementController(controlItem.type);

					if (!Element) return null;

					return (
						<div className={styles.list}>

							<div className={styles.form_label}>
								<h4>{controlItem.label}</h4>
							</div>

							<div className={styles.form_element}>
								<Element
									{...controlItem}
									width="100%"
									control={control}
									name={`${name}[${index}].${controlItem.name}`}
									id={`create_form_${controlItem.name}_field`}
								/>
							</div>

							<div className={styles.form_error_message}>
								{error?.[controlItem.name]?.message}
							</div>

						</div>
					);
				})}

			</div>
			{/* {setSubCategoryValue()} */}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<div className={styles.button}>
					<Button
						size="lg"
						themeType="accent"
						className={`form-fieldArray-${name}-remove`}
						onClick={() => remove(index, 1)}
					>
						Remove
					</Button>
				</div>
			) : null}
		</div>
	);
}
export default Child;
