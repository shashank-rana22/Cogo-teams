import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import getElementController from '../../../../../../../../configs/getElementController';
import useGetUserGroups from '../../../../../../hooks/useGetUserGroups';

import getControls from './controls';
import styles from './styles.module.css';

function CreateNewTest({ control, errors, data, setValue, watch }) {
	const [uploadDocument, setUploadDocument] = useState();
	const router = useRouter();

	const onNavigate = () => {
		const href = '/learning?activeTab=test_module';
		router.push(href, href);
	};

	useEffect(() => {
		const { cogo_entity_object = {}, name = '' } = data;

		const { id } = cogo_entity_object || {};

		setValue('name', name);
		setValue('cogo_entity_id', id);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const select_user_group = watch('select_user_group') || [];

	const { audienceOptions = [] } = useGetUserGroups();


	console.log('uploadDocument', uploadDocument);

	console.log('audienceOptions', audienceOptions);

	const controls = getControls([...audienceOptions] || [], (select_user_group.length === 0));

	const radioGroupVal = watch('select_users') || '';

	// if (listAudienceLoading) {
	// 	return (
	// 		<div className={styles.spinner}>
	// 			<Spinner width="100px" height="100px" />
	// 		</div>
	// 	);
	// }

	return (
		<div>
			<div className={styles.header}>
				<IcMArrowBack className={styles.back_icon} width={20} height={20} onClick={() => onNavigate()} />
				<div role="presentation" className={styles.title}>New Test</div>
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

							<div className={styles.control_type}>
								<Element control={control} {...controlItem} className={styles[`element_${name}`]} />
								{errors[name] && <div className={styles.error_msg}>This is required</div>}
							</div>
						</div>
					);
				})}
			</div>

			{radioGroupVal === 'excel' && (
				<FileUploader
					className={styles.file_select}
					showProgress
					draggable
					value={uploadDocument}
					onChange={setUploadDocument}
					accept=".xlsx,.csv"
				/>
			)}
		</div>
	);
}

export default CreateNewTest;
