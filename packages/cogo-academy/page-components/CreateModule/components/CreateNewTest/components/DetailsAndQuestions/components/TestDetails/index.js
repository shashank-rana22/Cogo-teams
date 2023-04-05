import { Button, Tooltip } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMArrowBack, IcMDownload, IcMRefresh } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useMemo } from 'react';

import getElementController from '../../../../../../../../configs/getElementController';
import useCreateNewTest from '../../../../../../hooks/useCreateNewTest';
import useGetTestSheet from '../../../../../../hooks/useGetTestSheet';
import useGetUserGroups from '../../../../../../hooks/useGetUserGroups';

import getControls from './controls';
import styles from './styles.module.css';

function CreateNewTest({
	control, errors, data,
	getTestLoading, setValue, watch, handleSubmit, uploadDocument, setUploadDocument,
}) {
	const router = useRouter();

	const test_sheet_id = router.query?.test_sheet_id;

	const { loading, createNewTest } = useCreateNewTest();

	const { data: test_sheet_data, getTestSheet } = useGetTestSheet();

	const select_user_group = watch('select_user_group') || [];

	const radioGroupVal = watch('select_users') || '';

	const cogoEntityWatch = watch('cogo_entity_id') || '';

	const { audienceOptions = [] } = useGetUserGroups();

	const onNavigate = () => {
		const href = '/learning?activeTab=test_module';
		router.push(href, href);
	};

	useEffect(() => {
		if (!isEmpty(data)) {
			const { cogo_entity_object = {}, name = '', audience_ids = [], eligible_users = '' } = data;

			const { id } = cogo_entity_object || {};

			setValue('name', name);

			if (isEmpty(cogoEntityWatch)) {
				setValue('cogo_entity_id', id);
			}
			setValue('select_user_group', audience_ids);
			setValue('select_users', eligible_users);
		}
	}, [cogoEntityWatch, data, setValue]);

	const controls = useMemo(
		() => getControls([...audienceOptions] || [], (select_user_group.length === 0), !isEmpty(data)),
		[select_user_group.length, audienceOptions, data],
	);

	const downloadFileAtUrl = (url) => {
		fetch(url).then((response) => response.blob()).then((blob) => {
			const blobURL = URL.createObjectURL(new Blob([blob]));
			const fileName = url.split('/').pop();
			const aTag = document.createElement('a');
			aTag.href = blobURL;
			aTag.setAttribute('download', fileName);
			document.body.appendChild(aTag);
			aTag.click();
			aTag.remove();
		});
	};

	const BUTTON_TEXT_MAPPING = {
		excel : 'Save and Generate',
		all   : 'Save',
	};

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
													style={{ width: '180px', height: '22px' }}
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
							<div className={styles.row}>
								<div className={styles.label}>
									{label}
									<sup className={styles.sup}>*</sup>
								</div>

								<div className={styles.control_type}>
									<Element
										control={control}
										{...controlItem}
										className={styles[`element_${name}`]}
									/>
									{errors[name] && <div className={styles.error_msg}>This is required</div>}
								</div>
							</div>
							{
								name === 'select_users' && 	(
									<div className={styles.save_btn}>
										{isEmpty(data) && radioGroupVal && (
											<Button
												size="sm"
												themeType="primary"
												className={styles.btn}
												loading={loading || getTestLoading}
												onClick={
										handleSubmit((values) => {
											createNewTest({ data: values });
										})
									}
											>
												{BUTTON_TEXT_MAPPING[radioGroupVal]}
											</Button>
										)}
									</div>
								)
							}
						</div>
					);
				})}

			</div>

			{radioGroupVal === 'excel' && (
				<>

					{!isEmpty(data) ? (
						<p className={styles.content}>
							You may Upload your own Excel in required
							format
							{' '}
							<b>OR</b>
							{' '}
							Download the list of Users, Edit and Upload that excel
							{' '}
							<sup className={styles.sup}>*</sup>
						</p>
					) : null}

					<div className={styles.btn_container}>

						{!(test_sheet_data.test_sheet_data?.status === 'generated') && !isEmpty(data) && (

							<div className={styles.tooltip_container} style={{ width: 'fit-content' }}>

								<Tooltip
									maxWidth={400}
									className={styles.refresh_tooltip}
									content="Refresh to see if list has been Generated"
									placement="top"
								>
									<div
										className={styles.sample_div}
										role="presentation"
										onClick={() => {
											getTestSheet(test_sheet_id);
										}}
									>
										<IcMRefresh />
										<div className={styles.sample_text}>Refresh</div>
									</div>
								</Tooltip>
							</div>
						)}

						{test_sheet_data.test_sheet_data?.status === 'generated' && (
							<div
								className={styles.sample_div}
								role="presentation"
								onClick={() => downloadFileAtUrl(test_sheet_data.test_sheet_data?.file_url)}
							>
								<IcMDownload />
								<div className={styles.sample_text}>Download User List</div>
							</div>
						)}

					</div>

					{!isEmpty(data) && (
						<FileUploader
							className={styles.file_select}
							showProgress
							draggable
							value={uploadDocument}
							onChange={setUploadDocument}
							accept=".xlsx,.csv"
							disabled={!(test_sheet_data.test_sheet_data?.status === 'generated')}
						/>
					)}

				</>
			)}

		</div>
	);
}

export default CreateNewTest;
