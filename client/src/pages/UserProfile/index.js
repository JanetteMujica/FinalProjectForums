import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton';
import { CircularProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';

const UserProfile = () => {
	const indicatorSize = 80;
	const { user, isAuthenticated } = useAuth0();
	const [userThemes, setUserThemes] = useState(null);
	const [userComments, setUserComments] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const email = user.email;

	useEffect(() => {
		fetch(`/userThemes/${email}`)
			.then((res) => res.json())
			.then((data) => {
				setIsLoading(false);
				setUserThemes(data.data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, [email]);

	useEffect(() => {
		fetch(`/userComments/${email}`)
			.then((res) => res.json())
			.then((data) => {
				setIsLoading(false);
				setUserComments(data.data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, [email]);

	if (isLoading) {
		return <div>Loading ...</div>;
	}
	return (
		isAuthenticated && (
			<Wrapper>
				<TitreSection>
					<TitrePage>MON PROFIL</TitrePage>
					<LogoutButton />
				</TitreSection>

				<ProfileSection>
					<Titre>MES INFORMATIONS</Titre>
					<p>{user.name}</p>
					<p>{user.email}</p>
				</ProfileSection>

				<ThemeSection>
					<Titre>MES DISCUSSIONS</Titre>

					{!userThemes ? (
						<CircularProgress
							size={indicatorSize}
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								marginTop: `${-indicatorSize / 2}px`,
								marginLeft: `${-indicatorSize / 2}px`,
								color: '#FADA80',
							}}
						/>
					) : (
						<ThemeWrapper>
							{userThemes.map((theme) => (
								<Section>
									<Nav key={theme._id} to={`/forums/fil/${theme._id}`}>
										<ThemePost>{theme.theme}</ThemePost>
									</Nav>
									<UserName>
										<Bold>Par: </Bold>
										{theme.username}
									</UserName>
								</Section>
							))}
						</ThemeWrapper>
					)}
				</ThemeSection>

				<CommentSection>
					<Titre>MES COMMENTAIRES</Titre>
					{!userComments ? (
						<CircularProgress
							size={indicatorSize}
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								marginTop: `${-indicatorSize / 2}px`,
								marginLeft: `${-indicatorSize / 2}px`,
								color: '#FADA80',
							}}
						/>
					) : (
						<WrapperComment>
							{userComments.map((comment) => (
								<SectionComm>
									<NavComm
										key={comment.themeId}
										to={`/forums/fil/${comment.themeId}`}
									>
										<CommentPost>{comment.comment}</CommentPost>
									</NavComm>
									<UserNameComm>
										<Bold>Par:</Bold>
										{comment.username}
									</UserNameComm>
								</SectionComm>
							))}
						</WrapperComment>
					)}
				</CommentSection>
			</Wrapper>
		)
	);
};

export default UserProfile;

const Wrapper = styled.section`
	margin-top: 16em;
	margin-left: 1em;
	margin-right: 1em;
	margin-bottom: 1em;
	display: flex;
	flex-direction: column;
	gap: 2em;
`;

const TitreSection = styled.section`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const TitrePage = styled.h1`
	font-weight: 700;
`;

const ProfileSection = styled.section``;

const CommentSection = styled.section``;

const ThemeSection = styled.section``;
const Titre = styled.p`
	font-weight: 700;
	margin-bottom: 1em;
`;

const ThemeWrapper = styled.div`
	max-width: 344px;
`;
const Section = styled.div`
	margin-bottom: 1.2em;
`;

const Nav = styled(NavLink)`
	color: var(--red);
`;

const CommentPost = styled.a`
	font-weight: 700;
	font-size: 1em;
`;

const Bold = styled.span`
	font-weight: 700;
`;

const UserName = styled.p`
	margin-top: 0.8em;
	text-align: right;
`;

const WrapperComment = styled.div`
	max-width: 344px;
`;
const SectionComm = styled.div`
	margin-bottom: 1.2em;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	padding: 1em;
	width: 344px;
	margin-top: 1em;
`;

const NavComm = styled(NavLink)`
	color: var(--red);
`;

const ThemePost = styled.a`
	font-weight: 700;
	font-size: 1.2em;
`;

const UserNameComm = styled.p`
	margin-top: 0.8em;
	text-align: right;
`;
