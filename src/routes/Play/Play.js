import React, { useEffect, useState } from "react";
import queryString from 'query-string';
import { useHistory } from 'react-router';
import { Player } from "video-react";

const Play = () => {
  const history = useHistory();
  const [params, setParams] = useState(null)
  useEffect(() => {
    setParams(queryString.parse(history.location.search))
  },[])
  return (
    <div className="selft">
    <div>{params && params.title}</div>
    <Player
      width="100%"
      height="100%"
    >
      <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" />
    </Player>
    <div>{params && params.description}</div>
  </div>    
  )
}

// class Play extends Component {
//   render() {

//     return (
//       <div className="selft">
        
//         <Player
//           width="100%"
//           height="100%"
//         >
//           <source src="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8" />
//         </Player>
//       </div>
//     );
//   }
// }

export default Play;