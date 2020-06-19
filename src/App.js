import ReactDOM from 'react-dom'
import React, { Suspense, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { TextureLoader, LinearFilter } from "three"
import img0 from './assets/frog_0.png';
import img1 from './assets/frog_1.png';
import img2 from './assets/frog_2.png';
import img3 from './assets/frog_3.png';
import img4 from './assets/frog_4.png';
import img5 from './assets/frog_5.png';
import img6 from './assets/frog_6.png';
import disp from './assets/disp.jpeg';
import { FadeShader } from './fadeShader';
import './App.css';

function Box(props) {

  let image_1;
  let image_2;

  switch (props.count) {
    case 0:
      image_1 = img0;
      image_2 = img1;
      break;
    case 1:
      image_1 = img1;
      image_2 = img1;
      break;
    case 2: 
      image_1 = img2;
      image_2 = img2;
      break;
    case 3: 
      image_1 = img3;
      image_2 = img3;
      break;
    case 4: 
      image_1 = img4;
      image_2 = img4;
    case 5: 
      image_1 = img4;
      image_2 = img5;
      break;
    case 6: 
      image_1 = img6;
      image_2 = img5;
      break;
  }

  // This reference will give us direct access to the mesh
  const ref = useRef()
  const t = useLoader(TextureLoader, [image_1, image_2, disp])
  const [texture1, texture2, dispTexture] = useMemo(() => t.map(t => ((t.minFilter = LinearFilter), t)), [t])

  useFrame(() => {
    const curDisp = ref.current.material.uniforms.dispFactor.value;
    ref.current.material.uniforms.dispFactor.value += ((props.count % 2 !== 0 ? 1 : 0) - curDisp) * 0.1
  })

  return (
    <mesh
      ref={ref}
      onClick={props.onClick}>
      <planeBufferGeometry attach="geometry" args={[15, 10]} />
      <shaderMaterial
        attach="material"
        args={[FadeShader]}
        uniforms-texture-value={texture1}
        uniforms-texture2-value={texture2}
        uniforms-disp-value={dispTexture}
      />
    </mesh>
  )
}

const Text = (props) => {

  let header;
  let content;

   switch (props.count) {
    case 0:
      header = <div>Goodbye <br /> frog</div>;
      content = "I had the best time at frog. Some might even say it should be illegal to have this much fun at work. I’m truly sad to be moving on, so I made a website to share some of my most favorite memories here.";
      break;
    case 1: 
      header = "4PM";
      content = "We snack and we do fun things. From presidential fitness challenge where Eva challenged Francois on push-ups, to team Erik vs team Anshul beer pong, to Chinese New year and many more.";
      break;
    case 2: 
      header = <div style={{fontSize: '60px'}}>The impeccable <br />collaboration</div>;
      content = "From John&Jon, to the strats solving daring problem at hand, to DT tattooing our president, to Randolph’s hours, to when we all danced together – the team spirit is incomparable.";
      break;
    case 3: 
      header = "frog FASHUN";
      content = "I’ll miss walking into the studio to find out that 5 other frogs are all dressing the same, granted most of the time it’s just all black outfits.";
      break;
    case 4: 
      header = <div>My<br />Other<br />Pod</div>;
      content = "Getting to work closely and learn from Eva is one of the joys in life I am lucky enough to get to experience. She is truly the other pod I didn’t know I was missing. I am so glad to have met her in the pond. ";
      break;
    case 5: 
      header = "TECH TEAM";
      content = "The reason why work has been so incredibly fun and the best team I could ever ask for. We code, we debug, we design, we eat lunch, we stay late, we ship, we make fun of each other. I will truly miss tech team so much.";
      break;
    case 6: 
      header = <div>Thank <br /> you</div>;
      content = <div>Thank you all for the great memories. I can only put so much on a website. Please stay <a href="http://www.wipawe.com/">in touch.</a> I promise to do you proud and never use bad post-its.</div>
      break;
  }

  return (
    <div className="textContainer">
    <div className="text">
      <h1>{header}</h1>
      <p>{content}</p>
    </div>
    </div>
  )
}

const App = () => {

  const [ count, setCount ] = useState(0);

  if ( count > 6) {
    setCount(0);
  }

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1B1B1B'}}>
    <div className="eyebrow" style={{top: '48px', left: '60px'}}>2020</div>
    <div className="eyebrow" style={{top: '48px', left: 'calc(50% - 25px'}}>0626</div>
    { count < 6 && 
      <div
        onClick={ e => setCount(count+1) }
        className="eyebrow" style={{bottom: '72px', left: 'calc(50% - 88px)', color: '#4EE702'}}
      >
          CLICK TO CONTINUE
      </div>
    }
    <Text count={count}/>
    <Canvas pixelRatio={1} camera={{position: [0, 0, 6.5]}}>
      <Suspense fallback={null}>
        <Box onClick={e => setCount(count+1)} count={count}/>
      </Suspense>
    </Canvas>
    </div>
  )
}
 
export default App;
