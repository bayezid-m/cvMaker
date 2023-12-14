// FeedbackModal.tsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import { TypeAnimation } from 'react-type-animation';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    feedback: any;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, feedback }) => {
    const [animationShown, setAnimationShown] = useState(false);

    const handleAfterOpen = () => {
        // Set the flag to true after the modal is opened
        setAnimationShown(true);
    };

    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={handleAfterOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="overlay"
        >
            <h2>
                {animationShown ? (
                    <TypeAnimation
                        cursor={false}
                        sequence={['Feedback ']}
                        speed={50}
                        style={{ color: 'black' }} // Set the desired color
                    />
                ) : null}
            </h2>
            <div>
            <h2>
                {animationShown ? (
                    <TypeAnimation
                        cursor={false}
                        sequence={['Positives: ']}
                        speed={50}
                        style={{ color: 'green' }} // Set the desired color
                    />
                ) : null}
            </h2>
                {feedback?.positiveFeedback.map((item: string, index: number) => (
                    <p key={index}>
                        {animationShown ? (
                            <TypeAnimation
                                cursor={false}
                                sequence={[item]}
                                speed={40}
                            />
                        ) : null}
                    </p>
                ))}
            </div>
            <div>
            <h2>
                {animationShown ? (
                    <TypeAnimation
                        cursor={false}
                        sequence={['Negatives: ']}
                        speed={50}
                        style={{ color: 'red' }} // Set the desired color
                    />
                ) : null}
            </h2>
                {feedback?.negativeFeedback.map((item: string, index: number) => (
                    <p key={index}>
                        {animationShown ? (
                            <TypeAnimation
                                cursor={false}
                                sequence={[item]}
                                speed={70}
                            />
                        ) : null}
                    </p>
                ))}
            </div> 
            <h2>
                {animationShown ? (
                    <TypeAnimation
                        cursor={false}
                        sequence={['Carrear Suggestion: ']}
                        speed={50}
                        style={{ color: 'black' }} // Set the desired color
                    />
                ) : null}
            </h2>
            <p>
                {animationShown ? (
                    <TypeAnimation
                        cursor={false}
                        sequence={[feedback?.careerSuggestion]}
                        speed={10}
                    />
                ) : null}
            </p>
            <button onClick={onClose}>Close Modal</button>
        </Modal>
    );
};

export default FeedbackModal;
