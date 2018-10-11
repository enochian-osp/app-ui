import React from 'react';

import Config from '../../Config';

import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

import AppBar from '../../AppBar';
import Keys from './Keys';

import EnochianKeys from './keys.data.js';
import dictionary from '../dictionary.json';

const CONFIG_ENOCHIAN_PERSONAL_KEY = 'enochian_personalKey';

function addDigitsUntil(number, max) {
  let sum = number;

  if (!(Number.parseInt(number, 10)))
    throw new Error('[addDigitsUntil] `number` should be an integer, not ' + number);

  if (!Number.isInteger(max))
    throw new Error('[addDigitsUntil] `max` should be an integer, not ' + max);

  if (max < 1)
    throw new Error('[addDigitsUntil] `max` should be >= 1, not ' + max);

  while (sum > max) {
    sum = sum.toString().split('').map(parseFloat)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  }

  return sum;
}

function KOTD() {
  const d = new Date();
  const dateString = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
  const digitString = d.getDate() + '' + (d.getMonth() + 1) + d.getFullYear();
  const key = addDigitsUntil(digitString, 18);
  return {
    dateString,
    digitString,
    key
  };
}

const navPos = [
  { text: 'Enochian', to: '/enochian' }
];

const IDLE_CHECK = 1000;
const KOTD_CHECK = 1000 * 60 * 60 * 2;  // 2 hrs

const s = {
  setPersonalKey: {
    padding: 22
  },
  enochianFont: {
    fontFamily: 'enochianplain'
  },
  dictionary: {
    padding: 22,
    background: 'rgba(0,0,0,0.9)',
    color: 'white',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
};

const FontButton = ({ enochianFont, toggleFont }) => (
  <Button onClick={toggleFont}>
    <span style={{color:enochianFont?'':'red'}}>A</span>
    &nbsp;
    <span style={{...s.enochianFont,color:enochianFont?'red':''}}>A</span>
  </Button>
);

const Dictionary = ({ Key, subkey }) => {
  const key = EnochianKeys[Key];
  const sub = key.subkeys[subkey];
  const dict = dictionary[sub.enochianLatin] || { meanings: [], pronounciations: [] };
  return (
    <table width="100%">
      <tbody>
        <tr>
          <td style={{...s.enochianFont,textAlign:'left',width:'33%'}}>{sub.enochianLatin}</td>
          <td style={{textAlign:'center',width:'33%'}}>{sub.enochianLatin}</td>
          <td style={{width:'33%',textAlign:'right'}}>{dict.pronounciations.length&&dict.pronounciations[0].pronounciation}</td>
        </tr>
        {
          dict.meanings.map((meaning, i) => (
            <tr key={i}>
              <td colSpan="3" style={{textAlign:'center'}}>{meaning.meaning} ({meaning.source}) {meaning.source2} {meaning.note}</td>
            </tr>
          ))
        }
        <tr>
          <td colSpan="3" style={{textAlign:'center'}}>{sub.english} (Dee book)</td>
        </tr>
        <tr>
          <td>Key {key.key}.{sub.subkey}</td>
          <td></td>
          <td style={{textAlign:'right'}}>{dict.gematria?'Gematria '+dict.gematria.join(', '):''}</td>
        </tr>
      </tbody>
    </table>
  );
};

class KeysController extends React.Component {
  constructor() {
    super();

    const kotd = KOTD();
    const personalKey = Config.get(CONFIG_ENOCHIAN_PERSONAL_KEY);

    this.defaultOpenKeys = new Set([1, 3, 7]);

    this.state = {
      layout: 'english',
      enochianFont: false,
      kotd,
      open: new Set([1, 3, 7, kotd.key, personalKey]),
      personalKey,
      selectedKey: {},
    };

    this.togglePanels = [];
    for (let i=1; i < 19; i++)
      this.togglePanels[i] = this.togglePanel(i);

    this.personalKeyChange = this.personalKeyChange.bind(this);
  }

  setLayout = event => {
    this.setState({ layout: event.target.value });
  };

  selectKey = (key, subkey) => () => {
    this.setState({ selectedKey: { key, subkey }});
  };

  toggleEnochianFont = () => {
    this.setState({ enochianFont: !this.state.enochianFont });
  };

  togglePanel = panel => (event, expanded) => {
    const open = this.state.open;
    (expanded ? open.add : open.delete).call(open, panel);
    this.setState({ open: new Set(open) });
  };

  componentDidMount() {
    // Maybe the user left the keys open, left the app (in background), and
    // came back (to same page) on a different day.  We must check after a
    // bunch of idle time if the correct keys are open.
    this.lastTime = Date.now();
    this.intervalHandle = window.setInterval(() => {
      const now = Date.now();
      if (now > this.lastTime + KOTD_CHECK) {
        const kotd = KOTD();
        if (this.state.kotd.key !== kotd.key) {
          let open = this.state.open;
          if (!this.defaultOpenKeys.has(this.state.kotd.key)
              && this.state.kotd.key !== this.state.personalKey)
            open.delete(this.state.kotd.key);
          open.add(kotd.key);
          open = new Set(open);
          this.setState({ kotd, open });
        }
      }
      this.lastTime = Date.now();
    }, IDLE_CHECK);
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalHandle);
  }

  personalKeyChange(event) {
    const personalKey = Number.parseInt(event.target.value, 10);

    let open = this.state.open;
    if (!this.defaultOpenKeys.has(this.state.personalKey)
        && this.state.kotd.key !== this.state.personalKey)
    open.delete(this.state.personalKey);
    open.add(personalKey);
    open = new Set(open);

    Config.set(CONFIG_ENOCHIAN_PERSONAL_KEY, personalKey);
    this.setState({ personalKey, open });
  }

  render() {
    //const { classes } = this.props;
    const kotd = this.state.kotd;

    return (
      <div>

        <AppBar navPos={null/*navPos*/} title="Keys" />

        <div>
          <label>
            <Radio
              checked={this.state.layout === 'english'}
              onChange={this.setLayout}
              value="english"
              aria-label="english"
            />
            <span>English</span>
          </label>

          <label>
            <Radio
              checked={this.state.layout === 'enochian'}
              onChange={this.setLayout}
              value="enochian"
              aria-label="enochian"
            />
            <span>Enochian</span>
          </label>

          <label>
            <Radio
              checked={this.state.layout === 'book'}
              onChange={this.setLayout}
              value="book"
              aria-label="book"
            />
            <span>Both</span>
          </label>

          &nbsp;

          {
            this.state.layout === 'english'
              ? null
              : <FontButton toggleFont={this.toggleEnochianFont}
                enochianFont={this.state.enochianFont} />
          }

        </div>

        <div>
          <Keys layout={this.state.layout}
            enochianFont={this.state.enochianFont}
            kotd={kotd}
            personalKey={this.state.personalKey}
            open={this.state.open}
            togglePanels={this.togglePanels}
            selectKey={this.selectKey}
            selectedKey={this.state.selectedKey}
          />
        </div>

        <div style={s.setPersonalKey}>
          <span>Personal key: </span>
          <select name="enochian_personal_key"
              onChange={this.personalKeyChange} value={this.state.personalKey}>
            {
              [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map(keyNo => (
                <option key={keyNo} value={keyNo}>{keyNo}</option>
              ))
            }
          </select>
        </div>

        {
          this.state.selectedKey.key ?
            <div style={s.dictionary} onClick={this.selectKey()}>
              <Dictionary
                Key={this.state.selectedKey.key}
                subkey={this.state.selectedKey.subkey} />
            </div>
          : null
        }

      </div>
    );
  }
};

export default KeysController;
