import { Popover, cl, Button, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMHappy, IcMCross, IcMSend, IcMAttach } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef } from 'react';
import { MentionsInput, Mention } from 'react-mentions';

import CustomFileUploader from '../../../../../common/CustomFileUploader';
import useCreateCompanyFeed from '../../../../../hooks/useCreateCompanyFeed';
import useGetEmojiList from '../../../../../hooks/useGetEmojis';
import useGetEmployeeList from '../../../../../hooks/useGetEmployeeList';
import { formatFileAttributes } from '../../../../../utils/getFileAttributes';

import defaultStyles from './defaultStyles';
import EmojisBody from './EmojisBody';
import styles from './styles.module.css';
import UploadedFiles from './UploadedFiles';

function Post({ feedRefetch }) {
	const uploaderRef = useRef(null);
	const [uploading, setUploading] = useState(false);
	const [draftUploadedFiles, setDraftUploadedFiles] = useState('');
	const [draftMessages, setDraftMessages] = useState('');
	const [clapsActive, setClapsActive] = useState(false);
	const [postType, setPostType] = useState('public');
	const [taggedPeople, setTaggedPeople] = useState([]);

	const { getEmployeeList } = useGetEmployeeList();
	const { createCompanyFeed } = useCreateCompanyFeed(feedRefetch);

	const fileMetaData = formatFileAttributes({ uploadedFiles: draftUploadedFiles })?.[GLOBAL_CONSTANTS.zeroth_index];

	const handleProgress = (val) => {
		setUploading(val);
	};

	const handleCreatePost = async () => {
		const {
			fileUrl = '',
			fileType,
		} = fileMetaData || {};

		const PAYLOAD = {
			feed_type         : clapsActive ? 'appreciation' : 'normal',
			feed_content      : draftMessages,
			visibility_status : postType,
			attachment_urls   : !isEmpty(fileUrl) ? [{
				attachment_type : fileType,
				attachment_url  : fileUrl || '  ',
			}] : [],
			action_name: 'create',
		};

		await createCompanyFeed({ PAYLOAD });
		setDraftMessages('');
		setDraftUploadedFiles('');
		setTaggedPeople([]);
	};
	const {
		emojisList = {},
		setOnClicked = () => {},
		onClicked = false,
	} = useGetEmojiList();

	const handleChangeMessage = (val) => {
		const REGEX = /@\[([A-Za-z]+ [A-Za-z]+)\]/g;
		const matches = val.match(REGEX);

		if (matches) {
			const initialsArray = matches.map((match) => {
				const [firstName, lastName] = match
					.substring(2, match.length - 2)
					.split(' ');

				const initials = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
				return initials;
			});

			setTaggedPeople(initialsArray);
		} else {
			setTaggedPeople([]);
		}

		setDraftMessages(val);
	};
	const handleUpdateMessage = (val) => {
		setDraftMessages(
			(prev) => prev.concat(val),
		);
	};

	const hasUploadedFiles = !isEmpty(draftUploadedFiles);

	const handleClaps = () => {
		setClapsActive(!clapsActive);
		setDraftMessages('');
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.feed_type}>
					{clapsActive ? (
						<div className={cl`${styles.circle} ${styles.circle1_bg}`}>
							👏
						</div>
					) : null}

					{!isEmpty(taggedPeople) ? taggedPeople?.map((item) => (
						<div className={cl`${styles.circle} ${styles.circle2_bg}`} key={item}>
							{item}
						</div>
					)) : null}

				</div>
				<MentionsInput
					value={draftMessages}
					onChange={(e) => handleChangeMessage(e.target.value)}
					style={defaultStyles}
					placeholder={clapsActive ? 'Mention Employee by typing `@` followed by at least one char'
						: 'Write post...'}
					a11ySuggestionsListLabel="Suggested Employee for mention"
				>
					<Mention
						displayTransform={(id, display) => `@${display} `}
						trigger={clapsActive ? '@' : '#####'}
						data={clapsActive ? getEmployeeList : null}
						style={defaultStyles}
					/>
				</MentionsInput>
				<div className={styles.public_tag}>
					<Select
						value={postType}
						onChange={setPostType}
						placeholder="Select Books"
						size="sm"
						disabled
						options={[
							{ label: 'Public', value: 'public' },
							{ label: 'Team', value: 'team' },
						]}
						style={{ width: '110px' }}
					/>
				</div>
				<div className={styles.footer_flex}>
					<div className={styles.left_flex}>
						<CustomFileUploader
							handleProgress={handleProgress}
							showProgress={false}
							draggable
							accept=".png, .jpg, .jpeg, .svg, .gif, .mp4"
							className="file_uploader"
							uploadIcon={(
								<IcMAttach
									fill="#000"
									width={24}
									height={24}
									className={styles.upload_icon}
									style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}
								/>
							)}
							onChange={(val) => {
								setDraftUploadedFiles(val);
							}}
							ref={uploaderRef}
						/>

						<Popover
							placement="top"
							render={(
								<EmojisBody
									emojisList={emojisList}
									setOnClicked={setOnClicked}
									updateMessage={handleUpdateMessage}
								/>
							)}
							visible={onClicked}
							maxWidth={355}
							onClickOutside={() => {
								setOnClicked(false);
							}}
						>
							<IcMHappy
								width={24}
								height={24}
								fill="#828282"
								style={{ cursor: 'pointer' }}
								onClick={() => setOnClicked((prev) => !prev)}
							/>
						</Popover>
					</div>
					<div className={styles.right_section}>
						<div
							onClick={handleClaps}
							className={cl`${styles.claps} ${clapsActive ? styles.claps_active : null}`}
							aria-hidden
						>
							Claps 👏
							{' '}
							{clapsActive && <IcMCross style={{ marginLeft: 8 }} />}
						</div>
						<Button
							themeType="accent"
							size="lg"
							onClick={handleCreatePost}
							disabled={isEmpty(draftMessages)}
						>
							Post
							{' '}
							<IcMSend width={16} height={16} style={{ marginLeft: 4 }} />
							{' '}
						</Button>
					</div>
				</div>
			</div>
			{!isEmpty(fileMetaData) && (
				<div className={styles.img_container}>
					{(hasUploadedFiles) && !uploading ? (
						<UploadedFiles
							setDraftUploadedFiles={setDraftUploadedFiles}
							uploaderRef={uploaderRef}
							eachFileData={fileMetaData}
						/>
					) : null}
					{uploading ? (
						<div className={styles.uploading}>
							uploading.....
						</div>
					) : null}
				</div>
			)}
		</>
	);
}

export default Post;
