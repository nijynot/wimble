import React, { useState } from 'react';
import { clipboard } from 'electron';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import { useSpring, animated } from 'react-spring';

import Wimble from 'svg/Wimble';
import Back from 'svg/Back';
import Spinner from 'svg/Spinner';
import Checkbox from 'components/Checkbox';
require('./SeedPage.scss');

const example = 'foster approve pen ancient engage bomb fantasy life short stuff mesh bus design truck oyster ankle shallow torch double melody town century nice report';

function SeedPage(props) {
  const [approved, setApproved] = useState(false);
  const [seed, setSeed] = useState(
    (props.history.location.state && props.history.location.state.seed) || []
  );
  const [loading, setLoading] = useState(false);
  const fade = useSpring({
    opacity: seed ? '1' : '0',
  });

  const toggleApprove = () => {
    props.history.replace(props.history.location.pathname, { approved: !approved });
    setApproved(!approved);
  }

  const onClickGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSeed(example);
    }, 800);
  }

  return (
    <div className="Seed">
      <Wimble />
      {/*<Back onClick={() => props.history.goBack()} />*/}
      <h2>Recovery phrase</h2>
      <p>Write down your recovery phrase.</p>
      <div className={cx('Seed_phrase')}>
        {(seed) ? seed.map((word, i) => (
          <span
            className="Seed_word"
            onClick={() => clipboard.writeText(word)}
          >
            <span className="Seed_index">{i + 1}.</span>
            <span>{word}</span>
          </span>
        )) : (
          <>
            <p>Phrase not generated yet.</p>
            <button
              className="Seed_generate-btn"
              onClick={() => onClickGenerate()}
            >
              {(loading) ? (
                <Spinner active={loading} />
              ) : 'Generate phrase'}
            </button>
          </>
        )}
      </div>
      <animated.div style={{
        ...fade,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <button
          className="Seed_copy-all-btn"
          onClick={() => clipboard.writeText(seed.join(' '))}
        >Copy all</button>
        <div className="Seed_line"></div>
        <div className="Seed_approval">
          <Checkbox
            checked={approved}
            onClick={toggleApprove}
          />
          <span
            onClick={toggleApprove}
          >
            I have written down the recovery phrase.
          </span>
        </div>
      </animated.div>
    </div>
  );
}
export default withRouter((props) => <SeedPage {...props} />);
