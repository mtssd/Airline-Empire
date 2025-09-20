import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Globe,
  Plane,
  Crown,
  Star
} from 'lucide-react';

const ChatContainer = styled(animated.div)`
  max-width: 1000px;
  margin: 0 auto;
`;

const ChatLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: ${props => props.theme.spacing.lg};
  height: 600px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const ChatMainArea = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 600px;
  padding: 0;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.lg};
  overflow-y: auto;
  background: ${props => props.theme.colors.gray[50]};
`;

const ChatInputArea = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
  background: white;
`;

const ChatInput = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const MessageInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 8px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Message = styled.div<{ $own?: boolean }>`
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$own ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div<{ $own?: boolean }>`
  background: ${props => props.$own 
    ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`
    : 'white'
  };
  color: ${props => props.$own ? 'white' : props.theme.colors.neutralDark};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: 12px;
  max-width: 70%;
  box-shadow: ${props => props.theme.shadows.sm};
  border: ${props => props.$own ? 'none' : `1px solid ${props.theme.colors.gray[200]}`};
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: 4px;
  font-size: 0.875rem;
  opacity: 0.8;
`;

const MessageContent = styled.div`
  line-height: 1.4;
`;

const UsersList = styled(Card)`
  height: fit-content;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  border-radius: 6px;
  margin-bottom: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.gray[50]};
  }
`;

const UserAvatar = styled.div<{ $color: string }>`
  width: 32px;
  height: 32px;
  background: ${props => props.$color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
`;

const UserStatus = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const UserBadge = styled.div<{ $type: 'premium' | 'alliance' | 'new' }>`
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    const { $type } = props;
    if ($type === 'premium') return '#fbbf24';
    if ($type === 'alliance') return '#3b82f6';
    return '#10b981';
  }};
  color: white;
`;

export const GlobalChat: React.FC = () => {
  const [message, setMessage] = useState('');

  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const messages = [
    {
      id: 1,
      user: 'AirlineKing47',
      badge: 'premium' as const,
      content: 'Just opened a new route from Miami to Barcelona! Anyone have experience with European operations?',
      time: '2 min ago',
      own: false
    },
    {
      id: 2,
      user: 'SkylineExpress',
      badge: 'alliance' as const,
      content: 'Congrats! European routes can be tricky with regulations. Happy to share some insights.',
      time: '1 min ago',
      own: false
    },
    {
      id: 3,
      user: 'You',
      content: 'Looking to expand into Asian markets. Any recommendations for reliable aircraft leasing?',
      time: 'Just now',
      own: true
    }
  ];

  const onlineUsers = [
    { name: 'AirlineKing47', status: 'Premium Member', color: '#3b82f6', badge: 'premium' as const },
    { name: 'SkylineExpress', status: 'Alliance Leader', color: '#10b981', badge: 'alliance' as const },
    { name: 'CloudNine_CEO', status: 'Online', color: '#f59e0b', badge: 'new' as const },
    { name: 'JetStream_Ltd', status: 'Premium Member', color: '#8b5cf6', badge: 'premium' as const },
    { name: 'WingsOfFreedom', status: 'Online', color: '#ef4444', badge: 'new' as const },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'premium': return Crown;
      case 'alliance': return Star;
      default: return Users;
    }
  };

  return (
    <ChatContainer style={containerSpring}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1d1d1d' }}>Global Aviation Chat</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
            <Users size={16} />
            <span>127 pilots online</span>
          </div>
          <Button variant="accent">
            <Globe size={16} />
            Join Alliance Chat
          </Button>
        </div>
      </div>

      <ChatLayout>
        <ChatMainArea delay={200}>
          <ChatHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={20} />
              <span>Global Lounge</span>
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
              127 members online
            </div>
          </ChatHeader>

          <ChatMessages>
            {messages.map((msg, index) => (
              <Message key={msg.id} $own={msg.own}>
                <MessageBubble $own={msg.own}>
                  {!msg.own && (
                    <MessageHeader>
                      <span style={{ fontWeight: '500' }}>{msg.user}</span>
                      {msg.badge && (
                        <UserBadge $type={msg.badge}>
                          {msg.badge}
                        </UserBadge>
                      )}
                      <span>•</span>
                      <span>{msg.time}</span>
                    </MessageHeader>
                  )}
                  <MessageContent>{msg.content}</MessageContent>
                </MessageBubble>
              </Message>
            ))}
          </ChatMessages>

          <ChatInputArea>
            <ChatInput>
              <MessageInput
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button variant="primary" onClick={handleSendMessage}>
                <Send size={16} />
              </Button>
            </ChatInput>
          </ChatInputArea>
        </ChatMainArea>

        <UsersList title="Online Pilots" delay={300}>
          {onlineUsers.map((user, index) => {
            const BadgeIcon = getBadgeIcon(user.badge);
            return (
              <UserItem key={index}>
                <UserAvatar $color={user.color}>
                  {user.name.charAt(0)}
                </UserAvatar>
                <UserInfo>
                  <UserName>{user.name}</UserName>
                  <UserStatus>{user.status}</UserStatus>
                </UserInfo>
                <BadgeIcon size={14} color="#6b7280" />
              </UserItem>
            );
          })}
        </UsersList>
      </ChatLayout>
    </ChatContainer>
  );
};