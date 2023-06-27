import { Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Layout } from '@cogoport/ocean-modules';
import { saveAs } from 'file-saver';
import React, {
	useImperativeHandle,
	forwardRef,
	useState,
	useEffect,
} from 'react';

import styles from './styles.module.css';

const FILE_NAME_LAST_INEDX_OFFSET = 1;

function ChildBlocks(
	{ id, mainData, blocks, setBlocks, updatePermission },
	ref,
) {
	const [showActions, setShowActions] = useState(false);

	const handleView = (e, image_url) => {
		e.stopPropagation();
		window.open(image_url, '_blank');
	};

	const handleSave = (e, image_url) => {
		e.stopPropagation();
		if (image_url) {
			saveAs(image_url);
		}
	};

	const removeBlock = () => {
		const objectIs = blocks.find((obj) => obj.id === id);
		const isOld = objectIs?.mainData?.id !== undefined;
		const newBlocks = blocks;
		if (isOld) {
			const data = newBlocks.find((obj) => obj.id === id);
			if (data.mainData.status === 'active') {
				data.mainData.status = 'inactive';
			} else {
				data.mainData.status = 'active';
			}

			setBlocks([...newBlocks]);
		} else {
			const exceptBlock = blocks.filter((obj) => obj.id !== id);
			setBlocks(exceptBlock);
		}
	};

	useEffect(() => {
		const textarea = document.getElementById(`textarea${id}`);
		const scHeight = textarea.scrollHeight;
		textarea.style.height = `${scHeight}px`;
	}, [id]);

	const handleTextArea = (e) => {
		const scHeight = e.target.scrollHeight;
		if (e) {
			e.target.style.height = `${scHeight}px`;
		}
	};

	const handleChange = (e) => {
		const newBlocks = blocks;
		const row = newBlocks.find((obj) => obj.id === id);
		row.mainData.instruction = e.target.value;
		setBlocks([...newBlocks]);
	};

	const getFileName = (url) => {
		let filename = '';
		if (typeof url === 'string') {
			const values = (url || '').split('/');
			if (values?.length) {
				const lastVal = values[values.length - FILE_NAME_LAST_INEDX_OFFSET];
				const words = lastVal.split('%');
				words.forEach((word) => {
					filename += word;
				});
			}
		}

		return filename;
	};

	const fileControl = [
		{
			name        : 'file',
			type        : 'file',
			placeholder : '  ',
			uploadText  : 'Attach',
			uploadIcon  : 'upload-attach',
			uploadType  : 'aws',
			multiple    : true,
		},
	];
	const { handleSubmit, control, errors } = useForm(fileControl);

	const getFileValue = async () => {
		const FILE_VALUE = {};

		FILE_VALUE.id = id;

		await handleSubmit(
			(val) => {
				FILE_VALUE.file = val;
			},
			(err) => {
				Toast.error(err);
			},
		)();

		return { fileValue: FILE_VALUE };
	};

	useImperativeHandle(ref, () => ({ getFileValue }));

	return (
		<li style={{ fontSize: '10px' }}>
			<div>
				<div className={styles.sop_line_item}>
					<div
						role="button"
						tabIndex={0}
						className={styles.input_containter}
						onMouseDown={() => setShowActions(true && updatePermission)}
						pointerEvents="none"
					>
						<textarea
							onKeyUp={(e) => handleTextArea(e)}
							onChange={(e) => handleChange(e)}
							id={`textarea${id}`}
							placeholder="Start typing to add SOP"
							name="instruction"
							className={styles.text_area}
							style={{
								textDecoration: mainData.status === 'inactive' && mainData.id
									? 'line-through'
									: null,
								width: showActions ? '100%' : '90%',
							}}
							value={mainData?.instruction}
						/>

						{mainData?.id ? (
							<div className={styles.heading_edit_details_child}>
								{' '}
								{mainData?.status === 'inactive'
									? `Deleted at ${formatDate({
										date: mainData?.updated_at,
										dateFormat:
													GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
										formatType : 'dateTime',
										separator  : '/',
									})} by ${mainData?.last_updated_by?.name}`
									: `Last Edited by ${
										mainData?.last_updated_by?.name
									} at ${formatDate({
										date: mainData?.updated_at,
										dateFormat:
													GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
										formatType : 'dateTime',
										separator  : '/',
									})}`}
								{'  '}
							</div>
						) : null}
					</div>

					{showActions ? (
						<div
							role="button"
							tabIndex={0}
							className={styles.remove_icon_container}
							onClick={() => removeBlock()}
						>
							x
						</div>
					) : null}
				</div>

				{showActions ? (
					<div className={styles.attach}>
						<Layout
							fields={fileControl}
							control={control}
							errors={errors}
						/>
					</div>
				) : null}
			</div>

			<div className={styles.links_container}>
				{(mainData?.url_links || []).map((url) => (
					<div
						className={styles.links}
						key={url}
					>
						<div className={styles.file_name}>{getFileName(url)}</div>

						{url ? (
							<>
								<Button
									style={{ color: '#F68B21' }}
									themeType="link"
									onClick={(e) => handleView(e, url)}
								>
									View
								</Button>
								<Button
									style={{ color: '#F68B21' }}
									themeType="link"
									onClick={(e) => handleSave(e, url)}
								>
									Download
								</Button>

							</>
						) : null}
					</div>
				))}
			</div>
		</li>
	);
}

export default forwardRef(ChildBlocks);
