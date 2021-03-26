import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { get, patch, post } from '../../../utils/httpMethods';
import StoryTrans from './StoryTrans';
import { Divider, Popover, Button, Affix, notification } from 'antd';
import { storyStrings } from './Strings';
import { get as got } from 'lodash';

//@TODO Rework Story model so that they're array of sentences, and their translations

const Story = (props: any) => {
  let [story, setStory] = useState(['']);
  let [trans, setTrans] = useState(['']);
  let [title, setTitle] = useState('');
  let [highlight, setHighlight] = useState('');
  let [wordTrans, setWordTrans] = useState(['']);
  let [curSent, setCurSent] = useState(0);
  let [showTrans, setShowTrans] = useState(true);
  let [isPop, setIsPop] = useState(false);
  let [imSpeaking, setImSpeaking] = useState(false);
  const userId = got(props, 'auth.user.user._id', '');

  let synth = window.speechSynthesis;
  let voices = synth.getVoices();
  console.log(voices);

  useEffect(() => {
    queryGetStoryById();
    let lang = localStorage.getItem('locale') || '';
    storyStrings.setLanguage(lang);
  }, []);

  useEffect(() => {
    if (imSpeaking) {
      speak(story[curSent]);
    }
  }, [curSent]);

  const pause = () => {
    synth.cancel();
    setImSpeaking(false);
  };

  const sayTrans = (text: string) => {
    if (text !== '') {
      let utterThis = new SpeechSynthesisUtterance(text);
      utterThis.voice = voices[3];
      synth.speak(utterThis);
    }
  };

  const speak = (text: string) => {
    setImSpeaking(true); //adjust for individual words
    // if (synth.speaking) {
    //   console.error('speechSynthesis.speaking');
    //   return;
    // }
    if (text !== '') {
      let utterThis = new SpeechSynthesisUtterance(text);
      utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
        if (curSent < story.length - 1) {
          let newIndex = curSent + 1;
          console.log(curSent);
          setCurSent(newIndex);
        }
      };
      utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
        synth.cancel();
      };
      utterThis.voice = voices[3]; //@TODO - make this not hard-coded later
      console.log('hi');
      console.log(text);
      synth.speak(utterThis);
    } else {
      notification.error({ message: 'No Text To Read' });
    }
  };

  async function queryGetStoryById(): Promise<any> {
    let _id = props.match.params.storyId;
    let data = await get({ url: `/story/` + _id });
    setStory(data.english);
    setTrans(data.chinese);
    setTitle(data.title);
  }

  async function queryAddWord(word: string): Promise<any> {
    console.log(userId);
    if (userId === '') {
      notification.warning({
        message: storyStrings.noUserTitle,
        description: storyStrings.noUserDesc,
      });
    } else {
      let newWord = await post({
        url: '/words/',
        data: {
          word: word,
          trans: wordTrans,
          storyId: props.match.params.storyId,
        },
      });

      let data = await patch({
        url: '/words/user/' + userId,
        data: {
          wordId: newWord.Word._id,
        },
      });
      if (data) {
        notification.success({
          message: storyStrings.wordSucTitle,
          description: word,
        });
      } else {
        notification.error({ message: storyStrings.wordErrTitle });
      }
    }
  }

  async function queryGetWordTrans(word: string): Promise<any> {
    setWordTrans(['']);
    let data = await get({ url: '/words/translate/' + word });
    setWordTrans(data.trans.slice(0, 3).join('，'));
    popContent(word);
    console.log(wordTrans);
  }

  const popContent = (word: string) => {
    if (wordTrans == ['']) {
      setWordTrans(['没有翻译']);
    }
    return (
      <div>
        <span
          style={{
            width: '100%',
            justifyContent: 'center',
            fontWeight: 'bold',
          }}
        >
          {word}:
        </span>
        <br />
        <span>{wordTrans}</span>
        <br />
        <Button type='primary' onClick={() => queryAddWord(word)}>
          {storyStrings.save}
        </Button>
        <Button type='primary' onClick={() => sayTrans(word)}>
          Speak
        </Button>
      </div>
    );
  };

  const handleHover = (index: number) => {
    if (!isPop && !synth.speaking) {
      setCurSent(index);
      setHighlight('');
    }
  };

  const handleClick = (word: string, index: number) => {
    setImSpeaking(false);
    synth.cancel();
    setCurSent(index);
    setHighlight(word);
    queryGetWordTrans(word);
  };

  return (
    <div>
      <div className='mainContainer'>
        <header style={{ marginTop: '47px', backgroundColor: 'white' }}>
          <StoryTrans
            chinese={trans[curSent]}
            showTrans={showTrans}
            setShowTrans={setShowTrans}
          ></StoryTrans>
        </header>
        <Divider style={{ fontSize: '24px' }}>{title}</Divider>
        {story.map((el: any, index: number) => (
          //   <div key={el}>{renderSentence(index)}</div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {index === curSent
              ? story[index].split(' ').map((word: string) => (
                  <Popover
                    content={popContent(word)}
                    title={word}
                    trigger='click'
                    onVisibleChange={() => setIsPop(!isPop)}
                  >
                    {word === highlight ? (
                      <span
                        onClick={() => handleClick(word, index)}
                        onMouseOver={() => handleHover(index)}
                        style={{
                          marginLeft: '.5rem',
                          fontSize: '32px',
                          color: '#15A57A',
                          backgroundColor: 'lightyellow',
                        }}
                      >
                        {word}
                      </span>
                    ) : (
                      <span
                        onClick={() => handleClick(word, index)}
                        onMouseOver={() => handleHover(index)}
                        style={{
                          marginLeft: '.5rem',
                          fontSize: '32px',
                          color: '#15A57A',
                        }}
                      >
                        {word}
                      </span>
                    )}
                  </Popover>
                ))
              : story[index].split(' ').map((word: string) => (
                  <>
                    <span
                      onClick={() => handleClick(word, index)}
                      onMouseOver={() => handleHover(index)}
                      style={{
                        marginLeft: '.5rem',
                        fontSize: '32px',
                      }}
                    >
                      {word}
                    </span>
                  </>
                ))}
          </div>
        ))}
      </div>
      <Affix offsetBottom={20} className='float-right pr-3'>
        {imSpeaking ? (
          <Button type='primary' shape='round' size='large' onClick={pause}>
            {storyStrings.stop}
          </Button>
        ) : (
          <Button
            type='primary'
            shape='round'
            size='large'
            onClick={() => speak(story[curSent])}
          >
            {storyStrings.play}
          </Button>
        )}
      </Affix>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Story);
