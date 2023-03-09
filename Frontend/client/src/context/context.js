import React, { useState } from 'react';
import FirstStage from '../Components/ModelReg/ModelRegStepOne';
import SecondStage from '../Components/ModelApperance/ModelApperance';
import ThirdStage from '../Components/ModelBasic/ModelBasic';


const Registration = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});

  const nextStep = (data) => {
    setUserData({ ...userData, ...data });
    setStep(step + 1);
  };

  switch (step) {
    case 1:
      return <FirstStage nextStep={nextStep} />;
    case 2:
      return <SecondStage userData={userData} nextStep={nextStep} />;
    case 3:
      return <ThirdStage userData={userData} />;
    default:
      return <h1>Something went wrong</h1>;
  }
};

export default Registration;
