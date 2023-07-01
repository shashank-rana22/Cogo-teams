import { Input, Button, Placeholder } from '@cogoport/components';
import { useForm, TextAreaController, InputController } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import controls from '../../../../../../../configurations/create-instant-reply';
import useCreateSuggestions from '../../../../../../../hooks/useCreateSuggestions';
import useListSuggestions from '../../../../../../../hooks/useListSuggestions';

import styles from './styles.module.css';

function InstantReplies({
	data = {},
	activeTab,
	openCreateReply,
	setOpenCreateReply = () => {},
}) {
	const { updateMessage = () => {} } = data || {};
	const { title, content } = controls;
	const { control, handleSubmit, formState:{ errors }, reset } = useForm();
	const {
		setQfilter,
		handleScroll,
		qfilter,
		infiniteList:{ list = [] },
		loading, refetch,
	} = useListSuggestions({ activeTab });

	const { createSuggestion, loading:CreateLoading } = useCreateSuggestions({
		reset: () => {
			reset({ title: '', content: '' });
		},
		refetch,
	});

	const loader = () => (
		[...Array(6)].map(() => (
			<div className={styles.loader_div}>
				<Placeholder height="10px" width="100px" margin="0 0 10px 0" />
				<Placeholder height="30px" width="200px" margin="0 0 10px 0" />
			</div>
		))
	);
	return (
		<div className={styles.main_container}>
			<div className={styles.messages_container}>
				<div className={styles.container}>
					<Input
						value={qfilter}
						onChange={(e) => setQfilter(e)}
						placeholder="Search saved replies here..."
						prefix={<IcMSearchlight />}
					/>
					<div
						className={styles.message_container}
						onScroll={(e) => handleScroll(e.target.clientHeight, e.target.scrollTop, e.target.scrollHeight)}
					>
						{(list || []).map(({ title:messageTitle = '', content:messageContent = '' }) => (
							<div
								role="presentation"
								className={styles.each_message}
								onClick={() => updateMessage(messageContent)}
							>
								<div className={styles.title}>
									{messageTitle}
								</div>
								<div className={styles.message}>
									{messageContent}
								</div>
							</div>
						))}
						{loading && loader()}
						{isEmpty(list) && !loading && <div className={styles.empty_div}>No Quick Messages</div>}
					</div>
				</div>
				<div className={styles.footer}>
					<Button
						themeType="accent"
						size="md"
						disabled={openCreateReply}
						onClick={() => setOpenCreateReply(true)}
					>
						+ Create Reply

					</Button>
				</div>
			</div>
			{openCreateReply && (
				<div className={styles.create_container}>
					<div>
						<div className={styles.label}>
							Name
						</div>
						<InputController control={control} {...title} id="title" />
						{errors?.title && <div className={styles.error_text}>This is Required</div>}
						<div className={styles.text_area_container}>
							<div className={styles.label}>
								Content
							</div>
							<TextAreaController
								control={control}
								{...content}
								id="content"
								rows={10}
							/>
							{errors?.content && <div className={styles.error_text}>This is Required</div>}
						</div>

					</div>
					<div className={styles.create_footer}>
						<Button
							themeType="tertiary"
							size="md"
							className={styles.button_styles}
							onClick={() => setOpenCreateReply(false)}
						>
							cancel

						</Button>
						<Button
							themeType="accent"
							size="md"
							onClick={handleSubmit(createSuggestion)}
							loading={CreateLoading}
						>
							Create

						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
export default InstantReplies;
