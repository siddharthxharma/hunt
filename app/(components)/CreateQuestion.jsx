"use client";
import React, { useState } from 'react';

const CreateQuestion = () => {
    const [problem, setProblem] = useState("");
    const [answer, setAnswer] = useState("");
    const [level, setLevel] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!problem || !answer || !level) {
            setError("All fields are necessary!");
            return;
        }

        try {
            const res = await fetch('/api/SetQuestions', {  // Make sure this path is correct
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    problem, answer, level: parseInt(level), image
                })
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                setError("");
            } else {
                setError("Question not added");
            }
        } catch (error) {
            setError("Question not added");
        }
    };

    return (
        <div>
            <div className='grid place-items-center h-screen border'>
                <div className='shadow-lg p-5 rounded border-t-4 border-blue-500'>
                    <h1 className='text-xl font-bold my-4'>Create Question</h1>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <input 
                            onChange={e => setProblem(e.target.value)}
                            type='text' 
                            placeholder='problem' 
                        />
                        <input 
                            onChange={e => setAnswer(e.target.value)}
                            type='text' 
                            placeholder='answer'
                        />
                        <input 
                            onChange={e => setLevel(e.target.value)}
                            type='number' 
                            placeholder='level'
                        />
                        <input 
                            onChange={e => setImage(e.target.value)}
                            type='text' 
                            placeholder='image url'
                        />
                        <button className='bg-blue-500 text-white font-bold cursor-pointer px-6 py-2'>
                            Add Question
                        </button>
                        {error && <div className='text-red-500 text-sm py-1 px-3 mt-2'>
                            {error}
                        </div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateQuestion;
