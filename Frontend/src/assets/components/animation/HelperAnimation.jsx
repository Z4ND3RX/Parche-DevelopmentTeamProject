import Lottie from "lottie-react";

const style = {
  height: '200px',
  width: '200px',
};

export function HelperAnimation (props){
  return <Lottie animationData={props.animationJSON} style={style} />;
}

