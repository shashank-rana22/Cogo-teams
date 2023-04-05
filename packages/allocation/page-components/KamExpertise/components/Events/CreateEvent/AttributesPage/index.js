import { Placeholder, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';
import { getFieldController } from '../../../../../../common/Form/getFieldController';
import getEventControlType from '../../../../utils/get-event-control-type';

import styles from './styles.module.css';

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
					{[1, 2, 3, 4, 5, 6].map((item) => (
						<div key={item} className={styles.attribute_form_group}>
							<Placeholder height="40px" width="250px" margin="8px 16px 32px 0" />
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
				{attributeList.map((controlItem) => {
					const { name = '', description, parameters, options = [] } = controlItem;
					const { params_type } = parameters || {};

					const controlsObject = getEventControlType({ name, options });

					const el = {
						name,
						label: startCase(name),
						...controlsObject[params_type || ''],
					};

					const Element = getFieldController(el.type);

					if (!Element) return null;

					return (

						<div key={controlItem.id} className={styles.attribute_form_group}>
							<span className={styles.label}>
								{el.label}
								{' '}
								<Tooltip
									content={(
										<div className={styles.tooltip_text}>
											{description}
										</div>
									)}
									placement="top"
								>
									<IcMInfo
										width={14}
										height={14}
										style={{ margin: '4px 0px 0px 4px' }}
									/>
								</Tooltip>

							</span>

							<div
								className={styles.input_group}
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
