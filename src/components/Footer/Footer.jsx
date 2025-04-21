import React from 'react'
import Container from '../Container/Container.jsx'
import {DownLogo} from '../Logo/Logo.jsx'

function Footer() {
  return (
    <footer className ='bg-gray-500  py-4'>
      <Container>
        <div className='flex justify-between items-center'>
          <DownLogo/>
          <div>
            <nav>
              <ul>
                <h3>Company Pricing</h3>
                <li><button>Features</button></li>
                <li><button>Pricing</button></li>
                <li><button>Affliate Program</button></li>
                <li><button>Press Kit</button></li>
              </ul>
            </nav>
          </div>
          <div>
          <nav>
              <ul>
                <h3> Support</h3>
                <li><button>Account</button></li>
                <li><button>Help</button></li>
                <li><button>Contact Us</button></li>
                <li><button>Customer Support</button></li>
              </ul>
            </nav>
          </div>
          <div>
          <nav>
              <ul>
                <h3>Legals</h3>
                <li><button>Terms and Condiions</button></li>
                <li><button>Privacy Policy</button></li>
                <li><button>Licensing</button></li>
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
