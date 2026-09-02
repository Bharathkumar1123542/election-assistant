import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chat from '../components/Chat/Chat'; // Assuming Chat component exists

describe('Chat Component', () => {
  it('renders with accessibility features', () => {
    const messages = [{ text: 'Hello', isUser: false }];
    render(<Chat onSendMessage={() => {}} messages={messages} />);
    expect(screen.getByRole('region', { name: /election assistant chat/i })).toBeInTheDocument();
    expect(screen.getByRole('log')).toBeInTheDocument();
    expect(screen.getByLabelText(/type your message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/send message/i)).toBeInTheDocument();
  });
});