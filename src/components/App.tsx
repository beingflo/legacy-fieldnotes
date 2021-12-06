import React from 'react';
import logo from '/fieldnotes.png';
import { HappyIcon } from './icons';
import '../style.css';

const App = (): React.ReactElement => {
  return (
    <div className="relative flex flex-row p-8">
      <div className="absolute flex flex-row gap-4 items-center">
        <img className="w-16 h-16" src={logo} />
        <div className="text-2xl font-bold highlight">fieldnotes</div>
      </div>
      <div className="w-full pt-40 sm:pt-16 flex flex-col items-center">
        <div className="flex flex-col items-center">
          <HappyIcon className="w-24 h-24" />
          <div className="text-xl">Coming soon</div>
        </div>
      </div>
    </div>
  );
};

export default App;
