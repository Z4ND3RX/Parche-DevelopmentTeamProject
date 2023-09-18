import Lottie from "lottie-react";

const style = {
  height: '350px',
  width: '350px',
};

export function Entertainment (props){
  return <Lottie animationData={props.animationJSON} style={style} />;
}

