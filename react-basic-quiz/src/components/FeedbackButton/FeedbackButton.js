// src/components/FeedbackButton.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './FeedbackButton.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const FeedbackButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {/* Pencil Icon Button */}
            <button className="feedback-button" onClick={openModal}>
                <i className="fas fa-pencil-alt"></i>
            </button>

            {/* Feedback Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Feedback Modal"
                className="feedback-modal"
                overlayClassName="feedback-overlay"
            >
                <h2>Give Feedback</h2>
                <p>Provide feedback or request a feature</p>
                <textarea className="feedback-textarea" placeholder="Your feedback here..."></textarea>
                <button className="submit-button" onClick={closeModal}>Submit</button>
            </Modal>
        </>
    );
};

export default FeedbackButton;
