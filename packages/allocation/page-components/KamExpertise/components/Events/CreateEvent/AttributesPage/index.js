import { Placeholder } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';
import { getFieldController } from '../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

const CONTROL_TYPE_MAPPING = {
	string  : 'text',
	integer : 'number',
	select  : 'select',
};
function AttributePage(props) {
	const { loading, attributeList = [], formProps = {} } = props;

	const {
		control,
		formState: { errors },
	} = formProps;

	if (loading) {
		return (
			<div className={styles.account_attributes}>
				<div className={styles.account_attribute_text}>
					Attributes
				</div>

				<section className={styles.row_container}>

					{[1, 2, 3, 4, 5, 6].map(() => (
						<div className={styles.attribute_form_group}>
							<div
								className={`${styles.input_group}
													${styles.margin_bottom}`}
							>
								<Placeholder height="40px" margin="8px 0 16px 0" />
							</div>

						</div>
					))}

				</section>
			</div>
		);
	}

	if (isEmpty(attributeList)) {
		return (
			<div
				className={styles.account_attributes}
				style={{
					background : '#fff',
					padding    : '80px 16px 0 16px',
				}}
			>
				<EmptyState
					height="320px"
					width="500px"
					flexDirection="column"
				/>
			</div>
		);
	}

	return (
		<div className={styles.account_attributes}>
			<div className={styles.account_attribute_text}>
				Attributes
			</div>

			<section className={styles.row_container}>

				{ attributeList.map((controlItem, index) => {
					const { name = '', parameters, options = [] } = controlItem;
					const { params_type } = parameters || {};

					const type = CONTROL_TYPE_MAPPING[params_type || ''];

					const el = {
						name,
						label: startCase(name),
						type,
						...(params_type === 'select' && { options, isClearable: true }),
					};

					const Element = getFieldController(el?.type);

					if (!Element) return null;

					return (

						<div className={styles.attribute_form_group}>
							<span className={styles.label}>{el.label}</span>

							<div
								className={`${styles.input_group}
                            ${index < attributeList.length ? styles.margin_bottom : ''}`}
							>
								<Element
									{...el}
									key={el.name}
									control={control}
									id={`${el.name}_input`}
								/>
							</div>

							<div className={styles.error_message}>
								{errors?.[el.name]?.message}
							</div>
						</div>
					);
				})}

			</section>
		</div>

	);
}

export default AttributePage;
