import React from 'react';
import styled from 'styled-components';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';
import Card from './components/Card';
import Button from './components/Button';
import { PuffLoader } from 'react-spinners';
import { ColorPicker } from './theme';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const lngs = {
	en: { nativeName: 'English' },
	it: { nativeName: 'Italiano' },
};

export default function App() {
	// muilti lang
	const { t, i18n } = useTranslation();

	const { transcript, resetTranscript, listening } = useSpeechRecognition();

	const microphoneOn = () => {
		SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
		toast.success(`${t('speech.microPhoneOn')}`, { autoClose: 1500 });
	};

	const microphoneOff = () => {
		SpeechRecognition.stopListening();
		toast.error(`${t('speech.microPhoneOff')}`, { autoClose: 1500 });
	};

	const resetParagraph = () => {
		resetTranscript();
		toast.info(`${t('speech.resetContentPage')}`, { autoClose: 1500 });
	};

	const Microphone = () => {
		return (
			<Button
				color={!listening ? 'success' : 'danger'}
				onClick={!listening ? microphoneOn : microphoneOff}
			>
				<box-icon
					name={!listening ? 'microphone' : 'microphone-off'}
					color="white"
				/>
			</Button>
		);
	};

	return (
		<Container>
			<div>
				{Object.keys(lngs).map(lng => (
					<button
						type="submit"
						key={lng}
						onClick={() => i18n.changeLanguage(lng)}
						disabled={i18n.resolvedLanguage === lng}
					>
						{lngs[lng].nativeName}
					</button>
				))}
			</div>
			<Card.Container>
				<Card.Top>
					<Title>{t('speech.title')}</Title>
				</Card.Top>
				<Card.Content>
					<Paragraph>
						{transcript ? transcript : `${t('speech.textPlaceHolder')}`}
					</Paragraph>
				</Card.Content>
				<Card.Bottom>
					<BottomContainer>
						<LoadingBox>
							<PuffLoader
								size={50}
								loading={listening}
								color={`rgb(${ColorPicker('primary')})`}
							/>
						</LoadingBox>

						<ButtonBox>
							<Microphone />
							<Button color="primary" onClick={resetParagraph}>
								<box-icon name="reset" color="white" />
							</Button>
						</ButtonBox>
					</BottomContainer>
				</Card.Bottom>
			</Card.Container>
		</Container>
	);
}

const Container = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h2`
	padding: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Paragraph = styled.p`
	padding: 0.5rem;
`;

const ButtonBox = styled.div`
	display: flex;
	column-gap: 0.5rem;
	padding: 0.5em;
`;

const BottomContainer = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: space-between;
`;

const LoadingBox = styled.div``;
