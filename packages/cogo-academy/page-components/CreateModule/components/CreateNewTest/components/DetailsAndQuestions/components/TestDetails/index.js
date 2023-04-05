import { Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMArrowBack, IcMDownload } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useEffect, useMemo } from 'react';

import getElementController from '../../../../../../../../configs/getElementController';
import useCreateNewTest from '../../../../../../hooks/useCreateNewTest';
import useGetTestSheet from '../../../../../../hooks/useGetTestSheet';
import useGetUserGroups from '../../../../../../hooks/useGetUserGroups';

import getControls from './controls';
import styles from './styles.module.css';

function CreateNewTest({
	control, errors, data, setValue, watch, handleSubmit, uploadDocument, setUploadDocument,
}) {
	const router = useRouter();

	const test_sheet_id = router.query?.test_sheet_id;

	const { loading, createNewTest } = useCreateNewTest();

	const { loading:test_sheet_loading, data: test_sheet_data, getTestSheet } = useGetTestSheet();

	const select_user_group = watch('select_user_group') || [];

	const radioGroupVal = watch('select_users') || '';

	const { audienceOptions = [] } = useGetUserGroups();

	const controls = useMemo(
		() => getControls([...audienceOptions] || [], (select_user_group.length === 0)),
		[select_user_group.length, audienceOptions],
	);

	const onNavigate = () => {
		const href = '/learning?activeTab=test_module';
		router.push(href, href);
	};

	useEffect(() => {
		const { cogo_entity_object = {}, name = '', audience_ids = [], eligible_users = '' } = data;

		const { id } = cogo_entity_object || {};

		setValue('name', name);
		setValue('cogo_entity_id', id);
		setValue('select_user_group', audience_ids);
		setValue('select_users', eligible_users);
	}, [data, setValue]);

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
							<div className={styles.control_container} key={name}>

								<div className={`${styles.label}`}>
									{label}
									<sup className={styles.sup}>*</sup>
								</div>

								<div className={styles.control_type}>

									{subControls.map((item) => {
										const ElementToUse = getElementController(item.type);

										return (
											<div className={styles.input_wrapper} key={item.name}>
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
						<div className={styles.control_container_two} key={name}>
							<div className={styles.label}>
								{label}
								<sup className={styles.sup}>*</sup>
							</div>

							<div className={styles.control_type}>
								<Element control={control} {...controlItem} className={styles[`element_${name}`]} />
								{errors[name] && <div className={styles.error_msg}>This is required</div>}
							</div>
						</div>
					);
				})}
				{radioGroupVal === 'all' && (

					<Button
						size="sm"
						themeType="primary"
						className={styles.btn}
						loading={loading}
						onClick={
							handleSubmit((values) => {
								createNewTest({ data: values });
							})
						}
					>
						save
					</Button>
				)}
			</div>

			{radioGroupVal === 'excel' && (
				<>
					<div className={styles.btn_container}>

						<Button
							size="sm"
							themeType="primary"
							onClick={
							handleSubmit((values) => {
								createNewTest({ data: values });
							})
						}
						>
							Save and Generate
						</Button>

						<Button
							size="sm"
							themeType="secondary"
							loading={test_sheet_loading}
							onClick={() => {
								getTestSheet(test_sheet_id);
							}}
						>
							Refresh
						</Button>

						{test_sheet_data.test_sheet_data?.status === 'generated' && (
							<div
								className={styles.sample_div}
								role="presentation"
								onClick={() => window.open(
									test_sheet_data.test_sheet_data?.file_url,
									'_blank',
								)}
							>
								<IcMDownload />
								<div className={styles.sample_text}>Download Excel Format</div>
							</div>
						)}

					</div>

					<FileUploader
						className={styles.file_select}
						showProgress
						draggable
						value={uploadDocument}
						onChange={setUploadDocument}
						accept=".xlsx,.csv"
						disabled={test_sheet_data.test_sheet_data?.status !== 'generated'}
					/>
				</>
			)}

		</div>
	);
}

export default CreateNewTest;
