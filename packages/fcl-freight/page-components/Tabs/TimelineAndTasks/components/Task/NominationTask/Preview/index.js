import React from 'react';
import { Modal, Button } from '@cogoport/front/components/admin';
import { ButtonWrap } from './styles';
import { EmailPreview } from '../styles';

const PreviewAndSubmit = ({
	show = false,
	setShow = () => {},
	handleUpdate = () => {},
	data = {},
	loading,
}) => {
	const sendEmail = () => {
		handleUpdate({ preview: false });
	};

	return (
		<Modal show={show} onClose={() => setShow(!show)} interactive width={700}>
			<div>
				<EmailPreview
					dangerouslySetInnerHTML={{
						__html: data?.template,
					}}
				/>
				<ButtonWrap>
					<Button onClick={sendEmail} disabled={loading}>
						Send Email
					</Button>
				</ButtonWrap>
			</div>
		</Modal>
	);
};

export default PreviewAndSubmit;
