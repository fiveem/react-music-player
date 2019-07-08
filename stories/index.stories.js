import React from 'react';

import { storiesOf } from '@storybook/react';

import { music } from '../src/mock';
import MusicPlayer from '../src';

import 'font-awesome/css/font-awesome.min.css';

storiesOf('MusicPlayer', module)
    .add('with music', () => (
        <MusicPlayer playlist={music} />
));
