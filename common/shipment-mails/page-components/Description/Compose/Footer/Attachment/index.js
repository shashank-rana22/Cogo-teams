import React from 'react';
import { IcMAttach } from '@cogoport/icons-react';
import AwsUplaoder from '@cogo/smart-components/components/AwsUploader';
import { Container, AttachButton, Text } from './styles';

const Attachement = ({ onChange }) => {
	return (
		<Container>
			<AwsUplaoder
				showProgress={false}
				onChange={onChange}
				multiple={false}
				uploadType="aws"
				drag
				value={null}
				height={40}
				showUploadIcon={false}
				dragNDropText={
					<AttachButton>
						<IcMAttach style={{ height: '24px', width: '24px' }} />
						<Text>Attach A File</Text>
					</AttachButton>
				}
			/>
		</Container>
	);
};

export default Attachement;
