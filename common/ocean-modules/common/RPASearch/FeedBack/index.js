import { TextArea } from '@cogoport/front/components/admin';
import Button from '@cogoport/front/components/admin/Button';
import Checkbox from '@cogoport/front/components/admin/CheckBox';
import { useState } from 'react';

import useSubmitRPAFeedback from '../../hooks/useRPASubmitFeedback';

import {
	Container,
	Header,
	StyledBackButton,
	Heading,
	StyledCheckBox,
	TextFeedBack,
	StyledTextArea,
	RemarksTextArea,
	StyledButton,
	CancelButton,
} from './styles';
import styles from './styles.module.css';

function FeedBack({ setTask }) {
	const [feedback, setFeedback] = useState('');
	const [isChecked, setIsChecked] = useState(true);
	const { submitRPAFeeback, feedBackApi } = useSubmitRPAFeedback({
		onSubmit: () => setTask('search_box'),
	});
	return (
		<Container>
			<Header>
				<StyledBackButton
					onClick={() => {
						setTask('search_box');
					}}
				/>
				<Heading>GIVE FEEDBACK</Heading>
			</Header>
			<StyledCheckBox>
				<Checkbox
					checked={isChecked}
					onChange={() => {
						setIsChecked(!isChecked);
					}}
				/>
				<TextFeedBack>
					Do you want all your Cogoport Emails to be integrated ?
				</TextFeedBack>
			</StyledCheckBox>
			<StyledTextArea>
				<RemarksTextArea>Remarks</RemarksTextArea>
				<TextArea
					value={feedback}
					onChange={(e) => setFeedback(e?.target?.value)}
					rows={6}
					placeholder="Please input your feedback and we will try working to make this feature better for you."
				/>
			</StyledTextArea>
			<StyledButton>
				<CancelButton>
					<Button
						className="secondary md"
						onClick={() => {
							setTask('search_box');
						}}
					>
						Cancel
					</Button>
				</CancelButton>
				<Button
					onClick={() => submitRPAFeeback(feedback, isChecked)}
					disabled={feedBackApi.loading}
				>
					{feedBackApi.loading ? 'Recording...' : 'Submit'}
				</Button>
			</StyledButton>
		</Container>
	);
}

export default FeedBack;
