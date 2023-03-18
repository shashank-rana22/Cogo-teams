import React, { useState } from 'react';
import { IcMUsersManageAccounts } from '@cogoport/icons-react';
import AddUser from './AddUser';
import { StyledModal, Container, SubContainer } from './styles';

const CreateChannel = ({ refetch = () => {} }) => {
	const [open, setOpen] = useState(false);

	return (
		<Container>
			<SubContainer onClick={() => setOpen(true)}>
				<IcMUsersManageAccounts
					style={{ width: '200%', height: '200%', fill: '#ffffff' }}
				/>
			</SubContainer>

			{open ? (
				<StyledModal
					width={600}
					show={open}
					onClose={() => setOpen(false)}
					onOuterClick={() => setOpen(false)}
				>
					<AddUser setOpen={setOpen} refetch={refetch} />
				</StyledModal>
			) : null}
		</Container>
	);
};

export default CreateChannel;
