import React from 'react';
import MusicPlayer from './app/MusicPlayer';
import { music } from './app/mock';

function App() {
  return (
        <MusicPlayer playlist={music}
                    //  backgroundColor="#f00"
                    //  activeTrackColor="#0f0"
                    //  activeButtonColor="#ff0"
                    //  inactiveButtonColor="#dff"
                    //  buttonTextColor="#fdd"
                    //  progressBarColor="#d54"
                    //  textColor="#fff"
        />
  );
}

export default App;
