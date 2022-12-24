import { Skeleton } from '@cogoport/front/components/admin';
import React from 'react';
import {
	IcCFtick,
	IcMDocument,
	IcMCreditCard,
	IcCFcrossInCircle,
} from '@cogoport/icons-react';
import {
	Container,
	DocumentContainer,
	Wrapper,
	NameContainer,
	DataWrapper,
} from './styles';

const goTo = (href) => {
	if (typeof window !== 'undefined') {
		window.open(href);
	}
};

const POCInformation = ({ data, loading }) => {
	const { name, serialId, kycStatus, businessAddressProofUrl, panUrl } =
		data || {};

	return (
		<Container>
			<NameContainer>{loading ? <Skeleton /> : name}</NameContainer>
			<DataWrapper>
				<div>
					{loading ? (
						<Skeleton height="10px" width="30px" />
					) : (
						` Serial Id:- ${serialId}`
					)}
				</div>
				<div className="verifiedData">
					{kycStatus === 'verified' ? <IcCFtick /> : <IcCFcrossInCircle />}
					{loading ? <Skeleton height="10px" width="30px" /> : kycStatus}
				</div>
			</DataWrapper>

			{kycStatus === 'verified' ? (
				<Wrapper>
					{businessAddressProofUrl && (
						<DocumentContainer onClick={() => goTo(businessAddressProofUrl)}>
							<IcMDocument />
							ADDRESS PROOF
						</DocumentContainer>
					)}
					{panUrl && (
						<DocumentContainer onClick={() => goTo(panUrl)}>
							<IcMCreditCard width="20px" height="20px" />
							PAN PROOF
						</DocumentContainer>
					)}
				</Wrapper>
			) : null}
		</Container>
	);
};
export default POCInformation;
