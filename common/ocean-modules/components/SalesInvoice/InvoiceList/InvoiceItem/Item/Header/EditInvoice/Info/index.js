import React from 'react';
import { ToolTip } from '@cogoport/front/components/admin';
import { IcMInfo } from '@cogoport/icons-react';
import { Container, InfoDiv, ContentDiv } from './styles';

const Info = () => {
	return (
		<Container>
			<ToolTip
				theme="light"
				content={
					<ContentDiv>
						You can enter customized line item name/code according to
						customer&apos;s need.{' '}
					</ContentDiv>
				}
				animation="scale"
				interactive
			>
				<InfoDiv>
					<IcMInfo fill="rgb(89, 54, 240)" />
				</InfoDiv>
			</ToolTip>
		</Container>
	);
};

export default Info;
