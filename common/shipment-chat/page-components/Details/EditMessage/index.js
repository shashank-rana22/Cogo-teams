import React, { useState } from 'react';
import { Input } from '@cogoport/components';
import { IcMTick, IcMCross } from '@cogoport/icons-react';
import useUpdateMessage from '../../../hooks/useUpdateMessage';
import { Container, ButtonWrap, IconWrap } from './styles';

const EditMessage = ({ oldmsg, editMsg, setShowEdit = () => { } }) => {
	const [newContent, setNewContent] = useState(oldmsg);

	const params = {
		id: editMsg,
		content: newContent,
	};

	const { onCreate } = useUpdateMessage({ params, setShowEdit });
	return (
		<Container>
			<Input
				width="100%"
				value={newContent}
				onChange={(e) => setNewContent(e.target.value)}
				placeholder="  "
			/>
			<ButtonWrap>
				<IconWrap>
					<IcMCross
						className="secondary md"
						style={{ marginRight: '12px' }}
						onClick={() => setShowEdit(false)}
					/>
				</IconWrap>
				<IconWrap>
					<IcMTick className="secondary md" onClick={() => onCreate()} />
				</IconWrap>
			</ButtonWrap>
		</Container>
	);
};

export default EditMessage;
