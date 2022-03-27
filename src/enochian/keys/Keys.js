import React from 'react';
import { pure } from 'recompose';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import EnochianKeys from '../enochian-data/keys.data.js';
import '../enochianFont.js';

const s = {
  keyParagraph: {
    textAlign: 'justify'
  },
  selectedKey: {
    background: 'yellow'
  }
};

const Layouts = {

  book: ({ Key, enochianFont, selectKey, selectedKey }) => {
    const enochianClass = enochianFont ? 'enochianFont' : null;

    return (
      <table>
        <tbody>
          {
            Key.subkeys.map(subkey => (
              <tr key={subkey.subkey}
                  onClick={selectKey(Key.key,subkey.subkey)}
                  style={selectedKey.key===Key.key&&selectedKey.subkey===subkey.subkey?s.selectedKey:null}>
                <td>{Key.key}.{subkey.subkey}</td>
                <td className={enochianClass}>{subkey.enochianLatin}</td>
                <td>{subkey.english}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  },

  english: ({ Key, selectKey, selectedKey }) => (
    <Typography variant="body1" style={s.keyParagraph}>
      {
        Key.subkeys.map(subkey => (
          <span
              style={selectedKey.key===Key.key&&selectedKey.subkey===subkey.subkey?s.selectedKey:null}
              key={subkey.subkey}
              onClick={selectKey(Key.key,subkey.subkey)}
            >{subkey.english} </span>
        ))
      }
    </Typography>
  ),

  enochian: ({ Key, enochianFont, selectKey, selectedKey }) => {
    const enochianClass = enochianFont ? 'enochianFont' : null;
    
    return (
      <Typography variant="body1"  style={s.keyParagraph} className={enochianClass}>
        {
          Key.subkeys.map(subkey => (
            <span
                style={selectedKey.key===Key.key&&selectedKey.subkey===subkey.subkey?s.selectedKey:null}
                key={subkey.subkey}
                onClick={selectKey(Key.key,subkey.subkey)}
              >{subkey.enochianLatin} </span>
          ))
        }
      </Typography>
    )
  },

}

const Keys = ({ layout, enochianFont, selectKey, selectedKey, kotd, open, togglePanels, personalKey }) => {
  const Layout = Layouts[layout];

  return (
    <div>
      {
        EnochianKeys.map(key => (
          <Key
            key={key.key}
            keyData={key}
            expanded={open.has(key.key)}
            onChange={togglePanels[key.key]}
            kotd={kotd.key===key.key ? kotd : null}
            isPersonal={personalKey===key.key}
            Layout={Layout}
            enochianFont={enochianFont}
            selectKey={selectKey}
            selectedKey={selectedKey}
          />
        ))
      }
    </div>
  )
};

const Key = pure(({ keyData, Layout, enochianFont, selectKey, selectedKey, kotd, isPersonal, expanded, onChange }) => (
  <ExpansionPanel expanded={expanded} onChange={onChange}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="body1">
        Key {keyData.key}
        {
          (kotd ? ' (KotD)' : '') +
          (isPersonal ? ' (Personal)' : '')
        }
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Layout Key={keyData} enochianFont={enochianFont} selectKey={selectKey} selectedKey={selectedKey} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
));

export default Keys;
