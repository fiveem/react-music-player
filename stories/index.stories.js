import React from 'react';

import { storiesOf } from '@storybook/react';

import { music } from './mock';
import MusicPlayer from '../src';

import 'font-awesome/css/font-awesome.min.css';

storiesOf('MusicPlayer', module)
    .add('with music', () => {
        return <MusicPlayer playlist={music} />
    }
);
