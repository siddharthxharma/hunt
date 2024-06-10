'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, getSession } from 'next-auth/react';
import axios from 'axios';

export default function PlayPage() {
  const { data: session, status, update } = useSession();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [level, setLevel] = useState(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user.level !== undefined) {
      setLevel(session.user.level);
    }
  }, [status, session?.user.level]);

  useEffect(() => {
    if (level !== null) {
      fetchQuestion(level);
    }
  }, [level]);

  const fetchQuestion = async (level) => {
    try {
      console.log(`Fetching question for level: ${level}`);
      const res = await axios.get(`/api/questions/${level}`);
      console.log('Question fetched:', res.data);
      setQuestion(res.data);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(`Submitting answer for level: ${level}`);
      const res = await axios.post('/api/validate-answer', { level, answer });
      console.log('Validation response:', res.data);
      
      if (res.data.message === "Correct answer") {
        setFeedback('Correct answer! Moving to the next level.');

        const newLevel = res.data.newLevel; // Get new level from response
        console.log(`Advancing to level: ${newLevel}`);

        // Update the session to reflect new level
        await update({ user: { ...session.user, level: newLevel } });

        // Refetch the session to get the updated data
        const updatedSession = await getSession();
        console.log('Updated session:', updatedSession);

        // Ensure local state is in sync with the updated session
        if (updatedSession?.user?.level) {
          setLevel(updatedSession.user.level);
        }

        setAnswer('');
      } else {
        setFeedback('Incorrect answer. Try again.');
      }
    } catch (error) {
      console.error('Error validating answer:', error);
      setFeedback('Error validating answer.');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be authenticated to play the game.</div>;
  }

  return (
    <div>
      <h1>Play</h1>
      {question ? (
        <div>
          <h2>Level {level}</h2>
          <p>{question.problem}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
          {feedback && <p>{feedback}</p>}
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
}
