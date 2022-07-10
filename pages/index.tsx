//@ts-nocheck
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Modal from "react-modal";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darkula, dark, gradientDark, a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

interface Spinner {
  name: string;
  description: string;
  code: {
    HTML: string;
    CSS: string;
  };
  className: string;
  customImage?: string;
}

interface Spinners {
  [key: string]: Spinner;
}

function Contributer({ name, avatar, github, website }) {
  return (
    <div className='card'>
      <img className='avatar' src={avatar} />
      <div className='name'>{name}</div>
      <div className='links icons'>
        <a className="link" href={github} target='_blank' rel='noopener noreferrer'>
          <img src="/Github.svg" className='icon hover'/>
        </a>
        <a className="link" href={website} target='_blank' rel='noopener noreferrer'>
          <img src="/Website.svg" className='icon hover'/>
        </a>
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  const spinners: Spinners = {
    discord: {
      name: "Discord Themed",
      description: "A Discord themed spinner.",
      className: "discordSpinner",
      code: {
        CSS: `
.spinner {
  animation-name: spinner;
  animation-duration: 850ms;
  animation-direction: normal;
  animation-iteration-count: infinite;
}

@keyframes spinner {
  from {
      transform: rotate(360deg);
  }

  to {
      transform: rotate(-0deg)
  }
}
`,
        HTML: `<div class="spinner"><div/>`
      }
    }
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [viewing, setViewing] = useState<Spinner>();
  return (
    <div>
      <h1 className="title">Spinners</h1>
      <p className="text-muted description">Hover on a spinner to start the animation.</p>
      <div className="container">
        {
          Object.keys(spinners).map((key: string) => {
            const value = spinners[key];
            return (
              <div key={key} className="item">
                <img
                  src={value.customImage || "/Discord.svg"}
                  className={`${value.className} innerSpinner`}
                  onClick={() => {
                    setViewing(value);
                    setIsOpen(true);
                  }}
                />
              </div>
            )
          })
        }

        <Modal
          isOpen={modalIsOpen}
          style={{
            content: {
              backgroundColor: "#36393f"
            },
            overlay: {
              backgroundColor: "rgba(79, 84, 92, 0.48)"
            }
          }}
        >
          <img src="./Dismiss.svg" className="dismiss" onClick={() => setIsOpen(false)} />
          <h1 className='dark pl-2'>{viewing?.name}</h1>
          <p className='dark'>{viewing?.description}</p>
          <h2 className='code'>CSS</h2>
          <SyntaxHighlighter language='css' style={a11yDark}>{viewing?.code.CSS}</SyntaxHighlighter>
          <h2 className='HTML'>HTML</h2>
          <SyntaxHighlighter language='html' style={a11yDark}>{viewing?.code.HTML}</SyntaxHighlighter>
        </Modal>
      </div>
      <div>
        <h1 className='title'>❤️ Credits</h1>
        <p className='text-muted description'>Thanks to those who made some of these and contributed!</p>
        <div>
          <Contributer
            avatar="https://github.com/turtlepaw.png"
            github="https://github.com/turtlepaw"
            name="Turtlepaw"
            website="https://trtle.xyz/"
          />
          {/*<Contributer
            avatar="https://github.com/tobiasahlin.png"
            github="https://github.com/tobiasahlin"
            name="Tobias Ahlin"
            website="https://tobiasahlin.com/"
          />*/}
        </div>
        <p className='text-muted'>More spinners coming soon!</p>
      </div>
    </div>
  )
}

export default Home
