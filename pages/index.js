import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState, useEffect, useCallback } from 'react';
import { sleep } from '../utils';
import config from '../config';
import PromptHint from '../components/hint';

const HINTS = config.hints;

const Home = () => {
  const maxRetries = 20;
  const [input, setInput] = useState('');
  const [img, setImg] = useState('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState('');
  
  const onRestart = useCallback(() => {
    setImg('');
  }, [setImg]);

  const setCurrentInput = useCallback((input) => {
    setInput(input);
  }, [setInput]);

  const onChange = (event) => {
    setInput(event.target.value);
  };
  // Add generateAction
  const generateAction = async () => {
    if (isGenerating) return;

    // Set loading has started
    setIsGenerating(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(`Error: ${data.error}`);
      setError('An error occurred. Please try again later');
      setIsGenerating(false);
      return;
    }

    setFinalPrompt(input);
    setInput('');
    setError('');
    setImg(data.image);
    setIsGenerating(false);
  }

  return (
    <div className="root">
      <Head>
        <title>AI Avatar Generator | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>wolas silly pictures generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Turn me into anyone you want! Make sure you refer to me as "Adam" in the prompt</h2>
          </div>
          {
            !img && <>
               
                <div className="prompt-container">
                  <input className="prompt-box" value={input} onChange={onChange} placeholder="e.g. Portrait of Adam as a detective, epic scene, highly detailed, digital illustration, 4k" />
                </div>
                <div className={"prompt-hints" + (isGenerating ? " disabled": "") }>
                  {
                  isGenerating ? <div>Please sit tight and wait for the AI model to load, this may take a while if you do it for the first time</div> : <> <div>or try me as</div>
                    {
                      HINTS.map((hint) => (<PromptHint key={hint.label} hint={hint} onHintClick={setCurrentInput}></PromptHint>))
                    }</>
                  }
                 
                </div>
                <div className="prompt-buttons">
                  {error && <div className="error">{error}</div>}
                <button disabled={isGenerating || !input} className={
                    isGenerating ? 'generate-button loading' : 'generate-button'
                  } onClick={generateAction}>
                    <div className="generate">
                      {isGenerating ? (
                        <span className="loader"></span>
                      ) : (
                        <p>Generate</p>
                      )}
                    </div>
                  </button>
                </div>
              </>
          }          
        </div>
        {img && (
          <div className="output-content">
            <Image src={img} width={512} height={512} alt={input} />
            <p>{finalPrompt}</p>
            <button onClick={onRestart} className="generate-button button-width-auto">Get something different</button>
          </div>
        )}
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-avatar"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
