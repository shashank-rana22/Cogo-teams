import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useEffect } from 'react';

import getElementController from '../../../../../../../../configs/getElementController';

import getControls from './controls';
import styles from './styles.module.css';

function CreateNewTest({ control, errors, data, setValue }) {
	const controls = getControls();

	const router = useRouter();

	const onClickBack = () => {
		const href = '/learning/test-module';
		router.push(href, href);
	};

	useEffect(() => {
		const { cogo_entity_object = {}, name = '' } = data;

		const { id } = cogo_entity_object || {};

		setValue('name', name);
		setValue('cogo_entity_id', id);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<div>
			<div className={styles.header}>
				<IcMArrowBack className={styles.back_icon} onClick={() => onClickBack()} width={20} height={20} />
				<div role="presentation" className={styles.title} onClick={() => onClickBack()}>New Test</div>
			</div>

			<div className={styles.container}>
				{controls.map((controlItem) => {
					const { type, label, name, subControls = [] } = controlItem || {};

					const Element = getElementController(type);

					if (name === 'select_entity_usergroups') {
						return (
							<div className={styles.control_container}>
								<div className={`${styles.label}`}>
									{label}
									<sup style={{ color: 'red' }}>*</sup>
								</div>
								<div className={styles.control_type}>

									{subControls.map((item) => {
										const ElementToUse = getElementController(item.type);

										return (
											<div className={styles.input_wrapper}>
												<ElementToUse
													key={item.name}
													control={control}
													{...item}
													className={styles[`element_${item.name}}`]}
												/>

												{errors[item?.name]
													? <div className={styles.error_msg}>This is required</div> : null}
											</div>
										);
									})}
								</div>

							</div>
						);
					}

					return (
						<div className={styles.control_container_two}>
							<div className={styles.label}>
								{label}
								<sup style={{ color: 'red' }}>*</sup>
							</div>

							<div className={styles.control}>
								<Element control={control} {...controlItem} className={styles[`element_${name}`]} />
								{errors[name] && <div className={styles.error_msg}>This is required</div>}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default CreateNewTest;
