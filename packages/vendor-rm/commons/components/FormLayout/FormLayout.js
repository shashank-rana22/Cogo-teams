import subCategoryOptions from '../../../page-components/OnBoardVendor/VendorServices/utils/sub-category-options';
import { getElementController } from '../../../utils/get-element-controller';

import styles from './styles.module.css';

function FormLayout({
	fields = [],
	control = {},
	errors = {},
	watch,
	setValue,
	source,
}) {
	const setSubCategoryValue = () => {
		if (!source) {
			return null;
		}

		const selectedCategory = watch('category');
		return setValue('sub_category', subCategoryOptions[selectedCategory]?.[0]?.value || '');
	};

	return (
		<div className={styles.form_container}>
			{fields.map((controlItem) => {
				const element = { ...controlItem };

				const Element = getElementController(element.type);

				if (!Element) return null;

				return (
					<div className={styles.form_group} style={element?.style}>
						<div className={styles.form_label}>{element.label}</div>
						<div>
							<Element
								{...element}
								key={element.name}
								control={control}
								id={`onboard_vendor_form_${element.name}_input`}
							/>
							<div className={styles.error_message}>
								{errors?.[element.name]?.message}
							</div>
						</div>
					</div>
				);
			})}

			{setSubCategoryValue()}
		</div>
	);
}

export default FormLayout;
